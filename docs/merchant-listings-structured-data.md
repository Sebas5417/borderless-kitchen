# Merchant Listings Structured Data — Fix Record

**Date:** 2026-09-01
**Trigger:** Google Search Console alert `[WNC-10030322]` for https://scamproof.vimenova.com/
**Branch:** `claude/merchant-listings-structured-data-fsc5q9`
**Commit:** `445c4cb` (Sebas5417/borderless-kitchen)

---

## The original alert

Search Console reported 3 Merchant listings structured data issues on
`scamproof.vimenova.com`:

| Severity | Issue |
|---|---|
| **Critical** | Missing field `image` |
| Non-critical | Missing field `shippingDetails` (in `offers`) |
| Non-critical | Missing field `hasMerchantReturnPolicy` (in `offers`) |

Critical issues prevent the page from appearing in Search results.

---

## Why scamproof.vimenova.com could not be fixed directly

Two independent blockers:

1. **Source is not in git.** GitHub access is scoped to
   `Sebas5417/borderless-kitchen` and `Sebas5417/sebastian-command-center`;
   `list_repos` confirms those are the only two repos on the account.
   Searching both for `scamproof` returns nothing. The only "Scam-Proof"
   references are task entries in
   `sebastian-command-center/public/data/master-control.json` describing it as
   a Gumroad / KDP product. The landing page is served from the VPS
   (vimenova.com), outside version control.
2. **The live URL is unreachable from the session.** Both `curl` and WebFetch
   to `scamproof.vimenova.com` are rejected by the network egress proxy, so
   the existing JSON-LD could not be read.

**Action required by you:** apply the paste-ready snippet below, by hand, on
the VPS.

---

## What WAS fixed: borderless-kitchen

`borderless-kitchen` (borderlesskitchenseries.com) had the **identical three
defects** in its `Book` / `Offer` JSON-LD. It sells books through Amazon, so it
was on track for the same Search Console email.

### Root causes

| Field | Root cause |
|---|---|
| `image` | In `app/books/[slug]/page.tsx` the image was spread **conditionally** on `book.coverImageSrc`, which is **optional** in `contentlayer.config.ts:31`. Any book without a cover emitted a `Book` with no image at all. |
| `shippingDetails` | Never present. All three `Offer` objects carried only url / priceCurrency / price / availability / seller. |
| `hasMerchantReturnPolicy` | Never present. Same three `Offer` objects. |

### Changes

**New file — `lib/merchant-schema.ts`**

Shared Offer fragments so no future Offer can be written without these fields:

- `AMAZON_SHIPPING_DETAILS` — Amazon US fulfilment: free shipping, 0–1 day
  handling, 1–5 day transit.
- `DIGITAL_SHIPPING_DETAILS` — Kindle-only variant: 0 cost, 0-day handling and
  transit. (A digital product never ships, but Google still expects the field,
  so declare zero rather than omit.)
- `AMAZON_RETURN_POLICY` — 30-day finite return window, return by mail, free
  returns. Mirrors Amazon's published US policy for books.
- `amazonOffer({ url, price, digital })` — builds a complete Offer.
- `absoluteImage(src)` — absolutises the cover URL, falling back to
  `/images/banner-books.png` when frontmatter has no cover.

**`app/books/[slug]/page.tsx`**
- `offers` now built via `amazonOffer()`.
- `image` is now **unconditional**: `image: absoluteImage(book.coverImageSrc)`.

**`app/tokyo-meets-tuscany/page.tsx`**
- `offers: amazonOffer({ url: TMT_AMAZON, price: "19.99" })`

**`app/seoul-meets-mexico-city/page.tsx`**
- `offers: amazonOffer({ url: SMMC_AMAZON, price: "9.99", digital: true })`
- Flagged `digital` because that page lists the $9.99 Kindle price.

### Verification performed

- `npm run build` — compiled successfully.
- `npm run typecheck` (`tsc --noEmit`) — clean.
- `npm run lint` — one pre-existing, unrelated warning (unused `Link` import in
  `app/30-day-challenge/page.tsx`).
- **JSON-LD parsed out of the built HTML** in `.next/server/app/` and confirmed:
  both landing pages and every available book now emit `image` +
  `offers.shippingDetails` + `offers.hasMerchantReturnPolicy`.
  Unreleased ("coming") books still emit **no** `offers`, which is correct —
  they are not for sale.

### Gotcha hit during the work

The `.tsx` files are committed with **CRLF** line endings, and `.gitattributes`
only normalises `*.md` / `*.mdx`. An editing pass flipped them to LF, which
showed up as a whole-file rewrite (857 insertions). Restoring CRLF brought the
diff back to 123 insertions / 27 deletions. The repo has a prior commit
(`8fd2735`) fixing exactly this class of regression — **preserve CRLF in
`.tsx` / `.ts` files here.**

---

## Paste-ready JSON-LD for scamproof.vimenova.com

Drop into `<head>`, replacing the existing `Product` block:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Scam-Proof",
  "description": "REPLACE with the page's product description.",
  "image": ["https://scamproof.vimenova.com/images/scamproof-cover.png"],
  "brand": { "@type": "Brand", "name": "Vimenova" },
  "offers": {
    "@type": "Offer",
    "url": "https://scamproof.vimenova.com/",
    "priceCurrency": "USD",
    "price": "29.00",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "Vimenova" },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "USD" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
    }
  }
}
</script>
```

### Three values you MUST set yourself

1. **`image`** — must be a real, crawlable, absolute URL. This is the critical
   error. Google wants ≥1200px wide and it must not be blocked in `robots.txt`.
2. **`price`** — `master-control.json` shows the $19 → $29 step-up as still
   unverified (**PROD-4c**), so the live price is unconfirmed. It must match
   what the checkout actually charges or Google flags a price mismatch.
3. **`returnPolicyCategory`** — set to `MerchantReturnNotPermitted`, the usual
   honest answer for a digital download. If Gumroad gives buyers a refund
   window, switch to `MerchantReturnFiniteReturnWindow` plus
   `"merchantReturnDays": <n>`. **Do not claim a policy you do not offer.**

### Then

- Run the page through the **Rich Results Test**.
- Hit **Validate Fix** in Search Console.

---

## Open items

- [ ] Apply the snippet to the scamproof VPS landing page (manual).
- [ ] Confirm the live Scam-Proof price (PROD-4c) before publishing the schema.
- [ ] Confirm the Gumroad refund policy to finalise `returnPolicyCategory`.
- [ ] Review + merge `claude/merchant-listings-structured-data-fsc5q9` in
      borderless-kitchen (no PR opened yet).
- [ ] Consider putting the scamproof landing page under version control so this
      class of fix is repeatable.

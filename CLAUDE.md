# Borderless Kitchen

Next.js 15 (App Router) + React 19 + TS + Tailwind + Contentlayer2 editorial site
for the cookbook series. Live at borderlesskitchenseries.com. See `README.md` for
the full stack and scripts.

## Structured data / merchant listings (IMPORTANT)

Google Search Console reports **Merchant listings** issues on any product page
whose `Offer` is incomplete. Every commerce `Offer` on this site MUST carry
`shippingDetails` and `hasMerchantReturnPolicy`, and every `Book`/`Product` MUST
carry `image` — `image` is a **critical** issue that blocks the page from Search.

- **Never hand-write an `Offer` literal.** Build it with `amazonOffer()` from
  `lib/merchant-schema.ts`, which supplies both required sub-objects. Pass
  `digital: true` for Kindle-only offers (0-day delivery instead of shipping).
- **Never make `image` conditional.** `coverImageSrc` is *optional* in
  `contentlayer.config.ts`, so use `absoluteImage(book.coverImageSrc)` — it
  falls back to the series banner rather than emitting a Book with no image.
- The shipping and return fragments describe **Amazon US's** published policy
  (free shipping, 0–1 day handling, 1–5 day transit, 30-day free returns by
  mail). Revisit them if that changes or if a volume ever sells through a second
  channel. Don't declare a policy the seller doesn't actually offer.
- Books with `status: "coming"` correctly emit **no** `offers` — they aren't for
  sale. Only `image` is required there.
- After touching schema, verify against the **built** HTML, not the source:
  parse the `application/ld+json` blocks out of `.next/server/app/*.html`.

Background and the sister fix for scamproof.vimenova.com:
`docs/merchant-listings-structured-data.md`.

## Gotchas

- **Line endings: `.ts` / `.tsx` are committed as CRLF.** `.gitattributes` only
  normalises `*.md` / `*.mdx`. Tooling that rewrites a file with LF turns a
  3-line change into a whole-file diff. Commit `8fd2735` exists purely to undo
  that class of regression — preserve CRLF when editing TS/TSX.
- Contentlayer generates types from `content/` at build time. `npm run typecheck`
  fails with "Cannot find module 'contentlayer/generated'" until you run
  `npm run build` once.
- `lib/amazon.ts`: the env override is only honoured when it's neither empty nor
  the literal `"#"`. A plain `??` fallback never triggers, because `"#"` is
  truthy — that bug once pointed every CTA on the site at `#`.
- Two volumes have dedicated landing pages (`/tokyo-meets-tuscany`,
  `/seoul-meets-mexico-city`); `/books/[slug]` canonicalises to them via
  `CANONICAL_OVERRIDES` so the routes stop competing in search.

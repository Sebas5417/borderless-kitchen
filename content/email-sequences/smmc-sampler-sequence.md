# SMMC Sampler — MailerLite Email Sequence
**Group:** SMMC Subscribers (create this group in MailerLite dashboard)
**Trigger:** Subscriber joins group "SMMC Subscribers"
**Goal:** Deliver the three-recipe sampler → explain the pairing logic → sell the $9.99 illustrated edition
**Status:** Copy written and ready. **Not activated** — steps in the setup section are owner-only account actions.

---

## EMAIL 1 — Instant delivery
**Subject:** Your three Korean–Mexican recipes are here
**Preview text:** Gochujang against chile. Kimchi against lime.

---

Hi there,

Here's your sampler from *Seoul Meets Mexico City* — three complete recipes, formatted to print or read on your phone.

**[Download: Seoul Meets Mexico City Sampler →](https://borderlesskitchenseries.com/smmc-sampler-v3.pdf)**

---

Inside:

**Kimchi Elote Bites** — charred corn folded into mayo, crema and queso fresco, then capped with a dressed kimchi–gochujang spoonful. Serve in cups or on tostada chips.

**Kimchi Fried Rice with Chorizo** — cold day-old rice stir-fried with Mexican chorizo, caramelised kimchi, gochujang and soy. A fried egg on top if you want one.

**Sweet Rice Horchata Pudding** — short-grain rice simmered with milk, cinnamon and condensed milk, finished with ground toasted sesame. Vegetarian, and good warm or chilled.

Each one is the full recipe, not a preview — ingredients, method, a chef's note, and the reason the pairing works.

— Sebastian, Borderless Kitchen

P.S. Every recipe in the book follows the same logic. If these three land, the rest of it will too: [Seoul Meets Mexico City — $9.99 →](https://facelesschannel.gumroad.com/l/dqnqe)

---

## EMAIL 2 — Day 2
**Subject:** Gochujang and adobo are doing the same job
**Preview text:** Two kitchens, one function layer.

---

Hi,

Something worth noticing about the sampler you downloaded.

Gochujang and adobo are not similar ingredients. One is a fermented soybean-and-rice-chili paste. The other is a ground chili-and-vinegar marinade. Different continents, different processes, different flavour signatures.

But they occupy the same *function*: each exists to deliver slow, sour, chili-driven depth to a dish that would otherwise be flat.

Once you see the function layer, Korean and Mexican cooking stop looking like a novelty pairing and start looking like two cuisines that solved the same problems separately:

**Kimchi ↔ Curtido** — both are salted, fermented cabbage with acid and heat, used to cut through fat. Korean kimchi is chili-forward; Salvadoran curtido leaning is sour and herbal. Both do the same job next to something rich.

**Doenjang ↔ Mole** — both are dark, complex, fermented-or-toasted pastes built from many components, used in small amounts to make a whole dish taste like it took all day.

**Sesame ↔ Cilantro** — not a flavour match at all. A *finishing* match. Both go on at the end, raw, to add a fresh top note over something heavy.

The book is built entirely from this. No fusion for its own sake — every pairing earns its place by doing a job the other cuisine already had a tool for.

— Sebastian

---

## EMAIL 3 — Day 4
**Subject:** Why the birria recipe took four attempts
**Preview text:** The problem wasn't the beef. It was the salsa.

---

Hi,

The birria taco was the one that fought me.

The braise was easy — guajillo, ancho, garlic, a little vinegar, beef chuck, three hours. That part works the first time you make it.

The problem was the salsa. Classic birria wants salsa verde: tomatillo, serrano, lime, raw onion. Bright, green, acidic. But the consomé is already sour and rich and chili-heavy, and a green salsa on top was competing with it instead of answering it.

Kimchi solved it. Same job as the salsa verde — acid, heat, freshness — but with fermentation instead of raw green. It cuts the fat without fighting the chili.

That's the whole method of the book: when a swap doesn't work, it's usually because you matched the *ingredient* instead of the *function*. Match the function and the dish tells you what it wants.

*Seoul Meets Mexico City* is the full illustrated edition — every recipe, with the pairing logic written out beside it. Instant PDF download, no shipping, no account.

**[Get Seoul Meets Mexico City — $9.99 →](https://facelesschannel.gumroad.com/l/dqnqe)**

The sampler only scratches the surface of it.

— Sebastian, Borderless Kitchen

---

## MAILERLITE SETUP INSTRUCTIONS

> **Owner-only.** These are account-level actions in the MailerLite dashboard and Vercel. Nothing below has been done, and nothing below should be done by an automated agent — creating groups, editing env vars and activating automations are live account changes.

1. Log into MailerLite dashboard.
2. **Groups → Create Group:** "SMMC Subscribers".
3. Copy the Group ID (shown in the group settings or the URL).
4. Add to Vercel environment variables (Production **and** Preview):
   - `MAILERLITE_API_KEY` — your API key (if not already set for the TMT list)
   - `MAILERLITE_SMMC_GROUP_ID` — the group ID you just created
   Either name is fine for the API key; the group ID **must** be `MAILERLITE_SMMC_GROUP_ID`. The route reads `MAILERLITE_TMT_GROUP_ID` and `MAILERLITE_SMMC_GROUP_ID` separately, so the two lists stay distinct. Do **not** use `MAILERLITE_GROUP_ID` — that is the legacy generic variable used by the old server action and it will not address the SMMC list.
5. **Automation → Create new:**
   - Trigger: Subscriber joins group "SMMC Subscribers"
   - Delay 0: Send Email 1
   - Delay 1 day: Send Email 2
   - Delay 2 days: Send Email 3
6. Email 1 must link to `https://borderlesskitchenseries.com/smmc-sampler-v3.pdf` — this is the reviewed 12-page sampler, not the superseded 5-page draft in `_drafts/`.
7. Activate the automation.

### What works before that is done

The sampler is a static file in `/public` (`smmc-sampler-v3.pdf`), so the download link is always live **without an email address at all** — `SmmcSamplerOptIn` renders a direct download button above the form. The form is optional and only adds this sequence; `SubscribeForm` renders `successLink` → `/smmc-sampler-v3.pdf` after a successful signup.

**Since 2026-11-06 the API no longer lies about it.** If `MAILERLITE_API_KEY` or the group ID is missing, `POST /api/subscribe` returns `503 { ok: false, error: "not-configured" }` (and the legacy `subscribe` server action returns the same error code). It used to return `ok: true` and drop the lead. Now `SubscribeForm` tells the reader plainly that the email was not saved and still shows the download, so the sampler is delivered without falsely confirming a subscription.

The consequence: until step 4 is complete the form is a **working download but not a working list-builder — and it says so instead of claiming otherwise.**

### Where the capture appears

One shared component, `components/cta/SmmcSamplerOptIn.tsx`, used in three places:
- `/free/seoul-meets-mexico-city` — the sampler landing page
- `/recipes/[slug]` — for every recipe whose `bookSlug` is `seoul-meets-mexico-city`
- (the Gumroad purchase CTA sits below it in all cases; the sampler up-sells the book, the book pages capture for the sampler)

Pages that use `NewsletterForm` or the legacy `subscribe` server action write to `MAILERLITE_GROUP_ID` and cannot target the SMMC list. Do not route SMMC capture through them.

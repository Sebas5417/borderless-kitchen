# Borderless Kitchen — Make Money Plan
**Generated: 2026-07-06**

## Reality check first

Nothing here produces cash *today*. Amazon pays out ~60 days after the sale. Gumroad
holds a new seller's first payout for 1–3 weeks of review, then pays 7 days after
each sale, on Fridays. Amazon Associates itself takes 1–5 business days to approve.
There is no legitimate lever on this asset that turns into money in your bank account
tonight. What *is* true: this site already has 245 published articles, a real book on
Amazon, and a stack of ready-to-post content sitting unused — and right now almost
none of it is actually wired to make money. That's the gap this plan closes, fastest
lever first.

---

## What I fixed in the code just now (already pushed on this branch)

The audit turned up three things that were silently leaking 100% of the revenue
this site is capable of generating from existing traffic:

1. **Every Amazon link on the site was unmonetized.** The `/shop` pantry page had
   a literal `[ASSOCIATE-ID]` placeholder in the affiliate tag, and every book CTA
   across ~13 pages/components hardcoded the ASIN with no tag at all. I added
   `lib/amazon.ts` — a single helper all of those now route through. **The moment
   you set one env var (`NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG`), every existing and
   future Amazon link on the site — 245 articles' worth of embedded book links plus
   every pantry item — starts earning commission automatically.** No further code
   changes needed.
2. **Every newsletter signup form was a silent no-op in production.** `MAILERLITE_API_KEY`
   was never set, so `/mini-course`, `/30-day-challenge`, `/free`, and the footer form
   all showed "success" to visitors while dropping the email on the floor. I added an
   optional `LEAD_CAPTURE_WEBHOOK_URL` fallback so leads aren't lost the moment you
   turn traffic on, even before MailerLite is fully configured.
3. **The `/free` page advertised a $7.99 Gumroad product that doesn't exist** (the
   link went to gumroad.com's homepage). I made that section only appear once
   `NEXT_PUBLIC_GUMROAD_FLAVOR_MATRIX_URL` is actually set, and wrote the full,
   ready-to-format product content — see `content/marketing/FLAVOR_PAIRING_MATRIX_PRODUCT.md`.
   It has all 16 pairings (the site only shows 8 as a free preview); paste it into
   Google Docs or Canva, export as PDF, and you have a real product to sell.

Verified: `npm run build` passes, all 129 routes still generate, no new lint errors.

---

## Today — the only things worth doing in the next few hours

These are ranked by dollars-per-minute-of-effort, not by how impressive they sound.

1. **Sign up for Amazon Associates** (affiliate-program.amazon.com). You already
   qualify easily — the requirement is ~10 original posts with recent activity; this
   site has 245 live articles. Approval is 1–5 business days. **Do this first, it's
   the only step with a multi-day lead time**, so starting it now matters more than
   anything else on this list.
   - You then have 180 days and need 3 qualifying sales or the account closes —
     not a concern given existing traffic and content volume.
   - Once approved: put the tag in Vercel as `NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG` and
     redeploy. Every link on the site is now monetized, retroactively, on
     content you already published months ago.
2. **Set up MailerLite and add the two env vars to Vercel** (`MAILERLITE_API_KEY`,
   `MAILERLITE_GROUP_ID`). Instructions already exist in
   `content/email-sequences/MAILERLITE-SETUP.md` — it's a checklist, ~30–45 minutes.
   Every day this isn't done, the mini-course and 30-day challenge (your two biggest
   lead magnets) are capturing zero subscribers despite looking like they work.
3. **Post today's ready-to-publish content.** `SOCIAL_CONTENT_BATCH_01.md` and
   `content/marketing/REDDIT_POSTS_JUNE19.md` and `QUORA_ANSWERS_JUNE19.md` are
   explicitly marked "copy-paste ready" and have been sitting unpublished. This is
   free, immediate traffic to the book and email capture, and it costs you 30 minutes,
   not money. Do this regardless of where the Amazon/MailerLite signups are.
4. **Build the Flavor Pairing Matrix PDF** from
   `content/marketing/FLAVOR_PAIRING_MATRIX_PRODUCT.md` (10–15 minutes in Google
   Docs), create a Gumroad account, list it at $7.99, and set
   `NEXT_PUBLIC_GUMROAD_FLAVOR_MATRIX_URL`. This is the only *new* product you can
   list today. Expect the first payout to take 1–3 weeks (new-seller review) — factor
   that into "how soon," not "whether."

---

## This week (days 2–7)

- **Resume the automated drip pipeline.** `scripts/bk_weekly_post.py` already
  exists and is built for this (pulls from 976 archived articles, publishes,
  commits, pushes, and is wired for an n8n workflow via `--json-output`). If it
  isn't currently scheduled, that's free ongoing content velocity sitting idle —
  turn the n8n workflow (or a cron trigger) back on.
- **Pinterest**, per the existing `content/marketing/PINTEREST_STRATEGY_JUNE19.md`
  playbook: business account, Rich Pins, the 3 boards it specifies, 30 pins from
  the batch already written. Pinterest is the highest-ROI *unstarted* channel here —
  it compounds for years per pin, unlike Reddit/social posts which spike once.
- **Finish the Amazon Associates loop**: once approved, go back through the top
  10 highest-traffic articles (check whatever analytics exist, or just the ones
  targeted in the Reddit/Quora batches) and confirm the Amazon links in those
  specific `.mdx` files resolve correctly — those are static markdown links and
  weren't touched by the code fix, only the page-template links were.
- **Quora answers**: these require manually finding matching live questions to
  paste into — budget an hour to do this properly rather than rushing it, since a
  mismatched answer gets removed.

---

## What's actually "viral" right now, and why this site already fits it

Research done today (July 2026), not assumed:

- **TikTok Shop affiliate access opens at just 1,000 followers** — the lowest
  barrier to a real commission-based channel that exists right now for food
  creators. This site has no TikTok presence; standing one up isn't a same-week
  win, but it's worth flagging as the next channel after Pinterest, not before it.
- **The food categories converting best in TikTok Shop right now are exactly this
  brand's actual content**: pantry items with a craft/origin story (this site's
  entire pantry section — kombu, gochujang, guanciale — is written as origin-story
  content already), and specialty/unusual-flavor items (the Japanese-Italian fusion
  angle itself). The content doesn't need to be reinvented for the trend — it
  already matches it. The gap is distribution (no video presence yet), not content.
- **Live shopping and CPG brand deals outperform view-based ad revenue** for food
  creators in 2026 — a reason to prioritize affiliate/product-link monetization
  (what this plan fixes) over waiting for ad-network revenue, which this site isn't
  close to qualifying for anyway (AdSense wants 25+ sessions minimum; Mediavine
  wants 50k monthly sessions — both explicitly deferred in your own
  `AFFILIATE_TRACKER.md`).

Bottom line from the research: nothing here says "do something totally different."
It says the site's existing angle (cultural food history + functional ingredient
swaps) is the trend, and the fastest wins are unblocking the monetization that was
supposed to already be live, not chasing a new format.

---

## If you need actual cash before any of this can possibly land

Be honest with yourself about timing: Amazon pays ~60 days after sale, Gumroad
holds new sellers 1–3 weeks, and organic traffic from today's Reddit/Quora posts
takes days to weeks to convert. If the need is literally rent-this-week, this asset
is not that lever — a same-week gig (freelance work, selling unused items, a shift
job) is faster and more reliable. This plan is the right move for building real,
compounding income from an asset that already has 245 articles and a published book
behind it — not for a cash emergency measured in hours.

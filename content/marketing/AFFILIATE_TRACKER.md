# Affiliate Program Tracker
**Created: 2026-06-19**
**Updated: 2026-08-10**
**Status: Amazon Associates DONE on borderlesskitchenseries.com. New Priority 0 below covers video/reel affiliates — those still need signup.**

---

## Priority 0: Borderless Kitchen — Video/Reel/Description Affiliates (2026-08-10)

Amazon Associates is live and wired into the site (`lib/amazon.ts`, tag `borderlesskitchen-20`) — that link already goes in any clip/reel description that mentions cookware or the books. The gap is everything *not* sold on Amazon: specialty Japanese/Korean/Mexican pantry items and boutique cookware, which fit the BK niche better than generic AdSense and pay higher commission than Amazon's 4% kitchen rate.

Sign-up requires the actual business/tax info only Sebastian has — this is a shortlist to work through, not something Claude can complete. Verify each program is still live and check current commission at signup; affiliate programs change terms often.

| Program | Fit | Where to apply | Est. commission |
|---|---|---|---|
| **Bokksu** | Already live (`?refer=borderlesskitchen`) — reuse in every Japanese-pantry clip/description | Already have it | ~10% |
| **The Japanese Pantry** (thejapanesepantry.com) | Niche Japanese ingredients (soy sauce, vinegar, knives) — direct fit for every Japanese-technique video | Check site footer for "Affiliate" or email them directly — small boutique shops often run informal ambassador deals | Ask (informal programs vary) |
| **ThermoWorks** | Thermometers/probes shown in any cooking demo — frequently recommended, evergreen | thermoworks.com, or via Impact/Awin network — check their site footer | ~8-10% |
| **Made In Cookware** | Premium pans/knives, matches the editorial "restraint, one good tool" brand voice | madeincookware.com affiliate page, or via ShareASale/Impact | ~8% |
| **Sur La Table / Williams Sonoma** | Broad kitchen equipment fallback when a specific tool isn't on Amazon | Via Rakuten Advertising or CJ Affiliate — search the network for the brand | ~4-8% |
| **Snuk Foods** (snukfoods.com) | Specialty Italian + Japanese pantry imports — fits the TMT side of the catalog | Site footer or direct outreach | Ask |

**Action for Sebastian:** pick 2-3 from this list (Made In + ThermoWorks are the highest-leverage starting point — broad appeal, established programs), apply, then send Claude the approved referral links to wire into `lib/amazon.ts`-style constants and the video description template below.

---

## Priority 1: Sign Up Now (Highest Revenue Potential)

### Amazon Associates — ✅ DONE on borderlesskitchenseries.com
**Tag:** `borderlesskitchen-20`, wired in `lib/amazon.ts` and used site-wide (shop page, gift-guide articles, book CTAs).
**Still open:** umami.guide and other network sites may still have the `YOURTAG-20` placeholder — verify per-site before assuming this is done everywhere.
**Estimated monthly:** $50-500 when sites have traffic

---

### Perplexity AI
**URL:** perplexity.ai → scroll to footer → "Become an Affiliate" or check referral section
**Commission:** ~$10-20 per Pro subscriber referred (estimated)
**Why:** Referenced in ai-toolbox articles, ai-prompt-vault, multiple "best AI tools" articles
**Action:** Sign up, get referral link, update all Perplexity mentions in AI Toolbox articles
**Estimated monthly:** $100-500 when AI Toolbox is live

---

### Beehiiv Newsletter Platform
**URL:** beehiiv.com/affiliates (or check footer/partner page)
**Commission:** 30% recurring for referred subscribers (up to $100/ref lifetime)
**Why:** Referenced in "best AI tools for newsletter creators" article
**Action:** Sign up, get referral link, update AI Toolbox article
**Estimated monthly:** $50-300 recurring

---

### ElevenLabs Voice AI
**URL:** elevenlabs.io → check "Affiliate" or "Partner" in footer
**Commission:** ~20-30% recurring
**Why:** Referenced in AI Toolbox articles and AI Prompt Vault
**Action:** Sign up, update all ElevenLabs links
**Estimated monthly:** $50-200 recurring

---

### Cursor AI Code Editor
**URL:** cursor.sh → check "Referrals" in account settings after signing up
**Commission:** ~20% recurring (estimated)
**Why:** Featured in "best AI coding tools" article, coding prompt page on AI Prompt Vault
**Action:** Sign up, get referral link
**Estimated monthly:** $50-200 recurring

---

## Priority 2: Sign Up Within 30 Days

### Midjourney
**URL:** midjourney.com — check for affiliate/partner program
**Commission:** Unknown — may require partnership application
**Why:** Featured in AI Toolbox image generator articles, image prompt page
**Note:** Midjourney doesn't currently have a public affiliate program — monitor for launch

---

### Notion AI
**URL:** notion.so/affiliates or notion.com/affiliate
**Commission:** ~$10 per converted trial (estimated)
**Why:** Referenced in newsletter creator tools article
**Action:** Apply

---

### Jasper AI
**URL:** jasper.ai/partner-program
**Commission:** 25% recurring
**Why:** Reviewed in AI Toolbox
**Action:** Apply

---

### ConvertKit / Kit
**URL:** convertkit.com/affiliate
**Commission:** 30% recurring for 24 months
**Why:** Email platform mentioned in newsletter content — could be recommended alongside MailerLite
**Note:** Conflict of interest with MailerLite if you use MailerLite — be transparent

---

### ClickFunnels / Kajabi / Teachable
**URL:** Various — check each partner page
**Commission:** 30-40% recurring
**Why:** If creating a course or digital product, these platforms have affiliate programs
**Note:** Relevant if the AI Prompt Pack or BK course gets built out properly

---

## Priority 3: Passive Revenue (Set Up After Traffic Arrives)

### Google AdSense
**URL:** adsense.google.com
**Requirements:** 25+ unique sessions, original content, privacy policy
**Why:** Passive display ad revenue on AI Toolbox and AI Prompt Vault
**When to apply:** After each site has 30+ days of indexed content and some traffic
**Estimated RPM:** $2-8 per 1,000 page views (tech/AI = higher RPM)

---

### Mediavine / Ezoic / Raptive
**Requirements:** 50k+ monthly sessions (Mediavine), 10k+ (Ezoic)
**Why:** Higher-paying alternatives to AdSense
**When to apply:** After sites reach traffic thresholds
**Note:** These replace AdSense — use AdSense to start, migrate up when eligible

---

## Revenue Model Summary

| Site | Primary Revenue | Secondary |
|------|-----------------|-----------|
| borderlesskitchenseries.com | Book sales (Amazon affiliate) | MailerLite subscribers → email → book |
| umami.guide | Amazon Associates (ingredients) | AdSense (once traffic) |
| ai-toolbox | AI tool affiliates (Perplexity, ElevenLabs, etc.) | AdSense |
| ai-prompt-vault | AI tool affiliate links (Claude, ChatGPT, Midjourney, Cursor) | Gumroad prompt pack |
| Email list (BK) | Book sales + mini-course upsell | Sponsored email slots (later) |

---

## Disclosure Requirement

Once affiliates are active, add to every site footer:
"Some links on this site are affiliate links. We may earn a commission at no extra cost to you when you make a purchase."

Already added to ai-prompt-vault. Add to umami.guide footer (currently says "affiliate links" but needs actual Amazon Associate disclosure wording once tag is active).

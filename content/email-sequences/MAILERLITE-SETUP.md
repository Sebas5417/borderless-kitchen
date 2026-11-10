# MailerLite Automation Setup — 5-Day Mini-Course

## Overview
These 5 emails form an automation sequence that delivers the free mini-course.
Each subscriber who signs up on /mini-course gets all 5 emails automatically.

## Setup Steps in MailerLite

### 1. Create a Group
- Name: "Mini-Course Subscribers"
- This separates course subscribers from general newsletter subscribers

### 2. Create an Automation
- Trigger: "Subscriber joins a group" → "Mini-Course Subscribers"
- Name: "5-Day Japanese-Italian Fusion Course"

### 3. Add the Email Steps

**Email 1 — Send immediately after signup**
- Subject: `Day 1: The ingredient that changed everything (and you've never heard of it)`
- Content: See `mini-course-day1.md`
- From name: Sebastian Dri
- From email: facelesschannel0515@gmail.com

**Wait: 1 day**

**Email 2**
- Subject: `Day 2: White miso and Parmigiano are the same ingredient (structurally)`
- Content: See `mini-course-day2.md`

**Wait: 1 day**

**Email 3**
- Subject: `Day 3: The 16 swaps (and the recipe that explains all of them)`
- Content: See `mini-course-day3.md`

**Wait: 1 day**

**Email 4**
- Subject: `Day 4: Why this sweetener makes food taste better than sugar ever could`
- Content: See `mini-course-day4.md`

**Wait: 1 day**

**Email 5**
- Subject: `Day 5: The framework is yours. Here's how to use it forever.`
- Content: See `mini-course-day5.md`

### 4. Connect the Signup Form

The mini-course page (/mini-course) uses the `NewsletterForm`, which posts to the
`subscribe` server action in `app/_actions/subscribe.ts`.

That action is already group-aware — it needs no code change:

- `POST https://connect.mailerlite.com/api/subscribers`
- Body: `{ email, groups: ["<MAILERLITE_GROUP_ID>"] }` — the group is read from the
  `MAILERLITE_GROUP_ID` env var and added only when that var is set.

So to route mini-course signups to the "Mini-Course Subscribers" group, set
`MAILERLITE_GROUP_ID` in Vercel to that group's ID
(MailerLite → Subscribers → Groups → Mini-Course Subscribers → copy ID from URL).

The action subscribes to a single group, so this var decides *which* group the
mini-course form feeds. Do not edit `app/_actions/subscribe.ts` to hardcode a
group ID — and note this variable does **not** reach the two book lists: the TMT
sauce-pack form on /tokyo-meets-tuscany reads `MAILERLITE_TMT_GROUP_ID` and the
SMMC sampler forms read `MAILERLITE_SMMC_GROUP_ID`, both served by
`app/api/subscribe/route.ts`.

### 5. Test the Sequence
- Sign up with a test email at /mini-course
- Verify Day 1 arrives within minutes
- Check Days 2-5 arrive on schedule

---

## Notes
- Only Day 5 and the post-course sequence (Email 6 P.S., Email 9) reference the book: borderlesskitchenseries.com/tokyo-meets-tuscany
- Day 5 is the primary book conversion email — reply CTA + link to the /tokyo-meets-tuscany page (no Amazon links in emails)
- Each email ends with unsubscribe link (MailerLite handles this automatically)
- Suggest adding a tag "mini-course-completed" after Day 5 for future segmentation

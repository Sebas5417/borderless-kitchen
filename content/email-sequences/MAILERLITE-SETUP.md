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
- Subject: `Day 3: The 24 swaps (and the recipe that explains all of them)`
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

The mini-course page (/mini-course) uses the existing newsletter subscribe action.
To route mini-course signups to the "Mini-Course Subscribers" group instead of
(or in addition to) the main list, update `app/_actions/subscribe.ts` to add the
group ID parameter to the MailerLite API call.

**Current subscribe endpoint:**
- `POST https://connect.mailerlite.com/api/subscribers`
- Body: `{ email, groups: ["MAIN-GROUP-ID"] }`

**Update to:**
- Body: `{ email, groups: ["MAIN-GROUP-ID", "MINI-COURSE-GROUP-ID"] }`

Get the mini-course group ID from MailerLite → Subscribers → Groups → Mini-Course Subscribers → copy ID from URL.

### 5. Test the Sequence
- Sign up with a test email at /mini-course
- Verify Day 1 arrives within minutes
- Check Days 2-5 arrive on schedule

---

## Notes
- All emails reference the book: amazon.com/dp/B0GY8H2TCQ
- Day 5 is the primary book conversion email — reply CTA + Amazon link
- Each email ends with unsubscribe link (MailerLite handles this automatically)
- Suggest adding a tag "mini-course-completed" after Day 5 for future segmentation

---

## THE LEAD MAGNET IS BUILT ✅ (added by Claude)

The promised "47 rules" PDF now exists and ships with the site:
- **File in repo:** `public/guides/asian-flavor-cheat-sheet.pdf`
- **Live URL (after deploy):** `https://borderless-kitchen.vercel.app/guides/asian-flavor-cheat-sheet.pdf`

**In the MailerLite welcome email (Day 0), paste this download button/link** so subscribers
actually receive what /flavor-guide promised:

> Your cheat sheet is here → https://borderless-kitchen.vercel.app/guides/asian-flavor-cheat-sheet.pdf

Without this link in the automation, subscribers get an empty promise. This is the delivery
half of the funnel — the capture half needs MAILERLITE_API_KEY + MAILERLITE_GROUP_ID in Vercel.

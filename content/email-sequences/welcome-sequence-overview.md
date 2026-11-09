# Borderless Kitchen Email Sequence — Overview & Setup Guide

## Sequence Architecture

### Welcome Series (Triggered by signup — Day 1 through Day 44)

There is no Day 0 email. The sequence begins with the Day 1 lesson, sent immediately on signup.

| Email | Timing | Subject |
|-------|--------|---------|
| Day 1 | Immediate on signup | "Day 1: The ingredient that changed everything (and you've never heard of it)" |
| Day 2 | +1 day | "Day 2: White miso and Parmigiano are the same ingredient (structurally)" |
| Day 3 | +2 days | "Day 3: The 16 swaps (and the recipe that explains all of them)" |
| Day 4 | +3 days | "Day 4: Why this sweetener makes food taste better than sugar ever could" |
| Day 5 | +4 days | "Day 5: The framework is yours. Here's how to use it forever." |
| Email 6 | Day 12 | "What happens next" |
| Email 7 | Day 16 | "The recipe I make when I have nothing in the house" |
| Email 8 | Day 23 | "The thing nobody tells you about learning to cook Japanese food" |
| Email 9 | Day 30 | "One month in" |
| Email 10 | Day 44 | "The fish that isn't fish" |

Day 1-5 subjects are the `**Subject:**` lines in `mini-course-day1.md` through `mini-course-day5.md`; the one-day interval between them is the delay schedule in `MAILERLITE-SETUP.md`. Emails 6-10 are the headings and subjects in `post-course-sequence.md`, which also carries their day numbers. Copy subjects from those files when building the automation — this table is an index, not a source.

### After Day 44: Weekly Newsletter
Send every Tuesday. One technique, one recipe application, one ingredient spotlight.

## Setup Instructions for MailerLite

### Step 1: Create Groups
- "Mini-Course Subscribers" (main group for this sequence)
- "Newsletter Only" (for people who don't complete the course)

### Step 2: Create Automation
In MailerLite → Automations → Create Automation:
- Trigger: "Subscriber joins group" → "Mini-Course Subscribers"
- Then add email steps with delays

### Step 3: Email Files to Upload
All emails are in: content/email-sequences/
- mini-course-day1.md through day5.md → use as Days 1-5 (email subjects in the files)
- post-course-sequence.md → use for Emails 6-10

### Step 4: Vercel Environment Variables
In Vercel project settings for borderless-kitchen-series:
- MAILERLITE_API_KEY = [your API key from MailerLite → Integrations → API]
- MAILERLITE_GROUP_ID = [ID of "Mini-Course Subscribers" group]

`MAILERLITE_GROUP_ID` is the right variable here: /mini-course uses the `NewsletterForm`, which goes through the single-group `subscribe` server action, and that action reads `MAILERLITE_GROUP_ID`.

The two book-specific lists are separate and must not reuse it: the TMT sauce-pack form on /tokyo-meets-tuscany reads `MAILERLITE_TMT_GROUP_ID` and the SMMC sampler forms read `MAILERLITE_SMMC_GROUP_ID`, both via `/api/subscribe`. See `tmt-sauce-pack-sequence.md` and `smmc-sampler-sequence.md`.

### Step 5: Test
1. Submit the form on borderlesskitchenseries.com/mini-course with a test email
2. Check MailerLite → Subscribers — does the email appear?
3. Check MailerLite → Automations — did the automation trigger?

## Revenue Path
Subscriber → 5-day course (trust building) → Email 5 mention of upcoming book → Email 8 Amazon pantry links (affiliate) → Email 10 book launch teaser → Future: book pre-order / Gumroad product

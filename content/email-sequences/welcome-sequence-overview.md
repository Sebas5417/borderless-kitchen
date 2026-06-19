# Borderless Kitchen Email Sequence — Overview & Setup Guide

## Sequence Architecture

### Welcome Series (Triggered by signup — Days 0-44)

| Email | Day | Subject | Goal |
|-------|-----|---------|------|
| Day 0 | Immediate | "Your Japanese pantry starts here" | Deliver first lesson + set expectations |
| Day 1 | +1 day | "The miso trick that changes pasta" | Deliver Day 1 lesson, build trust |
| Day 2 | +2 days | "Why sake is better than white wine for cooking" | Day 2 lesson |
| Day 3 | +3 days | "The fermentation secret Japanese chefs know" | Day 3 lesson |
| Day 4 | +4 days | "How to taste umami deliberately" | Day 4 lesson |
| Day 5 | +5 days | "What you can cook now (and what's next)" | Final lesson + warm book/upsell mention |
| Email 6 | Day 12 | "The one pan technique that changes everything" | Re-engage, warm value |
| Email 7 | Day 16 | "I made this last week — here's what happened" | Story + technique |
| Email 8 | Day 23 | "The pantry I'd build if I was starting over" | Pantry guide + Amazon links |
| Email 9 | Day 30 | "A question for you" | Engagement + soft ask |
| Email 10 | Day 44 | "The borderless kitchen manifesto" | Brand statement + book mention |

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

### Step 5: Test
1. Submit the form on borderlesskitchenseries.com/mini-course with a test email
2. Check MailerLite → Subscribers — does the email appear?
3. Check MailerLite → Automations — did the automation trigger?

## Revenue Path
Subscriber → 5-day course (trust building) → Email 5 mention of upcoming book → Email 8 Amazon pantry links (affiliate) → Email 10 book launch teaser → Future: book pre-order / Gumroad product

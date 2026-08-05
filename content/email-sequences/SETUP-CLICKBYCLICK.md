# MailerLite + Vercel Setup — Click-by-Click

**Goal:** stop silently dropping subscribers. Right now the signup form shows "Thank you"
but throws the email away until these two env vars exist in Vercel:
`MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID`. This guide gets both set, wires the
5-day course, and tests it. ~25 minutes, one time.

> Code facts (so nothing is guessed): the form calls
> `POST https://connect.mailerlite.com/api/subscribers` with `{ email, groups: [GROUP_ID] }`.
> It reads `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` from the environment
> (`app/_actions/subscribe.ts`). No other keys are needed.

---

## PART A — MailerLite (get the two values + build the emails)

### A1. Account + verified sender (required, or emails won't send)
1. Go to **mailerlite.com** → sign in (or create a free account — free tier covers up to 1,000 subscribers).
2. Left sidebar → **Settings** (gear) → **Domains** (or **Sender identities**).
3. Add sender **facelesschannel0515@gmail.com** → click the verification link MailerLite emails you.
   - Optional but better for deliverability later: verify the domain `borderlesskitchenseries.com`. Skip for now if you don't control DNS yet — the verified Gmail sender is enough to start.

### A2. Create the group (this gives you MAILERLITE_GROUP_ID)
1. Left sidebar → **Subscribers** → **Groups** → **Create group**.
2. Name it exactly: **Mini-Course Subscribers**
3. Open the group. Look at the browser URL — it contains the numeric ID:
   `https://dashboard.mailerlite.com/subscribers?group=123456789` → **`123456789` is your GROUP_ID.** Copy it.
   - If the URL doesn't show it: the group ID is also visible via **Integrations → API → "Get groups"** documentation test, but the URL method is fastest.

### A3. Get the API key (this is MAILERLITE_API_KEY)
1. Left sidebar → **Integrations** (or Settings → **API**).
2. Find **MailerLite API** → **Use** / **Generate new token**.
3. Name it `borderless-kitchen` → **Create token** → **copy the long token string now** (you can't see it again).
   - This is your **API_KEY**. Treat it like a password — never commit it to the repo.

### A4. Build the 5-day automation (delivers the free course + the PDF)
1. Left sidebar → **Automations** → **Create automation** → name it `5-Day Fusion Course`.
2. **Trigger:** "When subscriber joins a group" → pick **Mini-Course Subscribers**.
3. Add steps in this order (content is in `content/email-sequences/`):
   - **Email** — subject + body from `mini-course-day1.md`. **In this first email, paste the lead-magnet button:**
     `Your cheat sheet → https://borderless-kitchen.vercel.app/guides/asian-flavor-cheat-sheet.pdf`
   - **Delay** 1 day → **Email** from `mini-course-day2.md`
   - **Delay** 1 day → **Email** from `mini-course-day3.md`
   - **Delay** 1 day → **Email** from `mini-course-day4.md`
   - **Delay** 1 day → **Email** from `mini-course-day5.md`
   - (Later: add the 10-email nurture flow from `post-course-sequence.md`.)
   - Set **From name:** Sebastian Dri · **From email:** facelesschannel0515@gmail.com
4. Toggle the automation **ON** (top right). Save.

> You now have two values written down: **API_KEY** (long string) and **GROUP_ID** (number).

---

## PART B — Vercel (paste the two values, redeploy)

### B1. Add the environment variables
1. Go to **vercel.com** → open the **borderless-kitchen** project.
2. Top tabs → **Settings** → left menu → **Environment Variables**.
3. Add the first one:
   - **Key:** `MAILERLITE_API_KEY`
   - **Value:** paste the long token from A3
   - **Environments:** tick **Production**, **Preview**, **Development** (all three)
   - **Save**
4. Add the second one:
   - **Key:** `MAILERLITE_GROUP_ID`
   - **Value:** the number from A2 (digits only, no quotes)
   - **Environments:** all three → **Save**

### B2. Redeploy so the vars take effect (env changes need a new build)
1. Top tabs → **Deployments**.
2. Newest deployment → **⋯** (three dots) → **Redeploy** → confirm **Redeploy**.
   - Wait ~1–2 min for it to finish (green "Ready").

---

## PART C — Test end-to-end (2 minutes)
1. Open **https://borderless-kitchen.vercel.app/flavor-guide** in an incognito window.
2. Enter a real email you can check → **Subscribe** → you should see the success state.
3. In MailerLite → **Subscribers** → **Mini-Course Subscribers** → your email should appear within a few seconds.
4. Check that inbox → the Day-1 email with the PDF link should arrive (check spam the first time; mark "not spam").
5. Click the PDF link → the cheat sheet downloads. ✅ Funnel is live.

**If the subscriber doesn't appear:** the API key or group ID is wrong/typo'd, or you skipped the redeploy (B2). Re-check B1 values and redeploy again.

---

## Done = the money path is open
Once C passes: every visitor the content calendar drives who enters an email is captured,
tagged, and dripped the 5-day course that ends on the book + Amazon CTA. That is the
whole funnel working. The remaining two gates are **production deploy** (promote latest in
Vercel) and the **Amazon Associates tag** (send it to Claude to wire into the shop page).

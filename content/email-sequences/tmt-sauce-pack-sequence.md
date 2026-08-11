# TMT Sauce Pack — MailerLite Email Sequence
**Group:** TMT Subscribers (create this group in MailerLite dashboard)
**Trigger:** Form submission on /tokyo-meets-tuscany
**Goal:** Deliver sauce pack → warm up → soft Amazon CTA

---

## EMAIL 1 — Instant delivery
**Subject:** Your Japanese–Italian Sauce Pack is here
**Preview text:** 5 sauces. Any protein, any night.

---

Hi there,

Here's your Japanese–Italian Sauce Pack — 5 core sauce recipes from *Tokyo Meets Tuscany*, ready to use tonight.

**[Download: Borderless Kitchen Sauce Pack →](https://borderlesskitchenseries.com/sauce-pack.pdf)**

---

Inside you'll find:

**Miso Butter Sauce** — the fastest way to add depth to any pasta or sautéed protein. Butter carries the miso, pasta water makes it silky.

**Chili-Soy Garlic Oil** — the Japanese answer to Italian aglio e olio, except it makes everything 40% more interesting.

**Umami Tomato Sauce** — classic Italian base with katsuobushi (bonito flakes) added to the soffritto. Invisible. Irreplaceable.

**Soy-Balsamic Glaze** — sweet, acidic, savory. Goes on chicken, salmon, roasted vegetables, aged cheese. Everything.

**Parmesan-Miso Cream** — this one will ruin most cream sauces for you because you'll understand how much depth was missing.

All five sauces are built on the same principle: Japanese and Italian ingredients occupy the same *flavor functions*. They're not random combinations. They're matches.

That's the whole system.

— Sebastian, Borderless Kitchen

P.S. Each sauce is also in *Tokyo Meets Tuscany* in its full recipe context. The book is on Amazon if you want the whole thing: [Tokyo Meets Tuscany →](https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20)

---

## EMAIL 2 — Day 2
**Subject:** Why Japanese and Italian cuisines have always been speaking the same language
**Preview text:** Miso is not weird. It's fermented salt. So is Parmigiano.

---

Hi,

Something unusual: miso and Parmigiano Reggiano are the same ingredient.

Not literally. But functionally, they're identical. Both exist to add *fermented, umami-dense saltiness* to a dish. Parmigiano does it from animal milk with Italian bacteria cultures. Miso does it from soybeans with koji mold. Different process, different flavor signature — same job.

That's the insight behind *Tokyo Meets Tuscany*.

Every swap in the book is a functional match, not a creative stretch. Examples:

**Soy sauce ↔ Balsamic vinegar** — both are sweet-acid-savory finishing liquids. Soy is more savory, balsamic is more acid-forward, but they finish a dish in the same way.

**Udon ↔ Pappardelle** — both are wide, thick, sauce-catching starch noodles. Udon is chewier and more neutral. Pappardelle has more wheat flavor. Ragù doesn't care.

**Katsuobushi (bonito flakes) ↔ Anchovy in oil** — both dissolve into fat invisibly and add deep umami. Neither one should be tasted on its own in the final dish.

Once you see the function layer, the combinations stop seeming strange.

The Sauce Pack recipes work because of this logic. The sauces are built from function, not fusion for its own sake.

Tomorrow: I'll tell you about the recipe that started all of this.

— Sebastian

---

## EMAIL 3 — Day 4
**Subject:** The recipe that convinced me to write this book
**Preview text:** It wasn't supposed to be a cookbook. It was supposed to be dinner.

---

Hi,

The first version of the miso butter pasta was an accident.

I had leftover white miso, a knob of butter, pasta water, and spaghetti. I was trying to make something and running out of ideas. The combination happened more by logic than inspiration: miso adds salt and fermented depth, butter carries fat and richness, pasta water emulsifies them.

It was better than most things I'd made on purpose.

Over the next few weeks I kept applying the same logic: what does this Italian ingredient *do*, and what Japanese ingredient does the same thing? The carbonara-ramen came out of it. The soy-balsamic glaze. The chili oil lasagna.

By the time I had 37 recipes, I had a book.

*Tokyo Meets Tuscany* is on Amazon now — paperback, hardcover, and Kindle. It's everything that came out of that logic applied consistently: 37 Japanese-Italian fusion recipes, all built on function, all tested in a home kitchen.

**[Get Tokyo Meets Tuscany on Amazon →](https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20)**

Paperback $24.99 · Hardcover $34.99 · Kindle $9.99

The second book in the series — *Seoul Meets Mexico City* — applies the same logic to Korean and Mexican cuisine. It's coming soon. I'll let you know when it's ready.

— Sebastian, Borderless Kitchen

---

## MAILERLITE SETUP INSTRUCTIONS

1. Log into MailerLite dashboard
2. **Groups → Create Group:** "TMT Subscribers"
3. Copy the Group ID (shown in the URL or group settings)
4. Add to Vercel env vars:
   - `MAILERLITE_API_KEY` = your API key
   - `MAILERLITE_GROUP_ID` = the group ID you just created
5. **Automation → Create new:**
   - Trigger: Subscriber joins group "TMT Subscribers"
   - Delay 0: Send Email 1
   - Delay 1 day: Send Email 2
   - Delay 2 days: Send Email 3
6. Set the Sauce Pack download link in Email 1 to: `https://borderlesskitchenseries.com/sauce-pack.pdf`
7. Activate automation

**Note:** The subscribe form on /tokyo-meets-tuscany uses the existing `subscribe` server action which already calls `https://connect.mailerlite.com/api/subscribers` with the configured group ID. No additional code changes needed once env vars are set.

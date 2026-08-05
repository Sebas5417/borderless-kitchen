import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  alternates: { canonical: "/30-day-challenge" },
  title: "30-Day Japanese Kitchen Challenge — Build a Japanese Pantry From Scratch",
  description:
    "A free 30-day challenge to build your Japanese pantry from scratch, cook one Japanese technique per day, and permanently change how you think about umami, dashi, and fermented flavor.",
  openGraph: {
    title: "30-Day Japanese Kitchen Challenge",
    description:
      "Thirty days. Thirty techniques. One permanent foundation in Japanese cooking — dashi, miso, rice, fermented pantry, and the fusion possibilities they open up.",
    type: "website",
  },
};

const WEEKS = [
  {
    week: "Week 1",
    theme: "The Pantry Foundation",
    days: [
      "Day 1: Make dashi from scratch (kombu + katsuobushi). Taste it plain before using it in anything.",
      "Day 2: Make miso soup — three variations, one bowl.",
      "Day 3: Cook Japanese short-grain rice correctly for the first time.",
      "Day 4: Toast and use sesame oil, toasted sesame seeds, and nori — the umami trio.",
      "Day 5: Make soy sauce eggs (shoyu tamago) — 4-minute boil, overnight marinade.",
      "Day 6: Make furikake rice seasoning from scratch.",
      "Day 7: Eat everything you've made this week together as a full ichiju sansai meal.",
    ],
  },
  {
    week: "Week 2",
    theme: "Fermented Depth",
    days: [
      "Day 8: Taste-test three types of miso — white (shiro), red (aka), and mixed.",
      "Day 9: Make miso butter. Put it on everything for 24 hours.",
      "Day 10: Make tsuyu dipping sauce from scratch.",
      "Day 11: Make a simple tsukemono (Japanese quick pickle) — cucumber or daikon.",
      "Day 12: Cook with sake — a simple sake-steamed chicken.",
      "Day 13: Make tamagoyaki (Japanese rolled omelette) — three attempts to get the roll right.",
      "Day 14: Cook onigiri — your first rice ball, three fillings.",
    ],
  },
  {
    week: "Week 3",
    theme: "Core Techniques",
    days: [
      "Day 15: Master karaage (Japanese fried chicken) — double-fry technique.",
      "Day 16: Make tempura batter correctly — cold water, lumpy batter, immediate service.",
      "Day 17: Cook yakitori — tare vs shio, char vs steam.",
      "Day 18: Make tonkatsu and tonkatsu sauce from scratch.",
      "Day 19: Cook oyakodon — chicken and egg over rice, the barely-set egg technique.",
      "Day 20: Make a simple Japanese potato salad — the Kewpie mayo difference.",
      "Day 21: Cook Japanese curry from scratch — no roux blocks.",
    ],
  },
  {
    week: "Week 4",
    theme: "Fusion and Beyond",
    days: [
      "Day 22: Make white miso pasta — the Italian-Japanese technique bridge.",
      "Day 23: Adapt a Japanese flavor to a Western dish of your choice.",
      "Day 24: Cook a full Japanese breakfast — rice, miso, tamagoyaki, fish, pickles.",
      "Day 25: Make ramen at home — miso, soy, or tonkotsu, your choice.",
      "Day 26: Cook natto for the first time — with all the correct additions.",
      "Day 27: Make Japanese cheesecake — the technique-driven baking difference.",
      "Day 28: Host a single-dish Japanese meal for someone else.",
      "Day 29: Build your permanent pantry list — what you'll keep stocked always.",
      "Day 30: Cook a full meal using only what you've learned. Name every technique.",
    ],
  },
];

const WHAT_YOU_GET = [
  "The 30-Day Challenge guide (PDF) — all 30 days with technique notes, recipes, and shopping lists",
  "Week 1 shopping list — the 12 ingredients that unlock the entire challenge",
  "The Japanese Pantry Cheat Sheet — what to buy, why, and what it does",
  "The Umami Flavor Matrix — how Japanese ingredients pair with Italian and Western cooking",
  "Daily email prompts — one technique per day, delivered to your inbox",
  "Access to the full Borderless Kitchen recipe archive — 200+ articles",
];

const FAQS = [
  {
    q: "How much time does each day require?",
    a: "Most days are 20-45 minutes. Week 1 pantry-building days are shorter; Week 3 technique days take a little longer. Day 7, 14, 21, and 28 are meal days — plan for 60-90 minutes.",
  },
  {
    q: "Where do I get the ingredients?",
    a: "Most ingredients for Week 1 can be found at any well-stocked grocery store. For fermented items (miso, mirin, sake, soy sauce varieties) and specialty items (dashi components, natto, furikake), you'll need an Asian grocery store or Amazon. The Week 1 shopping list keeps the initial investment under $50.",
  },
  {
    q: "Is this free?",
    a: "Yes, completely free. You get the PDF challenge guide, the cheat sheets, and the daily emails at no cost. We also offer a free 5-Day Mini-Course for cooks who want to go deeper into Japanese-Italian fusion specifically — but the 30-Day Challenge is a standalone, complete resource.",
  },
  {
    q: "What level of cooking experience do I need?",
    a: "None beyond basic kitchen competence. If you can boil water, use a knife, and follow a recipe, you can complete this challenge. Every technique is explained from first principles.",
  },
  {
    q: "Do I have to do it in order?",
    a: "The weeks build on each other (you'll use dashi in Week 2, techniques from Week 2 in Week 3), so we recommend following the order. But you can adapt the days within each week based on your schedule.",
  },
];

export default function ThirtyDayChallengePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Free Challenge
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                30 Days. One Japanese Kitchen.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed mb-8 max-w-2xl">
                One technique per day. Thirty days. At the end, you have a working
                Japanese pantry, a permanent set of techniques, and a different understanding
                of how umami, fermentation, and dashi actually work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="#signup"
                  className="inline-block font-ui text-eyebrow uppercase text-ink bg-paper px-8 py-4 hover:bg-vermillion hover:text-paper transition-colors duration-300"
                >
                  Get the free challenge →
                </a>
                <p className="font-ui text-eyebrow uppercase text-paper/40 self-center">
                  No credit card. No catch.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* What you'll have after 30 days */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                  After 30 days, you have a Japanese kitchen.
                </h2>
                <p className="font-body text-base text-ink/70 leading-relaxed mb-6">
                  Not just a set of recipes. A pantry you understand, techniques you can apply
                  to any ingredient, and a working knowledge of dashi, miso, fermented flavor,
                  and the umami system.
                </p>
                <p className="font-body text-base text-ink/70 leading-relaxed">
                  This is built around one central idea: Japanese cooking is about technique and
                  ingredients, not recipes. When you understand dashi and umami, you don't need
                  a recipe — you know what will taste good.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  ["A stocked pantry", "Kombu, katsuobushi, miso, mirin, sake, soy sauce, sesame — the 12 essential items and exactly what to do with each."],
                  ["Core techniques", "Dashi, miso soup, karaage, tempura, yakitori, tonkatsu, onigiri — the fundamentals that unlock everything else."],
                  ["Fermentation literacy", "Understand what miso, sake, mirin, and soy sauce are doing at a molecular level, not just what they taste like."],
                  ["Fusion capability", "The skill to apply Japanese technique to non-Japanese ingredients — the crossover that makes the cooking original."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4">
                    <span className="font-ui text-eyebrow text-vermillion shrink-0 mt-1">→</span>
                    <div>
                      <p className="font-ui text-eyebrow uppercase text-ink mb-1">{title}</p>
                      <p className="font-body text-sm text-ink/60 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* The 30 days */}
      <section className="py-16 md:py-24 border-b border-hairline bg-paper">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-12">
              The full 30 days.
            </h2>
            <div className="space-y-12">
              {WEEKS.map((week) => (
                <div key={week.week} className="border-t border-hairline pt-10">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-6">
                    <div className="md:w-48 shrink-0">
                      <p className="font-ui text-eyebrow uppercase text-vermillion">{week.week}</p>
                      <p className="font-display text-lg text-ink mt-1">{week.theme}</p>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-2">
                        {week.days.map((day) => (
                          <li key={day} className="flex gap-3">
                            <span className="font-ui text-eyebrow text-ink/30 shrink-0 mt-0.5">—</span>
                            <p className="font-body text-sm text-ink/70 leading-relaxed">{day}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">What&apos;s included</p>
                <h2 className="font-display text-display-2 text-ink mb-8 leading-tight">
                  Everything you need. Free.
                </h2>
                <ul className="space-y-4">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="font-ui text-eyebrow text-vermillion shrink-0 mt-1">✓</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="signup" className="border border-hairline p-10">
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">Get started</p>
                <p className="font-display text-display-2 text-ink mb-1">Free</p>
                <p className="font-body text-sm text-ink/50 mb-8">
                  No credit card. No catch. Just the challenge.
                </p>
                <NewsletterForm
                  label="Enter your email to start Day 1"
                  placeholder="you@somewhere.com"
                  buttonLabel="Start the challenge →"
                />
                <p className="font-ui text-eyebrow uppercase text-ink/30 text-center mt-4 text-xs">
                  Unsubscribe anytime. We email once per day during the challenge.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-b border-hairline bg-paper">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-12">Questions.</h2>
            <div className="space-y-0 max-w-2xl">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-8 border-b border-hairline">
                  <h3 className="font-display text-xl text-ink mb-3 leading-tight">{faq.q}</h3>
                  <p className="font-body text-base text-ink/70 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-ink text-paper border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="font-display text-display-3 text-paper leading-tight mb-3">
                  Thirty days. One technique at a time.
                </p>
                <p className="font-body text-base text-paper/60">
                  Free. No strings. Start any time.
                </p>
              </div>
              <a
                href="#signup"
                className="inline-block font-ui text-eyebrow uppercase text-ink bg-paper px-8 py-4 hover:bg-vermillion hover:text-paper transition-colors duration-300 shrink-0"
              >
                Get the free challenge →
              </a>
            </div>
          </FadeRise>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Already cooking? Start with 200+ free articles."
        body="Every technique in the challenge is documented in full in our journal. Browse by cuisine, technique, or search for any ingredient."
        cta="Explore the journal →"
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  title: "The Japanese-Italian Fusion Kitchen: A Free 5-Day Mini-Course | Borderless Kitchen",
  description:
    "Five days. Five techniques. Everything you need to cook confidently at the intersection of Japanese and Italian cooking — dashi, miso, umami pairing, and five foundational fusion recipes. Delivered free to your inbox.",
  openGraph: {
    title: "Free: The Fusion Kitchen Mini-Course",
    description:
      "5 days, 5 techniques, 5 recipes. The complete Japanese-Italian cooking foundation — delivered daily to your inbox, free.",
    type: "website",
  },
};

const DAYS = [
  {
    day: "Day 1",
    title: "Dashi — The Invisible Foundation",
    description:
      "Make ichiban dashi from scratch. Understand why kombu and katsuobushi together produce more umami than any other combination. Apply it to miso soup and as the base for Day 2.",
    href: "/mini-course/day-1",
  },
  {
    day: "Day 2",
    title: "Miso — Where Fermented Depth Meets Italian Technique",
    description:
      "Dissolve miso into pasta water. Make miso butter. Understand why white miso and Parmigiano are structurally equivalent and when to use each.",
    href: "/mini-course/day-2",
  },
  {
    day: "Day 3",
    title: "The Umami Pairing System",
    description:
      "Work through the Flavor Pairing Matrix. Learn the 24 Italian-Japanese swaps and why the synergy pairs (glutamate + inosinate) multiply umami 6-8x. Cook Ramen alla Carbonara.",
    href: "/mini-course/day-3",
  },
  {
    day: "Day 4",
    title: "Mirin, Sake, and the Japanese Approach to Sweetness",
    description:
      "Cook teriyaki from scratch. Understand why mirin is not the same as sugar and what fermented sweetness adds to a dish that refined sugar doesn't.",
    href: "/mini-course/day-4",
  },
  {
    day: "Day 5",
    title: "Build Your Own Fusion Dish",
    description:
      "Using the framework: identify the structure of an Italian or Japanese dish you love, find the equivalent components in the other tradition, and make it. The five-day course culminates in a dish you invented.",
    href: "/mini-course/day-5",
  },
];

const INCLUDES = [
  "5 detailed technique guides — one per day, straight to your inbox",
  "5 full recipes (including the Ramen alla Carbonara foundation recipe)",
  "The Flavor Pairing Matrix — the full 24-pair chart",
  "The Umami Cheat Sheet (one-page quick reference)",
  "Shopping list: the 12 ingredients you need for all 5 days",
  "Permanent access — every email is yours to keep",
];

const FAQS = [
  {
    q: "Do I need cooking experience?",
    a: "No. The course assumes you can boil water and use a knife — nothing more. Every technique is explained from first principles. Designed for Italian home cooks who are new to Japanese ingredients, and vice versa.",
  },
  {
    q: "What ingredients do I need?",
    a: "The core ingredients for all 5 days cost about $40–60 at an Asian grocery store or Amazon: kombu, katsuobushi, white miso, mirin, sake, soy sauce, sesame oil. You likely already have the Italian pantry items.",
  },
  {
    q: "How does it work?",
    a: "Sign up and you'll receive Day 1 immediately. Days 2–5 arrive on consecutive days. Each email is a self-contained technique guide with a full recipe. Work at your own pace — they'll be in your inbox when you're ready.",
  },
  {
    q: "I've already bought the book — is this different?",
    a: "Yes. The mini-course goes deeper on technique than the book does. The book is recipes; the course is the system behind the recipes — why the flavors work together, not just how to execute them. They complement each other.",
  },
];

export default function MiniCoursePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Free Mini-Course
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                The Japanese-Italian Fusion Kitchen.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed mb-10 max-w-2xl">
                Five days. Five techniques. Everything you need to cook confidently at
                the intersection of Japanese and Italian cooking — dashi, miso, the umami
                pairing system, and five foundational fusion recipes. Delivered free to your inbox.
              </p>
              <div className="max-w-md">
                <NewsletterForm
                  label="Start Day 1 now — enter your email"
                  placeholder="you@somewhere.com"
                  buttonLabel="Send me the course"
                />
                <p className="mt-4 font-ui text-xs text-paper/40">
                  Free. No credit card. Unsubscribe any time.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* The 5 days */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-12">
              Five days. One complete foundation.
            </h2>
            <div className="space-y-0">
              {DAYS.map((item) => (
                <Link
                  key={item.day}
                  href={item.href}
                  className="flex flex-col md:flex-row gap-4 md:gap-10 py-10 border-b border-hairline group hover:bg-ink/[0.02] transition-colors duration-300 -mx-4 px-4"
                >
                  <div className="md:w-32 shrink-0">
                    <p className="font-ui text-eyebrow uppercase text-vermillion">
                      {item.day}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-ink mb-2 leading-tight group-hover:text-vermillion transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-ink/70 leading-relaxed max-w-prose">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0 self-center">
                    <span className="font-ui text-eyebrow uppercase text-ink/30 group-hover:text-vermillion transition-colors">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-24 border-b border-hairline bg-paper">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-display text-display-2 text-ink mb-8">
                  What's included.
                </h2>
                <ul className="space-y-4">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="font-ui text-eyebrow text-vermillion shrink-0 mt-1">
                        ✓
                      </span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-hairline p-10">
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
                  Price
                </p>
                <p className="font-display text-display-1 text-ink mb-1">Free.</p>
                <p className="font-body text-sm text-ink/50 mb-8">
                  Five emails. Five techniques. Zero cost.
                </p>
                <NewsletterForm
                  label="Your email"
                  placeholder="you@somewhere.com"
                  buttonLabel="Start the course"
                />
                <div className="mt-8 pt-6 border-t border-hairline">
                  <p className="font-body text-sm text-ink/50 leading-relaxed">
                    Already cooking from the course? The book{" "}
                    <Link
                      href="/books/tokyo-meets-tuscany"
                      className="text-ink hover:text-vermillion transition-colors underline"
                    >
                      Tokyo Meets Tuscany
                    </Link>{" "}
                    has 30 full fusion recipes using the same system.
                  </p>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-12">
              Questions.
            </h2>
            <div className="space-y-0 max-w-2xl">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-8 border-b border-hairline">
                  <h3 className="font-display text-xl text-ink mb-3 leading-tight">
                    {faq.q}
                  </h3>
                  <p className="font-body text-base text-ink/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-3xl">
              <div>
                <p className="font-display text-display-3 text-ink leading-tight mb-2">
                  Five days. One foundation.
                </p>
                <p className="font-body text-base text-ink/60">
                  Everything you need to cook confidently at the intersection. Free.
                </p>
              </div>
              <NewsletterForm
                label="Start now"
                placeholder="you@somewhere.com"
                buttonLabel="Send me Day 1"
              />
            </div>
          </FadeRise>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Not ready for the course? Start with the free collection."
        body="Nineteen fusion recipes and the Flavor Pairing Matrix — free, no account needed."
        cta="Get the free collection →"
      />
    </>
  );
}

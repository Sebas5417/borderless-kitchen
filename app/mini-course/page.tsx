import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  title: "The Japanese-Italian Fusion Kitchen: A 5-Day Mini-Course | Borderless Kitchen",
  description:
    "Five days. Five techniques. Everything you need to cook confidently at the intersection of Japanese and Italian cooking — dashi, miso, umami pairing, and the five foundational fusion recipes.",
  openGraph: {
    title: "The Fusion Kitchen Mini-Course",
    description:
      "5 days, 5 techniques, 5 recipes. The complete Japanese-Italian cooking foundation — from dashi to carbonara — for home cooks who want to understand, not just follow.",
    type: "website",
  },
};

const DAYS = [
  {
    day: "Day 1",
    title: "Dashi — The Invisible Foundation",
    description:
      "Make ichiban dashi from scratch. Understand why kombu and katsuobushi together produce more umami than any other combination. Apply it to miso soup and as the base for Day 2.",
  },
  {
    day: "Day 2",
    title: "Miso — Where Fermented Depth Meets Italian Technique",
    description:
      "Dissolve miso into pasta water. Make miso butter. Understand why white miso and Parmigiano are structurally equivalent and when to use each.",
  },
  {
    day: "Day 3",
    title: "The Umami Pairing System",
    description:
      "Work through the Flavor Pairing Matrix. Learn the 24 Italian-Japanese swaps and why the synergy pairs (glutamate + inosinate) multiply umami 6-8x. Cook Ramen alla Carbonara.",
  },
  {
    day: "Day 4",
    title: "Mirin, Sake, and the Japanese Approach to Sweetness",
    description:
      "Cook teriyaki from scratch. Understand why mirin is not the same as sugar and what fermented sweetness adds to a dish that refined sugar doesn't.",
  },
  {
    day: "Day 5",
    title: "Build Your Own Fusion Dish",
    description:
      "Using the framework: identify the structure of an Italian or Japanese dish you love, find the equivalent components in the other tradition, and make it. The five-day course culminates in a dish you invented.",
  },
];

const INCLUDES = [
  "5 detailed technique guides — PDF format, printable",
  "5 full recipes (including the Ramen alla Carbonara foundation recipe)",
  "The Flavor Pairing Matrix — the full 24-pair chart",
  "The Umami Cheat Sheet (one-page quick reference)",
  "Shopping list: the 12 ingredients you need for all 5 days",
  "Lifetime access — revisit any lesson any time",
];

const FAQS = [
  {
    q: "Do I need cooking experience?",
    a: "No. The course assumes you can boil water and use a knife — nothing more. Every technique is explained from first principles. The course is designed for Italian home cooks who are new to Japanese ingredients, and vice versa.",
  },
  {
    q: "What ingredients do I need?",
    a: "The core ingredients for all 5 days cost about $40–60 at an Asian grocery store or Amazon: kombu, katsuobushi, white miso, mirin, sake, soy sauce, sesame oil. You likely already have the Italian pantry items.",
  },
  {
    q: "Is this a video course?",
    a: "No — this is a PDF-based learning experience. Detailed written technique guides with step-by-step instructions, diagrams where needed, and recipes. Works on any device, printable.",
  },
  {
    q: "What if I've already bought the book?",
    a: "The mini-course goes deeper on technique than the book does. The book is recipes; the course is the system behind the recipes. They complement each other. Buyers of Tokyo Meets Tuscany get $10 off with code TMTBOOK at checkout.",
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
                Mini-Course
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                The Japanese-Italian Fusion Kitchen.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed mb-8 max-w-2xl">
                Five days. Five techniques. Everything you need to cook confidently at
                the intersection of Japanese and Italian cooking — dashi, miso, the umami
                pairing system, and five foundational fusion recipes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://gumroad.com/l/[MINICOURSE-ID]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-ui text-eyebrow uppercase text-ink bg-paper px-8 py-4 hover:bg-vermillion hover:text-paper transition-colors duration-300"
                >
                  Get the course — $37 →
                </a>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <p className="font-ui text-eyebrow uppercase text-paper/50">
                    or
                  </p>
                  <Link
                    href="/free"
                    className="font-ui text-eyebrow uppercase text-paper/70 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                  >
                    Start with 19 free recipes first →
                  </Link>
                </div>
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
              {DAYS.map((item, i) => (
                <div
                  key={item.day}
                  className="flex flex-col md:flex-row gap-4 md:gap-10 py-10 border-b border-hairline"
                >
                  <div className="md:w-32 shrink-0">
                    <p className="font-ui text-eyebrow uppercase text-vermillion">
                      {item.day}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-ink/70 leading-relaxed max-w-prose">
                      {item.description}
                    </p>
                  </div>
                </div>
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
                <p className="font-display text-display-1 text-ink mb-1">$37</p>
                <p className="font-body text-sm text-ink/50 mb-8">
                  One-time. Lifetime access. Instant download.
                </p>
                <a
                  href="https://gumroad.com/l/[MINICOURSE-ID]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300 w-full"
                >
                  Get the course →
                </a>
                <p className="font-ui text-eyebrow uppercase text-ink/40 text-center mt-4">
                  Book buyers: code TMTBOOK saves $10
                </p>
                <div className="mt-8 pt-6 border-t border-hairline">
                  <p className="font-body text-sm text-ink/50 leading-relaxed">
                    Not sure? Start with the{" "}
                    <Link href="/free" className="text-ink hover:text-vermillion transition-colors underline">
                      19 free recipes
                    </Link>{" "}
                    — they use all the same techniques. If you want to understand the why behind
                    the recipes, the course is the next step.
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="font-display text-display-3 text-ink leading-tight">
                  Five days. One foundation.
                </p>
                <p className="font-body text-base text-ink/60 mt-2">
                  Everything you need to cook confidently at the intersection.
                </p>
              </div>
              <a
                href="https://gumroad.com/l/[MINICOURSE-ID]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300 shrink-0"
              >
                Get the course — $37 →
              </a>
            </div>
          </FadeRise>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Not ready for the course? Start with the free collection."
        body="Nineteen fusion recipes and the Flavor Pairing Matrix — free, no account needed. The same techniques as the course, in recipe form."
        cta="Get the free collection →"
      />
    </>
  );
}

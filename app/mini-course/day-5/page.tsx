import type { Metadata } from "next";
import Link from "next/link";
import { TMT_AMAZON } from "@/lib/amazon";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Day 5: Build Your Own Fusion Dish | Fusion Kitchen Mini-Course",
  description:
    "The five-day course culminates in a dish you invented. Using the framework: identify structure, find the equivalent components, build something original.",
};

const FRAMEWORK = [
  {
    step: "01",
    title: "Pick a dish you know well",
    detail:
      "Choose an Italian or Japanese dish you've cooked before and understand intuitively. The simpler, the better. Carbonara, cacio e pepe, miso soup, oyakodon — something with clear structure and distinct roles for each ingredient.",
  },
  {
    step: "02",
    title: "Identify the structural roles",
    detail:
      "Map every ingredient to its function. In carbonara: the pasta is structure, the egg emulsifies and enriches, the Pecorino/Parm adds fermented salt, the guanciale provides fat and inosinate, the pepper contrasts. Name each role.",
  },
  {
    step: "03",
    title: "Cross the pairing matrix",
    detail:
      "For each ingredient in the original dish, identify its Japanese (or Italian) equivalent from the Flavor Pairing Matrix. You don't have to swap everything — choose 1-3 crossovers that change the character without losing the structure.",
  },
  {
    step: "04",
    title: "Cook it as written, then adjust",
    detail:
      "Make the dish with the swapped ingredients without deviating from the original technique. The technique stays Japanese or Italian; only the ingredients cross. After your first attempt, taste what needs adjusting: more acid, more salt, more depth.",
  },
  {
    step: "05",
    title: "Name the principle, not the dish",
    detail:
      'After you\'ve cooked it once, write one sentence that describes what you did functionally: "I applied Japanese fermented sweetness (mirin) to an Italian acid-fat-emulsion structure (vinaigrette)." That sentence is more useful than a recipe.',
  },
];

const EXAMPLES = [
  {
    original: "Cacio e Pepe",
    tradition: "Italian",
    fusion: "Miso e Pepe",
    swaps: ["Parmigiano → white miso (fermented glutamate depth)", "Pecorino Romano → shiro dashi (fermented salt)", "Black pepper → sansho pepper (aromatic contrasting heat)"],
    result: "Same technique, different fermentation. The dish becomes sweeter and oceanic where the original is sharp and dry. The structure — starchy pasta water emulsified with fat and fermented protein — is unchanged.",
  },
  {
    original: "Oyakodon",
    tradition: "Japanese",
    fusion: "Pancetta Oyako",
    swaps: ["Chicken thigh → pancetta-wrapped chicken", "Dashi → light chicken stock", "Soy sauce → reduced balsamic + soy blend", "Mirin → white wine + honey reduction"],
    result: "The barely-set egg technique stays Japanese. The flavor profile moves toward Roman — more salt, more acid, less sweetness. The result is an egg-and-rice bowl that tastes like it was cooked in someone's Rome apartment but somehow also Tokyo.",
  },
  {
    original: "Pasta Aglio e Olio",
    tradition: "Italian",
    fusion: "Noodle Aglio e Shio",
    swaps: ["Spaghetti → ramen noodles (alkaline, chewy)", "Red pepper flakes → togarashi blend", "Parsley → shiso, torn", "Extra Parmesan → katsuobushi, stirred in at the end"],
    result: "Same structure: fat + garlic + starch + contrast herb. The katsuobushi blooms in the hot oil and adds a smoky oceanic note before the noodles go in. The shiso finishes brighter than parsley. A five-minute dish that proves the system works.",
  },
];

export default function Day5Page() {
  return (
    <>
      <div className="border-b border-hairline py-4">
        <Container>
          <div className="flex items-center gap-3 font-ui text-eyebrow uppercase text-ink/40 text-xs">
            <Link href="/mini-course" className="hover:text-vermillion transition-colors">
              Mini-Course
            </Link>
            <span>→</span>
            <span className="text-vermillion">Day 5 of 5</span>
          </div>
        </Container>
      </div>

      <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Day 5 — The Application
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                Build Your Own Dish.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed max-w-2xl">
                Everything from Days 1 through 4 was preparation for this. Today there's no recipe. You invent one. The framework is here — the creativity is yours.
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>

      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <div className="max-w-prose mx-auto">
            <FadeRise>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                The framework.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-10">
                Fusion cooking fails when it becomes arbitrary — two cuisines thrown together because they're both interesting. It succeeds when there's a structural reason for the combination. This framework gives you that reason.
              </p>

              <div className="space-y-0 mb-14">
                {FRAMEWORK.map(({ step, title, detail }) => (
                  <div key={step} className="flex gap-6 md:gap-10 py-8 border-b border-hairline">
                    <div className="shrink-0 w-10">
                      <span className="font-mono text-lg text-ink/30">{step}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-ink mb-3 leading-tight">{title}</h3>
                      <p className="font-body text-base text-ink/70 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Three examples to learn from.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-10">
                Don't cook these today — they're here to show you the framework in action. Read them, see the logic, then go make something of your own.
              </p>

              <div className="space-y-6 mb-14">
                {EXAMPLES.map((ex) => (
                  <div key={ex.original} className="border border-hairline p-8">
                    <div className="flex gap-4 items-start mb-4">
                      <div>
                        <p className="font-ui text-eyebrow uppercase text-ink/40 text-xs mb-1">{ex.tradition}</p>
                        <p className="font-display text-2xl text-ink">{ex.original}</p>
                      </div>
                      <div className="mx-4 self-center text-vermillion text-xl">→</div>
                      <div>
                        <p className="font-ui text-eyebrow uppercase text-ink/40 text-xs mb-1">Fusion</p>
                        <p className="font-display text-2xl text-ink">{ex.fusion}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-ui text-eyebrow uppercase text-ink/40 text-xs mb-2">The swaps</p>
                      <ul className="space-y-1">
                        {ex.swaps.map((swap) => (
                          <li key={swap} className="flex gap-2">
                            <span className="text-vermillion">—</span>
                            <p className="font-body text-sm text-ink/70">{swap}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-hairline pt-4">
                      <p className="font-ui text-eyebrow uppercase text-ink/40 text-xs mb-2">What it becomes</p>
                      <p className="font-body text-sm text-ink/70 leading-relaxed">{ex.result}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Now go cook.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                Pick a dish. Map the structure. Cross 1-3 ingredients from the pairing matrix. Cook it. Taste it. Adjust.
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                What you've built across these five days:
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "The ability to make dashi — the base of a cuisine",
                  "An understanding of miso as a functional equivalent to Parmigiano",
                  "The Flavor Pairing Matrix — 12 (or 24, in the PDF) functional swaps",
                  "An understanding of umami synergy and why certain combinations work",
                  "Knowledge of mirin and sake as distinct from their Western equivalents",
                  "The framework for inventing original fusion dishes, not just following recipes",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-ui text-vermillion shrink-0">✓</span>
                    <p className="font-body text-base text-ink/80 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="bg-ink border border-ink p-10 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">The point of this course</p>
                <p className="font-display text-xl text-paper leading-relaxed">
                  "A technique is more valuable than a recipe. A system is more valuable than a technique. You now have the system. Every dish you cook from here is an application of it."
                </p>
              </div>

              {/* What's next */}
              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                What's next.
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: "Tokyo Meets Tuscany",
                    desc: "37 fully tested fusion recipes using the same system you just learned — the complete Borderless Kitchen cookbook.",
                    link: "/books/tokyo-meets-tuscany",
                    cta: "Get the book",
                  },
                  {
                    title: "The 30-Day Challenge",
                    desc: "Build a complete Japanese pantry and technique set in 30 days. One technique per day — the next level after this course.",
                    link: "/30-day-challenge",
                    cta: "Start the challenge",
                  },
                  {
                    title: "The Free Recipe Collection",
                    desc: "19 free cross-cultural recipes plus the full Flavor Pairing Matrix. No account required — start cooking immediately.",
                    link: "/free",
                    cta: "Browse free recipes",
                  },
                ].map(({ title, desc, link, cta }) => (
                  <div key={title} className="border border-hairline p-6">
                    <p className="font-display text-lg text-ink mb-2 leading-tight">{title}</p>
                    <p className="font-body text-sm text-ink/60 leading-relaxed mb-4">{desc}</p>
                    <Link href={link} className="font-ui text-eyebrow uppercase text-vermillion text-xs hover:text-ink transition-colors">
                      {cta} →
                    </Link>
                  </div>
                ))}
              </div>

              <div className="border-t border-hairline pt-10 flex items-center gap-6">
                <Link href="/mini-course/day-4" className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors">
                  ← Day 4: Mirin & Sake
                </Link>
                <Link href="/mini-course" className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors ml-auto">
                  Course overview →
                </Link>
              </div>

            </FadeRise>
          </div>
        </Container>
      </section>

      {/* Book CTA */}
      <section className="py-16 md:py-20 border-t border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 max-w-4xl mx-auto">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Vol. I — Available now</p>
                <p className="font-display text-display-2 text-paper leading-tight mb-3">
                  Ready for 37 more recipes?
                </p>
                <p className="font-body text-base text-paper/60 max-w-prose leading-relaxed">
                  Tokyo Meets Tuscany applies the same system you just learned to 37 fully tested dishes — the complete Borderless Kitchen fusion cookbook.
                </p>
              </div>
              <Link
                href={TMT_AMAZON}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-ui text-eyebrow uppercase text-ink bg-paper px-10 py-5 hover:bg-vermillion hover:text-paper transition-colors duration-300 shrink-0"
              >
                Tokyo Meets Tuscany on Amazon →
              </Link>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

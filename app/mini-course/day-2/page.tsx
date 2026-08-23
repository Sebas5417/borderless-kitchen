import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Day 2: Miso — Where Fermented Depth Meets Italian Technique | Fusion Kitchen Mini-Course",
  description:
    "Dissolve miso into pasta water. Make miso butter. Understand why white miso and Parmigiano are structurally equivalent — and when to use each.",
};

export default function Day2Page() {
  return (
    <>
      <div className="border-b border-hairline py-4">
        <Container>
          <div className="flex items-center gap-3 font-ui text-eyebrow uppercase text-ink/40 text-xs">
            <Link href="/mini-course" className="hover:text-vermillion transition-colors">
              Mini-Course
            </Link>
            <span>→</span>
            <span className="text-vermillion">Day 2 of 5</span>
          </div>
        </Container>
      </div>

      <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Day 2 — The Bridge
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                Miso.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed max-w-2xl">
                The ingredient that makes fusion cooking click. Once you understand what miso does functionally, you'll see it everywhere — in pasta sauces, in vinaigrettes, in everything that was missing depth before.
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
                What you're making today.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                <strong>Miso butter</strong> and a bowl of <strong>white miso pasta</strong>. These two preparations will permanently change how you cook. Miso butter is your new compound butter for everything. Miso pasta is the original Japanese-Italian fusion dish — simpler than carbonara, richer than cacio e pepe.
              </p>

              {/* The comparison */}
              <div className="border border-hairline p-8 md:p-10 mb-10">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">The equivalence you need to understand</p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">Italian</p>
                    <p className="font-display text-2xl text-ink mb-2">Parmigiano Reggiano</p>
                    <ul className="space-y-2">
                      {[
                        "Aged 24–36 months",
                        "High glutamate content",
                        "Salty, umami, slightly sharp",
                        "Used in small amounts for depth",
                        "Dissolves into fat and starch",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">Japanese</p>
                    <p className="font-display text-2xl text-ink mb-2">Shiro Miso</p>
                    <ul className="space-y-2">
                      {[
                        "Fermented 1–3 months",
                        "High glutamate content",
                        "Salty, umami, slightly sweet",
                        "Used in small amounts for depth",
                        "Dissolves into fat and liquid",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-hairline mt-6 pt-6">
                  <p className="font-body text-sm text-ink/60 leading-relaxed">
                    Both are fermented products. Both derive their flavor from the breakdown of proteins into glutamates during long fermentation. Both function as <em>background depth</em> — their flavor is pervasive and invisible, not identifiable as a distinct taste. The key difference: miso is sweeter and less sharp than Parm. When substituting, reduce other salt and acid proportionally.
                  </p>
                </div>
              </div>

              {/* Miso Butter Recipe */}
              <div className="border border-hairline p-8 md:p-10 mb-10">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">Miso Butter</p>
                <p className="font-body text-sm text-ink/60 mb-6">Makes about 150g — keeps in the freezer for 3 months</p>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">What you need</p>
                  <ul className="space-y-2">
                    {[
                      "115g (½ cup / 1 stick) unsalted butter, room temperature",
                      "2 tablespoons white miso (shiro miso)",
                      "1 teaspoon mirin (or ½ tsp honey)",
                      "Optional: ½ teaspoon toasted sesame oil",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-ui text-vermillion shrink-0">—</span>
                        <p className="font-body text-base text-ink/80">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <ol className="space-y-4">
                  {[
                    "Beat the butter with a fork or spatula until smooth.",
                    "Add the miso, mirin, and sesame oil. Mix until fully combined and uniform in color.",
                    "Taste. It should be intensely savory, slightly sweet, deeply complex. Adjust miso to taste.",
                    "Roll into a log in parchment paper. Refrigerate for 1 hour before using. Freeze for long-term storage.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">0{i + 1}</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="border-t border-hairline mt-6 pt-6">
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">Use it on</p>
                  <p className="font-body text-sm text-ink/60">Steak, grilled fish, roasted vegetables, pasta, toast with honey, grilled corn, anything that needs depth.</p>
                </div>
              </div>

              {/* White Miso Pasta Recipe */}
              <div className="border border-hairline p-8 md:p-10 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">White Miso Pasta</p>
                <p className="font-body text-sm text-ink/60 mb-6">Serves 2 — 20 minutes</p>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">What you need</p>
                  <ul className="space-y-2">
                    {[
                      "200g spaghetti or tagliolini",
                      "3 tablespoons white miso",
                      "2 tablespoons unsalted butter",
                      "2 tablespoons of the miso butter you just made (or just more plain butter)",
                      "50g Parmigiano Reggiano, finely grated",
                      "Reserved pasta water",
                      "Black pepper",
                      "Optional: 1 egg yolk for richness",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-ui text-vermillion shrink-0">—</span>
                        <p className="font-body text-base text-ink/80">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <ol className="space-y-5">
                  {[
                    "Cook pasta in generously salted boiling water until 2 minutes before al dente. Reserve 1 full cup of pasta water before draining.",
                    "In a wide pan over medium-low heat, whisk the miso with 3-4 tablespoons of hot pasta water until smooth. Add the butter and miso butter. Let it emulsify into a sauce.",
                    "Add the pasta to the pan (still slightly undercooked). Add pasta water a splash at a time, tossing constantly. The starch from the pasta water thickens the sauce.",
                    "Remove from heat. Add Parmigiano in two additions, tossing vigorously. If using egg yolk, whisk it into 2 tablespoons of pasta water first, then add off-heat — the residual warmth is enough to cook it gently.",
                    "Taste. You should not need more salt — the miso and Parm carry it. Add cracked black pepper generously. Serve immediately.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">0{i + 1}</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-ink/[0.04] border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">Today's key insight</p>
                <p className="font-display text-xl text-ink leading-relaxed">
                  "Miso and Parmigiano are doing the same thing — adding fermented glutamate depth. In this pasta, you used both. That's not cheating; that's understanding how flavor works."
                </p>
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Tomorrow: the system.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-12">
                On Day 3, you'll work through the full Umami Pairing System — the 24 functional ingredient swaps that make this entire cuisine possible. You'll also cook Ramen alla Carbonara, the dish that shows exactly why Japanese and Italian cooking belong together.
              </p>

              <div className="border-t border-hairline pt-10 flex flex-col md:flex-row gap-6 md:justify-between md:items-center">
                <Link
                  href="/mini-course/day-1"
                  className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors"
                >
                  ← Day 1: Dashi
                </Link>
                <Link
                  href="/mini-course/day-3"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
                >
                  Day 3: The Umami System →
                </Link>
              </div>

            </FadeRise>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-ink/[0.02] border-t border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-10 items-start max-w-3xl mx-auto">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Get all 5 days by email</p>
                <p className="font-display text-display-3 text-ink leading-tight mb-4">
                  Daily lessons. Free, forever.
                </p>
                <p className="font-body text-sm text-ink/60 leading-relaxed">
                  Sign up to receive each lesson with extra notes, shopping lists, and printable reference cards — or keep reading here at your own pace.
                </p>
              </div>
              <NewsletterForm
                label="Your email"
                placeholder="you@somewhere.com"
                buttonLabel="Send me the course"
              />
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

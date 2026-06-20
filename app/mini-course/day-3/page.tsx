import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Day 3: The Umami Pairing System | Fusion Kitchen Mini-Course",
  description:
    "Work through the Flavor Pairing Matrix. Learn the 24 Italian-Japanese swaps and why the synergy pairs multiply umami 6-8x. Cook Ramen alla Carbonara.",
};

const PAIRINGS = [
  { italian: "Parmigiano Reggiano", japanese: "White Miso", function: "Fermented glutamate depth", note: "Miso is sweeter — reduce salt by 20%" },
  { italian: "Guanciale / Pancetta", japanese: "Kakuni (braised pork belly)", function: "Fatty pork with cured character", note: "Kakuni adds soy and mirin sweetness" },
  { italian: "Anchovy in oil", japanese: "Katsuobushi (bonito flakes)", function: "Concentrated inosinate — umami bomb", note: "Both dissolve invisibly into hot fat" },
  { italian: "Pecorino Romano", japanese: "Shiro dashi concentrate", function: "Sharp fermented salt", note: "Shiro dashi is liquid; reduce other liquid" },
  { italian: "White wine (dry)", japanese: "Dry sake (junmai)", function: "Alcohol + acid + aromatic depth", note: "Sake is lower acid and more floral" },
  { italian: "Chicken stock", japanese: "Kombu dashi", function: "Mineral-rich liquid base", note: "Dashi is cleaner — no fat or roast notes" },
  { italian: "Black pepper", japanese: "Sansho pepper", function: "Aromatic contrasting heat", note: "Sansho is citrus-floral, not spicy-hot" },
  { italian: "Lemon zest", japanese: "Yuzu zest", function: "Bright citrus aromatic", note: "Yuzu is more floral and intense" },
  { italian: "Basil", japanese: "Shiso (perilla leaf)", function: "Bright fresh herb, aromatic finish", note: "Shiso is more anise-forward" },
  { italian: "Capers", japanese: "Umeboshi paste", function: "Fermented acid + salt punch", note: "Umeboshi is more intensely sour" },
  { italian: "Butter emulsion", japanese: "Miso butter emulsion", function: "Rich fat carrier for umami", note: "Miso butter amplifies both functions" },
  { italian: "Spaghetti / Tagliolini", japanese: "Ramen noodle (chukamen)", function: "Structural starch noodle", note: "Alkaline chew; holds sauce differently" },
];

export default function Day3Page() {
  return (
    <>
      <div className="border-b border-hairline py-4">
        <Container>
          <div className="flex items-center gap-3 font-ui text-eyebrow uppercase text-ink/40 text-xs">
            <Link href="/mini-course" className="hover:text-vermillion transition-colors">
              Mini-Course
            </Link>
            <span>→</span>
            <span className="text-vermillion">Day 3 of 5</span>
          </div>
        </Container>
      </div>

      <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Day 3 — The System
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                The Umami Pairing System.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed max-w-2xl">
                Why do Japanese and Italian ingredients taste so good together? It's not an accident of geography or culture. It's chemistry. Today you learn the system — then cook the dish that proves it.
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
                Why this works at all.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                Italian and Japanese cuisines developed on opposite sides of the planet, with no cultural exchange for most of their histories. Yet they converge on the same flavor principles: umami-rich fermented ingredients, long-cooked broths, fresh herbs as contrast, starchy noodles as structure.
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                This isn't coincidence. Both cuisines evolved to extract maximum flavor from limited ingredients, and both arrived at fermentation as the deepest flavor technology available. Italy fermented milk (Parmigiano, Pecorino, aged cheeses), meat (guanciale, salumi), and fish (garum, anchovy). Japan fermented soybeans (miso, soy sauce), rice (sake, mirin), and fish (katsuobushi, shio koji).
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-12">
                The <strong>Umami Pairing System</strong> is the observation that these fermented ingredients are functionally equivalent — they do the same thing in a dish, at the same stage of cooking, for the same reason.
              </p>

              {/* Pairing Matrix */}
              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                The Flavor Pairing Matrix.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                12 functional pairs. For each Italian ingredient, here is the Japanese equivalent — what it does, and the key note when substituting.
              </p>

              <div className="overflow-x-auto mb-12">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink/20">
                      <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4 py-3">Italian</th>
                      <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4 hidden md:table-cell">Function</th>
                      <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4">Japanese</th>
                      <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 hidden lg:table-cell">Key Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAIRINGS.map((row, i) => (
                      <tr key={i} className="border-b border-hairline hover:bg-ink/[0.02] transition-colors">
                        <td className="font-body text-ink py-3 pr-4 font-medium">{row.italian}</td>
                        <td className="font-ui text-eyebrow uppercase text-ink/40 py-3 pr-4 text-xs hidden md:table-cell">{row.function}</td>
                        <td className="font-body text-ink py-3 pr-4">{row.japanese}</td>
                        <td className="font-body text-ink/50 py-3 text-sm hidden lg:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-ink/[0.04] border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">The science behind the synergy</p>
                <p className="font-body text-base text-ink/80 leading-relaxed mb-4">
                  Umami compounds fall into two categories: <strong>glutamates</strong> (found in fermented and aged foods: Parm, miso, soy sauce, kombu) and <strong>ribonucleotides</strong> — specifically inosinate and guanylate (found in meat, fish, and dried mushrooms).
                </p>
                <p className="font-body text-base text-ink/80 leading-relaxed">
                  When glutamates and ribonucleotides appear together, umami perception increases by a factor of <strong>6–8x</strong> — not 2x, not additive, but multiplicative. This is called umami synergy. Parmigiano (glutamate) + guanciale (inosinate) in carbonara. Kombu (glutamate) + katsuobushi (inosinate) in dashi. These dishes taste so good partly because they exploit this synergy systematically.
                </p>
              </div>

              {/* Ramen alla Carbonara */}
              <h2 className="font-display text-display-2 text-ink mb-4 leading-tight">
                Ramen alla Carbonara.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                The dish that makes the system concrete. Classic carbonara logic — egg, fat, fermented protein — applied across both traditions simultaneously.
              </p>

              <div className="border border-hairline p-8 md:p-10 mb-10">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">Ramen alla Carbonara</p>
                <p className="font-body text-sm text-ink/60 mb-6">Serves 2 — 35 minutes</p>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">What you need</p>
                  <ul className="space-y-2">
                    {[
                      "200g fresh ramen noodles (or 180g dried — look for wavy alkaline noodles)",
                      "100g guanciale or pancetta, cut into small cubes",
                      "2 whole eggs + 2 additional yolks",
                      "50g Parmigiano Reggiano, finely grated",
                      "1 tablespoon white miso",
                      "1 tablespoon katsuobushi (bonito flakes)",
                      "Coarsely cracked black pepper",
                      "Toasted nori, torn, for serving",
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
                    "In a small bowl, whisk together eggs, yolks, and Parmigiano. Add the miso and whisk until smooth. This is your carbonara base — the miso replaces some Pecorino and adds fermented depth without being identifiable.",
                    "Cook guanciale in a dry pan over medium heat until crispy and the fat has rendered. Add the katsuobushi to the hot fat, stir for 30 seconds — it toasts and absorbs the pork fat. Remove from heat. The katsuobushi will crisp slightly.",
                    "Cook ramen noodles according to package. Reserve 1 cup of noodle water. Drain and add to the guanciale pan (heat off).",
                    "Working quickly, pour the egg-miso mixture over the noodles. Toss constantly, adding pasta water a little at a time. The goal: creamy, glossy sauce — not scrambled eggs. The noodle water drops the temp of the pan and the starch helps emulsify.",
                    "Plate into warmed bowls. Finish with cracked black pepper, a few torn pieces of nori, and extra Parmigiano. Eat immediately.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">0{i + 1}</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="border-t border-hairline mt-8 pt-6">
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">What just happened</p>
                  <p className="font-body text-sm text-ink/60 leading-relaxed">
                    Guanciale (inosinate) + katsuobushi (inosinate) + Parmigiano (glutamate) + miso (glutamate) = four umami sources hitting both categories simultaneously. This dish has more umami synergy than either traditional carbonara or a Japanese ramen broth. The result tastes "more" than the sum of its parts.
                  </p>
                </div>
              </div>

              <div className="bg-ink/[0.04] border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">Today's key insight</p>
                <p className="font-display text-xl text-ink leading-relaxed">
                  "Fusion cooking isn't about combining things that taste good together. It's about understanding that two traditions arrived at the same functional solution — and using both at once."
                </p>
              </div>

              <div className="border-t border-hairline pt-10 flex flex-col md:flex-row gap-6 md:justify-between md:items-center">
                <Link href="/mini-course/day-2" className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors">
                  ← Day 2: Miso
                </Link>
                <Link
                  href="/mini-course/day-4"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
                >
                  Day 4: Mirin & Sake →
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
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Get the printable Pairing Matrix</p>
                <p className="font-display text-display-3 text-ink leading-tight mb-4">
                  All 24 pairs. One page.
                </p>
                <p className="font-body text-sm text-ink/60 leading-relaxed">
                  Sign up to receive the full Flavor Pairing Matrix as a downloadable PDF — with all 24 functional pairs, not just the 12 shown here.
                </p>
              </div>
              <NewsletterForm
                label="Your email"
                placeholder="you@somewhere.com"
                buttonLabel="Send me the chart"
              />
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

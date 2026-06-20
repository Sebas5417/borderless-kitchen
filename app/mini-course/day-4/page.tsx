import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Day 4: Mirin, Sake & Fermented Sweetness | Fusion Kitchen Mini-Course",
  description:
    "Cook teriyaki from scratch. Understand why mirin is not the same as sugar and what fermented sweetness adds to a dish that refined sugar doesn't.",
};

export default function Day4Page() {
  return (
    <>
      <div className="border-b border-hairline py-4">
        <Container>
          <div className="flex items-center gap-3 font-ui text-eyebrow uppercase text-ink/40 text-xs">
            <Link href="/mini-course" className="hover:text-vermillion transition-colors">
              Mini-Course
            </Link>
            <span>→</span>
            <span className="text-vermillion">Day 4 of 5</span>
          </div>
        </Container>
      </div>

      <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Day 4 — Sweetness & Alcohol
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                Mirin & Sake.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed max-w-2xl">
                Two ingredients that seem simple — sweetener and alcohol — but work differently from their Western equivalents because of fermentation. Understanding the difference changes how you season everything.
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
                Why mirin isn't sugar.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                Both mirin and sugar make food taste sweet. But they do so differently, and the difference matters.
              </p>

              <div className="border border-hairline p-8 md:p-10 mb-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Sugar</p>
                    <ul className="space-y-3">
                      {[
                        "Pure sucrose — one-dimensional sweetness",
                        "No complexity or depth",
                        "Does not contribute aroma",
                        "Caramelizes above 160°C into bitter compounds",
                        "No protein interaction (no Maillard at normal temps)",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Mirin (hon-mirin)</p>
                    <ul className="space-y-3">
                      {[
                        "Complex sugars from rice + koji fermentation",
                        "Subtle sweetness with umami undertone",
                        "Contributes aromatic depth (300+ compounds)",
                        "Promotes glossy, lacquered surface on protein",
                        "The alcohol carries aromatics and tenderizes",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-hairline mt-6 pt-6">
                  <p className="font-body text-sm text-ink/60 leading-relaxed">
                    <strong>Practical rule:</strong> Never substitute sugar for mirin 1:1. If you must substitute, use 1 tsp honey + ½ tsp dry sake for every tablespoon of mirin. Buy <em>hon-mirin</em> (real mirin, 14% alcohol) not <em>mirin-style seasoning</em> (corn syrup with additives). The difference in cooking is significant.
                  </p>
                </div>
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Why sake isn't white wine.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                Italian cooking uses dry white wine as an aromatic base — in soffritto, in pan sauces, in braises. Sake fills the same structural role in Japanese cooking but brings a different flavor profile.
              </p>

              <div className="border border-hairline p-8 mb-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Dry white wine</p>
                    <ul className="space-y-2">
                      {[
                        "Made from grapes (fructose + glucose)",
                        "High acidity — tartaric + malic acid",
                        "Tannins (especially in whites)",
                        "~11-13% alcohol",
                        "Fruity aromatic profile",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Junmai sake (dry)</p>
                    <ul className="space-y-2">
                      {[
                        "Made from rice (polished, fermented with koji)",
                        "Lower acid — lactic + succinic acid",
                        "No tannins — softer mouthfeel",
                        "~15-16% alcohol",
                        "Subtle umami + floral aromatic profile",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-ink/30">—</span>
                          <p className="font-body text-sm text-ink/70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="font-display text-display-2 text-ink mb-4 leading-tight">
                Today's dish: Teriyaki from scratch.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                Real teriyaki is three ingredients — soy sauce, mirin, and sake — reduced into a glaze. It is not a bottle of thick sweet sauce. Making it from scratch shows you exactly what mirin and sake do when heat is applied.
              </p>

              <div className="border border-hairline p-8 md:p-10 mb-10">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">Chicken Teriyaki — From Scratch</p>
                <p className="font-body text-sm text-ink/60 mb-6">Serves 2 — 30 minutes</p>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">The teriyaki tare (sauce)</p>
                  <ul className="space-y-2">
                    {[
                      "4 tablespoons soy sauce (koikuchi — standard dark soy)",
                      "3 tablespoons mirin (hon-mirin)",
                      "2 tablespoons sake",
                      "1 teaspoon sugar (optional — adds lacquer quality to glaze)",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-ui text-vermillion shrink-0">—</span>
                        <p className="font-body text-base text-ink/80">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">Everything else</p>
                  <ul className="space-y-2">
                    {[
                      "2 bone-in, skin-on chicken thighs",
                      "1 tablespoon neutral oil",
                      "Steamed short-grain rice, to serve",
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
                    "Make the tare first: combine all tare ingredients in a small saucepan. Bring to a simmer and cook for 2 minutes until slightly reduced and the alcohol has cooked off. Set aside. Taste — it should be intensely savory, glossy, and balanced between salt and sweet.",
                    "Score the chicken skin in 3-4 places to prevent curling. Season lightly with salt — not too much, the tare is salty.",
                    "Heat oil in a heavy pan over medium-high. Place chicken skin-side down. Cook without moving for 8 minutes — let the skin render and crisp. The fat will pool in the pan; spoon it off.",
                    "Flip. Cook the flesh side for 4 minutes. Reduce heat to medium.",
                    "Pour the tare into the pan. Baste the chicken continuously as the sauce reduces — tipping the pan and spooning the glaze over the skin repeatedly. This is the 'teri' technique — the glaze builds in layers. Cook for 3-4 more minutes until the sauce is thick and lacquered.",
                    "Rest for 3 minutes. Slice and serve over rice with the remaining glaze spooned over.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">0{i + 1}</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Fusion extension */}
              <div className="border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">Fusion extension: Teriyaki Agrodolce</p>
                <p className="font-body text-base text-ink/80 leading-relaxed mb-4">
                  Italian <em>agrodolce</em> (sweet-sour sauce) and teriyaki tare are structurally related — both use a sweet element reduced with an acid. Fuse them:
                </p>
                <p className="font-body text-base text-ink/80 leading-relaxed">
                  Add 1 tablespoon of balsamic vinegar to the teriyaki tare. The result is a glaze that bridges both traditions — the umami depth of soy-mirin with the sharp acid brightness of balsamic. Use it on duck or salmon. Call it what it is: two cuisines doing the same thing.
                </p>
              </div>

              <div className="bg-ink/[0.04] border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">Today's key insight</p>
                <p className="font-display text-xl text-ink leading-relaxed">
                  "Mirin adds sweetness the way Parmigiano adds umami — it's a byproduct of fermentation that tastes like more than what it is. That's what fermentation does: it makes simple ingredients complex."
                </p>
              </div>

              <div className="border-t border-hairline pt-10 flex flex-col md:flex-row gap-6 md:justify-between md:items-center">
                <Link href="/mini-course/day-3" className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors">
                  ← Day 3: The Umami System
                </Link>
                <Link
                  href="/mini-course/day-5"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
                >
                  Day 5: Build Your Own Dish →
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
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">One more day left</p>
                <p className="font-display text-display-3 text-ink leading-tight mb-4">
                  Tomorrow: build your own fusion dish.
                </p>
                <p className="font-body text-sm text-ink/60 leading-relaxed">
                  Get Day 5 — and the full reference pack — by email. Or come back here tomorrow.
                </p>
              </div>
              <NewsletterForm
                label="Your email"
                placeholder="you@somewhere.com"
                buttonLabel="Send me Day 5"
              />
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

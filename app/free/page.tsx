import type { Metadata } from "next";
import Link from "next/link";
import { allFreeRecipes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Free Recipes + Flavor Pairing Chart | Borderless Kitchen",
  description:
    "Five free fusion recipes and the Flavor Pairing Matrix — the Italian × Japanese ingredient chart that maps every component of Tokyo Meets Tuscany. No signup required for the recipes.",
  openGraph: {
    title: "Free Recipes + Flavor Pairing Chart",
    description:
      "The Borderless Kitchen free collection: five cross-cultural recipes and the Flavor Pairing Matrix that explains why they work.",
    type: "website",
  },
};

const FREE_RECIPES = allFreeRecipes
  .slice()
  .sort((a, b) => (a.ordering ?? 99) - (b.ordering ?? 99));

const CHART_PREVIEW = [
  { italian: "Parmigiano Reggiano", function: "Glutamate depth", japanese: "White Miso", note: "Miso is sweeter; reduce salt elsewhere" },
  { italian: "Guanciale", function: "Animal fat + inosinate", japanese: "Pancetta + katsuobushi", note: "Katsuobushi adds oceanic smokiness" },
  { italian: "Pecorino Romano", function: "Sharp fermented salt", japanese: "Shiro dashi", note: "Lower volume; stronger per gram" },
  { italian: "Spaghetti", function: "Structural starch noodle", japanese: "Ramen noodle", note: "Alkaline chew; holds sauce differently" },
  { italian: "Anchovy in oil", function: "Umami bomb, fat carrier", japanese: "Katsuobushi flakes", note: "Both dissolve into the fat invisibly" },
  { italian: "White wine", function: "Acid cut + alcohol", japanese: "Dry sake", note: "Sake is lower in tannins; sweeter finish" },
  { italian: "Black pepper", function: "Aromatic contrasting heat", japanese: "Sansho pepper", note: "Sansho is more citrus-floral, less spice" },
  { italian: "Chicken stock", function: "Liquid body + mineral depth", japanese: "Kombu dashi", note: "Dashi is cleaner; no fat or roast notes" },
];

export default function FreePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper py-20 md:py-32">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-6">
              Free from Borderless Kitchen
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl mb-6">
              The recipes. The chart. The logic behind it all.
            </h1>
            <p className="font-body text-xl text-paper/70 max-w-2xl leading-relaxed">
              Five cross-cultural recipes — free, no account needed. Plus the
              Flavor Pairing Matrix: the Italian{" "}
              <span className="text-vermillion">×</span> Japanese ingredient
              chart that explains why every swap in{" "}
              <em>Tokyo Meets Tuscany</em> works.
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* Free Recipes */}
      <section className="py-16 md:py-24 bg-paper">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-2">
              Five free recipes
            </h2>
            <p className="font-body text-lg text-ink/60 mb-12 max-w-prose">
              Full recipes, no paywall. Each one demonstrates a core principle
              from the book.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-hairline">
              {FREE_RECIPES.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="group border-b border-r border-hairline p-8 hover:bg-ink/[0.02] transition-colors duration-300"
                >
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
                    {recipe.cuisine}
                  </p>
                  <h3 className="font-display text-xl text-ink leading-tight mb-2 group-hover:text-vermillion transition-colors duration-300">
                    {recipe.title}
                  </h3>
                  <p className="font-body text-sm text-ink/60 leading-relaxed mb-4">
                    {recipe.dek}
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-ink/30 text-xs">
                    {recipe.totalTime.replace("PT", "").replace("H", "h ").replace("M", " min")} ·{" "}
                    {recipe.recipeYield}
                  </p>
                </Link>
              ))}
              {/* Placeholder card for more */}
              <div className="border-b border-r border-hairline p-8 bg-ink/[0.01]">
                <p className="font-ui text-eyebrow uppercase text-ink/20 mb-2">
                  Coming soon
                </p>
                <h3 className="font-display text-xl text-ink/30 leading-tight mb-2">
                  More recipes dropping soon
                </h3>
                <p className="font-body text-sm text-ink/40 leading-relaxed">
                  Birria Ramen. Matcha Tiramisu. Dashi Risotto. Building the
                  collection.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Flavor Pairing Chart Preview */}
      <section className="py-16 md:py-24 bg-ink/[0.02] border-y border-hairline">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
                  Free download
                </p>
                <h2 className="font-display text-display-2 text-ink leading-tight mb-6">
                  The Flavor Pairing Matrix
                </h2>
                <p className="font-body text-base text-ink/70 leading-relaxed mb-6">
                  Every Japanese-Italian substitution mapped by function — not
                  by taste, not by vibe, by what each ingredient actually does.
                  Eight categories, sixteen pairings, one page.
                </p>
                <p className="font-body text-base text-ink/70 leading-relaxed mb-8">
                  Enter your email and get the printable PDF version free.
                </p>
                <NewsletterForm
                  label="Get the chart"
                  placeholder="your@email.com"
                  buttonLabel="Send it →"
                />
                <p className="font-ui text-xs text-ink/30 mt-4">
                  No spam. You can also buy the formatted PDF version at{" "}
                  <a
                    href="https://gumroad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-vermillion transition-colors"
                  >
                    Gumroad
                  </a>{" "}
                  for $7.99 if you want the print-quality version.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-ink/20">
                        <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4">
                          Italian
                        </th>
                        <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4">
                          Function
                        </th>
                        <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 pr-4">
                          Japanese Equivalent
                        </th>
                        <th className="font-ui text-eyebrow uppercase text-ink/50 text-left pb-3 hidden lg:table-cell">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHART_PREVIEW.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-hairline hover:bg-ink/[0.02] transition-colors"
                        >
                          <td className="font-body text-ink py-3 pr-4 font-medium">
                            {row.italian}
                          </td>
                          <td className="font-ui text-eyebrow uppercase text-ink/40 py-3 pr-4 text-xs">
                            {row.function}
                          </td>
                          <td className="font-body text-ink py-3 pr-4">
                            {row.japanese}
                          </td>
                          <td className="font-body text-ink/50 py-3 text-sm hidden lg:table-cell">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="font-ui text-xs text-ink/30 mt-4">
                    Preview — 8 of 16 pairings. Full matrix in the PDF.
                  </p>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Book CTA */}
      <section className="py-16 md:py-20 bg-paper">
        <Container>
          <FadeRise>
            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              <div className="flex-1">
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
                  Vol. I — Available now
                </p>
                <h2 className="font-display text-display-2 text-ink leading-tight max-w-xl">
                  The free recipes are the appetizer.
                </h2>
                <p className="font-body text-lg text-ink/60 mt-4 max-w-prose leading-relaxed">
                  Thirty-seven fully tested fusion recipes — the complete Tokyo
                  Meets Tuscany cookbook. Every recipe in the book runs through
                  the same functional logic as the free ones.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="https://www.amazon.com/dp/B0GY8H2TCQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-10 py-5 hover:bg-vermillion transition-colors duration-300"
                >
                  Tokyo Meets Tuscany on Amazon →
                </Link>
                <p className="font-ui text-eyebrow uppercase text-ink/30 mt-3 text-xs">
                  Paperback $24.99 · Hardcover $34.99 · Kindle $9.99
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

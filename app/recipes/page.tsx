import type { Metadata } from "next";
import Link from "next/link";
import { allFreeRecipes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/editorial/PageHero";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { RecipeListItem } from "@/components/cards/RecipeListItem";
import { cuisineHubs } from "@/lib/cuisines";

export const metadata: Metadata = {
  alternates: { canonical: "/recipes" },
  title: "Free Recipes | Borderless Kitchen",
  description:
    "Free Japanese-Italian fusion recipes from the Borderless Kitchen series — Ramen alla Carbonara, Udon Bolognese, Miso White Pizza, and more. Full instructions, no paywall.",
  openGraph: {
    title: "Free Recipes | Borderless Kitchen",
    description:
      "Japanese-Italian fusion recipes you can cook tonight. Full instructions, no paywall.",
    type: "website",
  },
};

export default function RecipesPage() {
  const recipes = [...allFreeRecipes].sort((a, b) => a.ordering - b.ordering);
  const hubs = cuisineHubs(allFreeRecipes);

  return (
    <>
      <PageHero
        eyebrow="Free Recipes"
        headline="Cook the fusion. Free."
        dek="Full recipes — ingredients, method, the science behind why each pairing works. No paywall. More depth is in the book."
        src="/images/banner-culture.png"
        alt="Editorial banner — free recipes from the Borderless Kitchen series."
      />

      <section className="py-16 md:py-24">
        <Container>
          {hubs.length > 0 ? (
            <div className="mb-12">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">Browse by cuisine</p>
              <ul className="flex flex-wrap gap-3">
                {hubs.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/recipes/cuisine/${h.slug}`}
                      className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
                    >
                      {h.label} ({h.recipes.length})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <FadeRise>
            <ul className="divide-y divide-hairline">
              {recipes.map((recipe) => (
                <RecipeListItem key={recipe.slug} recipe={recipe} />
              ))}
            </ul>
          </FadeRise>

          {recipes.length === 0 && (
            <p className="font-body text-ink/50 py-16">
              First recipe dropping soon — check back shortly.
            </p>
          )}
        </Container>
      </section>

      <section className="py-14 md:py-20 border-t border-hairline">
        <Container>
          <div className="max-w-prose">
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
              36 more recipes
            </p>
            <p className="font-body text-lg text-ink/70 leading-relaxed">
              The full collection — Chili Oil Lasagna Roll-Ups, Matcha Tiramisu, the Flavor
              Pairing Matrix, and 33 more — lives in{" "}
              <Link
                href="/books/tokyo-meets-tuscany"
                className="text-ink underline decoration-hairline underline-offset-4 hover:text-vermillion hover:decoration-vermillion transition-colors duration-300"
              >
                Tokyo Meets Tuscany
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Get the Flavor Pairing Matrix free."
        body="The Italian × Japanese ingredient chart behind every recipe in the book. Printable, one page."
        cta="Get the free chart →"
      />
    </>
  );
}

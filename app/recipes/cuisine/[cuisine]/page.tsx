import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFreeRecipes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/editorial/PageHero";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { RecipeListItem } from "@/components/cards/RecipeListItem";
import { breadcrumbJson } from "@/lib/breadcrumbSchema";
import { cuisineHubs, cuisineIntro, cuisineLabel } from "@/lib/cuisines";

const SITE = "https://borderlesskitchenseries.com";

export async function generateStaticParams() {
  return cuisineHubs(allFreeRecipes).map((h) => ({ cuisine: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cuisine: string }>;
}): Promise<Metadata> {
  const { cuisine } = await params;
  const hub = cuisineHubs(allFreeRecipes).find((h) => h.slug === cuisine);
  if (!hub) return {};
  const title = `${hub.label} Recipes`;
  const description = cuisineIntro(hub.slug);
  return {
    title,
    description,
    alternates: { canonical: `/recipes/cuisine/${hub.slug}` },
    openGraph: {
      title: `${title} — Borderless Kitchen`,
      description,
      type: "website",
      url: `/recipes/cuisine/${hub.slug}`,
    },
  };
}

export default async function CuisineHubPage({
  params,
}: {
  params: Promise<{ cuisine: string }>;
}) {
  const { cuisine } = await params;
  const hubs = cuisineHubs(allFreeRecipes);
  const hub = hubs.find((h) => h.slug === cuisine);
  if (!hub) notFound();

  const recipes = [...hub.recipes].sort((a, b) => a.ordering - b.ordering);
  const label = cuisineLabel(hub.slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} Recipes`,
    description: cuisineIntro(hub.slug),
    url: `${SITE}/recipes/cuisine/${hub.slug}`,
    isPartOf: { "@type": "WebSite", name: "Borderless Kitchen", url: SITE },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: recipes.length,
      itemListElement: recipes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        url: `${SITE}/recipes/${r.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJson([
            { name: "Recipes", path: "/recipes" },
            { name: `${label} Recipes`, path: `/recipes/cuisine/${hub.slug}` },
          ]),
        }}
      />

      <PageHero
        eyebrow={`Free Recipes · ${label}`}
        headline={`${label} recipes, written in full.`}
        dek={cuisineIntro(hub.slug)}
        src="/images/banner-culture.png"
        alt={`Editorial banner — free ${label} recipes from the Borderless Kitchen series.`}
      />

      <section className="py-16 md:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/recipes"
              className="font-ui text-eyebrow uppercase text-ink/50 hover:text-ink transition-colors duration-300"
            >
              ← All recipes
            </Link>
          </nav>
          <FadeRise>
            <ul className="divide-y divide-hairline">
              {recipes.map((recipe) => (
                <RecipeListItem key={recipe.slug} recipe={recipe} />
              ))}
            </ul>
          </FadeRise>

          <div className="mt-16 pt-10 border-t border-hairline">
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">Browse by cuisine</p>
            <ul className="flex flex-wrap gap-3">
              {hubs.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/recipes/cuisine/${h.slug}`}
                    aria-current={h.slug === hub.slug ? "page" : undefined}
                    className={`font-ui text-eyebrow uppercase border px-4 py-2 transition-colors duration-300 ${
                      h.slug === hub.slug
                        ? "border-vermillion text-vermillion"
                        : "border-hairline text-ink hover:border-vermillion hover:text-vermillion"
                    }`}
                  >
                    {h.label} ({h.recipes.length})
                  </Link>
                </li>
              ))}
            </ul>
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

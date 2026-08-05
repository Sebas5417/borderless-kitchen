import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allFreeRecipes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { ProseLayout } from "@/components/editorial/ProseLayout";
import { MDXContent } from "@/components/MDXContent";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { EditorialImage } from "@/components/media/EditorialImage";
import { tmtAmazonUrl } from "@/lib/amazon";

export async function generateStaticParams() {
  return allFreeRecipes.map((r) => ({ slug: r.slug }));
}

/** "PT3H20M" → "3 hr 20 min", "PT45M" → "45 min". */
function formatDuration(iso: string): string {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!m) return iso;
  const parts: string[] = [];
  if (m[1]) parts.push(`${m[1]} hr`);
  if (m[2]) parts.push(`${m[2]} min`);
  return parts.join(" ") || iso;
}

/** Strip a manual "| Borderless Kitchen" suffix — the layout template already brands titles. */
function pageTitle(recipe: { metaTitle?: string; title: string }): string {
  const raw = recipe.metaTitle ?? `${recipe.title} Recipe`;
  return raw.replace(/\s*\|\s*Borderless Kitchen\s*$/i, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = allFreeRecipes.find((r) => r.slug === slug);
  if (!recipe) return {};
  const title = pageTitle(recipe);
  const description = recipe.metaDescription ?? recipe.dek;
  return {
    title,
    description,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/recipes/${recipe.slug}`,
      images: recipe.heroImageSrc ? [{ url: recipe.heroImageSrc }] : [],
    },
    twitter: recipe.heroImageSrc
      ? { card: "summary_large_image", images: [recipe.heroImageSrc] }
      : undefined,
  };
}

import { TMT_AMAZON } from "@/lib/amazon";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = allFreeRecipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.dek,
    author: {
      "@type": "Person",
      name: "Sebastian Dri",
      url: "https://borderlesskitchenseries.com/about",
    },
    datePublished: recipe.date,
    ...(recipe.cookTime ? { cookTime: recipe.cookTime } : {}),
    ...(recipe.prepTime ? { prepTime: recipe.prepTime } : {}),
    totalTime: recipe.totalTime,
    recipeYield: recipe.recipeYield,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    ...(recipe.heroImageSrc
      ? { image: [`https://borderlesskitchenseries.com${recipe.heroImageSrc}`] }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "Borderless Kitchen",
      url: "https://borderlesskitchenseries.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://borderlesskitchenseries.com" },
      { "@type": "ListItem", position: 2, name: "Recipes", item: "https://borderlesskitchenseries.com/recipes" },
      { "@type": "ListItem", position: 3, name: recipe.title, item: `https://borderlesskitchenseries.com/recipes/${recipe.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "55vh" }}>
        <div className="absolute inset-0">
          {recipe.heroImageSrc ? (
            <Image
              src={recipe.heroImageSrc}
              alt={recipe.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55"
            />
          ) : (
            <EditorialImage
              alt={recipe.heroImageAlt}
              aspect="hero-wide"
              slot={`recipe-hero-${recipe.slug}`}
              className="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-charcoal-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/30 to-charcoal-deep/40" />
        </div>

        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "55vh" }}>
          <Container className="pb-12 md:pb-20 pt-32">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/recipes"
                className="font-ui text-eyebrow uppercase text-paper/50 hover:text-paper/80 transition-colors duration-300"
              >
                ← Recipes
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="font-ui text-eyebrow uppercase text-paper/50">
                {recipe.cuisine}
              </span>
              <span className="text-paper/30">·</span>
              <span className="font-ui text-eyebrow uppercase text-paper/50">
                {formatDuration(recipe.totalTime)}
              </span>
              <span className="text-paper/30">·</span>
              <span className="font-ui text-eyebrow uppercase text-paper/50">
                Serves {recipe.recipeYield.replace(" servings", "")}
              </span>
            </div>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl">
              {recipe.title}
            </h1>
            <p className="font-display italic text-xl text-paper/70 mt-4 max-w-2xl">
              {recipe.dek}
            </p>
          </Container>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 md:py-24">
        <Container>
          <ProseLayout>
            <MDXContent code={recipe.body.code} />
          </ProseLayout>

          {/* Book CTA */}
          <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
            <p className="font-display italic text-display-3 text-ink/60 mb-6 leading-tight">
              30 recipes and 6 master sauces in the book.
            </p>
            <AmazonCTA href={TMT_AMAZON} label="Get Tokyo Meets Tuscany on Amazon" />
            <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
              Paperback · Kindle
            </p>
          </div>

          {/* Related recipes */}
          {recipe.relatedSlugs && recipe.relatedSlugs.length > 0 && (
            <div className="max-w-prose mx-auto mt-12 pt-10 border-t border-hairline">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
                More free recipes
              </p>
              <ul className="flex flex-wrap gap-4">
                {recipe.relatedSlugs.map((s) => {
                  const related = allFreeRecipes.find((r) => r.slug === s);
                  if (!related) return null;
                  return (
                    <li key={s}>
                      <Link
                        href={`/recipes/${s}`}
                        className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
                      >
                        {related.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Container>
      </article>

      <EmailCaptureCTA
        heading="Get the Flavor Pairing Matrix free."
        body="The Italian × Japanese ingredient chart behind every recipe in the book. Printable, one page."
        cta="Get the free chart →"
      />
    </>
  );
}

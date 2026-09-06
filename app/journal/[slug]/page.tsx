import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allStories, allPantryEntries, allFreeRecipes } from "contentlayer/generated";
import { relatedRecipesFor } from "@/lib/relatedRecipes";
import { Container } from "@/components/layout/Container";
import { ProseLayout } from "@/components/editorial/ProseLayout";
import { MDXContent } from "@/components/MDXContent";
import { NextPrevious } from "@/components/navigation/NextPrevious";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { EditorialImage } from "@/components/media/EditorialImage";

export async function generateStaticParams() {
  return allStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = allStories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.dek,
    alternates: { canonical: `/journal/${story.slug}` },
    openGraph: {
      title: story.title,
      description: story.dek,
      type: "article",
      publishedTime: story.date,
      images: story.heroImageSrc ? [{ url: story.heroImageSrc }] : [],
    },
  };
}

import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sorted = [...allStories].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  const idx = sorted.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();

  const story = sorted[idx];
  // Only link pantry terms that actually have a /culture/ page (97 journal→culture 404s found 2026-09-05).
  const pantrySlugSet = new Set(allPantryEntries.map((e) => e.slug));
  const pantryRefs = (story.pantryRefs ?? []).filter((ref) => pantrySlugSet.has(ref));
  const prev = sorted[idx + 1] ?? null;
  const next = sorted[idx - 1] ?? null;
  // Three free recipes related to this story (internal-link crawl 2026-09-06:
  // recipe pages had 1–2 inbound links each; journal entries are the hub).
  const relatedRecipes = relatedRecipesFor(story, allFreeRecipes, 3);

  const isKoreanThemed = story.themes?.includes("korean-cooking") ?? false;
  const bookCta = isKoreanThemed
    ? { href: SMMC_AMAZON, label: "Get Seoul Meets Mexico City on Amazon" }
    : { href: TMT_AMAZON, label: "Get Tokyo Meets Tuscany on Amazon" };

  const formattedDate = new Date(story.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.dek,
    author: { "@type": "Person", name: "Sebastian Dri", url: "https://borderlesskitchenseries.com/about" },
    publisher: {
      "@type": "Organization",
      name: "Borderless Kitchen",
      url: "https://borderlesskitchenseries.com",
    },
    datePublished: story.date,
    dateModified: story.date,
    mainEntityOfPage: `https://borderlesskitchenseries.com/journal/${story.slug}`,
    ...(story.heroImageSrc
      ? { image: `https://borderlesskitchenseries.com${story.heroImageSrc}` }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "60vh" }}>
        <div className="absolute inset-0">
          {story.heroImageSrc ? (
            <Image
              src={story.heroImageSrc}
              alt={story.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-60"
            />
          ) : (
            <EditorialImage
              alt={story.heroImageAlt}
              aspect="hero-wide"
              slot={`story-hero-${story.slug}`}
              className="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-charcoal-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/30 to-charcoal-deep/40" />
        </div>
        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "60vh" }}>
          <Container className="pb-12 md:pb-20 pt-32">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/journal"
                className="font-ui text-eyebrow uppercase text-paper/50 hover:text-paper/80 transition-colors duration-300"
              >
                ← Journal
              </Link>
            </nav>
            <p className="font-ui text-eyebrow uppercase text-paper/50 mb-4">
              {formattedDate} · {story.readingTime} min read
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl">
              {story.title}
            </h1>
            <p className="font-display italic text-xl text-paper/70 mt-4 max-w-2xl">
              {story.dek}
            </p>
          </Container>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 md:py-24">
        <Container>
          <ProseLayout>
            <MDXContent
              code={story.body.code}
              storySlugs={allStories.map((s) => s.slug)}
              pantrySlugs={allPantryEntries.map((e) => e.slug)}
            />
          </ProseLayout>

          {/* Pantry cross-links */}
          {pantryRefs.length > 0 ? (
            <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                From the pantry
              </p>
              <ul className="flex flex-wrap gap-3">
                {pantryRefs.map((ref) => (
                  <li key={ref}>
                    <Link
                      href={`/culture/${ref}`}
                      className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
                    >
                      {ref.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Related free recipes */}
          {relatedRecipes.length > 0 ? (
            <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                Free recipes from this world
              </p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {relatedRecipes.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/recipes/${r.slug}`}
                      className="block h-full border border-hairline px-4 py-3 hover:border-vermillion transition-colors duration-300"
                    >
                      <span className="font-ui text-eyebrow uppercase text-ink/40 block mb-1">
                        {r.cuisine}
                      </span>
                      <span className="font-display text-lg text-ink leading-snug">
                        {r.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Book CTA */}
          <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
            <p className="font-display italic text-display-3 text-ink/60 mb-6 leading-tight">
              The full recipes live in the book.
            </p>
            <AmazonCTA href={bookCta.href} label={bookCta.label} />
            <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
              Paperback $19.99 · Kindle $9.99
            </p>
          </div>

          <NextPrevious
            prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
            next={next ? { slug: next.slug, title: next.title } : undefined}
            basePath="/journal"
          />
        </Container>
      </article>

      <EmailCaptureCTA />
    </>
  );
}

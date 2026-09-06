import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allBooks, allRecipeTeasers } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Masthead } from "@/components/editorial/Masthead";
import { RecipeTeaserCard } from "@/components/cards/RecipeTeaserCard";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { MDXContent } from "@/components/MDXContent";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";

export async function generateStaticParams() {
  return allBooks.map((book) => ({ slug: book.slug }));
}

/**
 * Volumes with a dedicated sales/landing page: the catalog page canonicalizes
 * to it so the two routes stop competing in search (audit F4).
 */
const CANONICAL_OVERRIDES: Record<string, string> = {
  "tokyo-meets-tuscany": "/tokyo-meets-tuscany",
  "seoul-meets-mexico-city": "/seoul-meets-mexico-city",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = allBooks.find((b) => b.slug === slug);
  if (!book) return {};
  const canonical = CANONICAL_OVERRIDES[book.slug] ?? `/books/${book.slug}`;
  return {
    title: book.title,
    description: `${book.regionA} meets ${book.regionB}. ${book.subtitle ?? "A volume in the Borderless Kitchen series."}`,
    alternates: { canonical },
    // Unreleased volumes are placeholders: keep them crawlable but out of the
    // index until launch (2026-09-06).
    ...(book.status === "available" ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: book.title,
      description: `${book.regionA} meets ${book.regionB}.`,
      type: "website",
      url: canonical,
      images: book.coverImageSrc ? [{ url: book.coverImageSrc }] : [],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = allBooks.find((b) => b.slug === slug);
  if (!book) notFound();

  // Verified against the KDP interior + live Amazon listing (2026-07-26):
  // 30 recipes, 6 master sauces, 90 pages, paperback $19.99 / Kindle $9.99.
  const isTmt = book.slug === "tokyo-meets-tuscany";
  const isSmmc = book.slug === "seoul-meets-mexico-city";

  // SMMC paperback went live 2026-08-11 (ASIN B0HDRBMLPT) — both formats
  // available now, same pricing as TMT.
  const amazonUrl =
    book.status === "available" ? (isSmmc ? SMMC_AMAZON : TMT_AMAZON) : null;
  const priceLine = "Paperback $19.99 · Kindle $9.99";
  const schemaPrice = "19.99";

  const allTeasers = allRecipeTeasers.filter((r) => r.bookSlug === book.slug);
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Sebastian Dri",
      url: "https://borderlesskitchenseries.com/about",
    },
    publisher: { "@type": "Organization", name: "Borderless Kitchen" },
    description: `${book.regionA} meets ${book.regionB}. ${book.subtitle ?? "A volume in the Borderless Kitchen series."}`,
    genre: ["Cookbook", "Fusion Cuisine", "Cross-cultural cooking"],
    inLanguage: "en",
    isPartOf: {
      "@type": "BookSeries",
      name: "Borderless Kitchen",
      url: "https://borderlesskitchenseries.com/books",
    },
    ...(isTmt
      ? {
          isbn: "9798257577871",
          bookFormat: "https://schema.org/Paperback",
          numberOfPages: 90,
          datePublished: "2026-04-20",
          sameAs: "https://www.amazon.com/dp/B0GY8H2TCQ",
        }
      : {}),
    ...(book.year && !isTmt ? { datePublished: String(book.year) } : {}),
    ...(amazonUrl
      ? {
          url: `https://borderlesskitchenseries.com${CANONICAL_OVERRIDES[book.slug] ?? `/books/${book.slug}`}`,
          offers: {
            "@type": "Offer",
            url: amazonUrl,
            priceCurrency: "USD",
            price: schemaPrice,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Amazon" },
          },
        }
      : {}),
    ...(book.coverImageSrc
      ? { image: `https://borderlesskitchenseries.com${book.coverImageSrc}` }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      {/* Hero image */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "55vh" }}>
        <div className="absolute inset-0">
          {book.heroImageSrc ? (
            <Image
              src={book.heroImageSrc}
              alt={book.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-60"
            />
          ) : (
            <EditorialImage
              alt={book.heroImageAlt}
              aspect="hero-wide"
              slot={`book-hero-${book.slug}`}
              className="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full" style={{ minHeight: "55vh" }}>
          <Container className="pb-12 md:pb-20 pt-32">
            <p className="font-ui text-eyebrow uppercase text-paper/60 mb-3">
              Borderless Kitchen · {book.regionA} × {book.regionB}
            </p>
            {book.status === "available" ? (
              <span className="inline-block font-ui text-eyebrow uppercase text-vermillion border border-vermillion/40 px-3 py-1 mb-4">
                Available now
              </span>
            ) : (
              <span className="inline-block font-ui text-eyebrow uppercase text-paper/40 border border-paper/20 px-3 py-1 mb-4">
                Coming soon
              </span>
            )}
          </Container>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <Masthead
            title={book.title}
            subtitle={book.subtitle}
            meta={
              book.year
                ? `${book.year} · ${book.regionA} × ${book.regionB}`
                : `${book.regionA} × ${book.regionB}`
            }
          />

          {/* Concept */}
          <div className="max-w-prose mb-16 md:mb-24">
            <div className="font-body text-lg text-ink/90 leading-relaxed [&_p]:mb-6 [&_em]:italic">
              <MDXContent code={book.body.code} />
            </div>
            {amazonUrl ? (
              <div className="mt-10">
                <AmazonCTA href={amazonUrl} label={`Buy ${book.title} on Amazon`} />
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                  {priceLine}
                </p>
              </div>
            ) : (
              <div className="mt-10">
                <a
                  href="https://free.borderlesskitchenseries.com"
                  className="font-ui text-eyebrow uppercase text-ink border-b border-ink/40 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                >
                  Get notified when it drops →
                </a>
              </div>
            )}
          </div>

          {/* Chapters + recipe teasers */}
          {book.chapters && book.chapters.length > 0 ? (
            <div className="space-y-20 md:space-y-28">
              <div className="border-t border-hairline pt-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-8">
                  Inside the book
                </p>
                <h2 className="font-display text-display-2 text-ink leading-tight mb-14 max-w-2xl">
                  Thirty recipes. Two kitchens. One flame.
                </h2>
              </div>

              {book.chapters.map((chapter) => {
                const chapterTeasers = chapter.recipeTeaserSlugs
                  .map((s) => allTeasers.find((t) => t.slug === s))
                  .filter(Boolean) as typeof allTeasers;

                return (
                  <div key={chapter.slug}>
                    <FadeRise>
                      {/* Chapter header */}
                      <div className="mb-10">
                        <p className="font-ui text-eyebrow uppercase text-ink/50 mb-2">
                          Chapter
                        </p>
                        <h3 className="font-display text-display-2 text-ink leading-tight">
                          {chapter.title}
                        </h3>
                        <p className="font-body text-base text-ink/70 mt-4 max-w-prose">
                          {chapter.intro}
                        </p>
                      </div>

                      {/* Recipe teasers */}
                      <div className="space-y-12 md:space-y-16">
                        {chapterTeasers.map((teaser) => (
                          <RecipeTeaserCard
                            key={teaser.slug}
                            id={`recipe-${teaser.slug}`}
                            slug={teaser.slug}
                            title={teaser.title}
                            chapter={chapter.title}
                            category={teaser.category}
                            heat={teaser.heat}
                            pairings={teaser.pairings ?? []}
                            heroImageAlt={teaser.heroImageAlt}
                            heroImageSrc={teaser.heroImageSrc ?? null}
                            headnoteCode={teaser.body.code}
                          />
                        ))}
                      </div>
                    </FadeRise>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Closing CTA */}
          {amazonUrl ? (
            <div className="mt-20 md:mt-28 pt-16 border-t border-hairline text-center">
              <p className="font-display italic text-display-3 text-ink/60 mb-8 max-w-xl mx-auto">
                The full recipes live inside the book.
              </p>
              <AmazonCTA href={amazonUrl} label={`Buy ${book.title} on Amazon`} />
              <p className="font-ui text-eyebrow uppercase text-ink/40 mt-4">
                {priceLine}
              </p>
            </div>
          ) : null}
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Both volumes are out now."
        body="Tokyo Meets Tuscany and Seoul Meets Mexico City — Japanese technique against Italian tradition, Korean fermentation against Mexican fire. Start with three recipes, free."
        cta="Get the free recipes →"
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

import { TMT_AMAZON, SMMC_AMAZON_KINDLE, SMMC_AMAZON_KINDLE_PRICE, SMMC_AMAZON_PAPERBACK, SMMC_AMAZON_PAPERBACK_PRICE } from "@/lib/amazon";
import { GUMROAD_SMMC_URL, GUMROAD_SMMC_PRICE } from "@/lib/gumroad";
import { SmmcPurchaseOptions } from "@/components/cta/SmmcPurchaseOptions";
import { breadcrumbJson } from "@/lib/breadcrumbSchema";

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

  // Superseded 2026-11-10. This file used to say SMMC was sold through
  // Gumroad only, because "the paperback listing was retired with the KDP
  // suspension". That was no longer true: both editions were re-verified live
  // that day (see lib/amazon.ts) — paperback B0HDRBMLPT In Stock at $19.99,
  // Kindle B0H6VD21M2 at $9.99 — so hiding them made the site harder to buy
  // from than the retailer itself. SMMC now renders all three formats through
  // SmmcPurchaseOptions; TMT keeps its single AmazonCTA.
  //
  // The disclosure concern that motivated the old rule still holds, and is
  // why the Amazon links go through AmazonCTA (which carries the Associates
  // disclosure) and the Gumroad link does not carry an affiliate tag.
  const isPurchasable = book.status === "available";
  const purchaseUrl = isPurchasable
    ? isSmmc
      ? SMMC_AMAZON_PAPERBACK
      : TMT_AMAZON
    : null;
  const priceLine = isSmmc
    ? `Paperback ${SMMC_AMAZON_PAPERBACK_PRICE} · Kindle ${SMMC_AMAZON_KINDLE_PRICE} · Illustrated PDF ${GUMROAD_SMMC_PRICE}`
    : "Paperback $19.99 · Kindle $9.99";
  const schemaPrice = isSmmc
    ? SMMC_AMAZON_PAPERBACK_PRICE.replace("$", "")
    : "19.99";

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
    // SMMC is sold in three places, so the schema says three places. Offering
    // only the Gumroad PDF while the page links to three checkouts is the kind
    // of mismatch that makes a search result misleading.
    ...(isSmmc
      ? { sameAs: [SMMC_AMAZON_PAPERBACK, SMMC_AMAZON_KINDLE] }
      : {}),
    ...(purchaseUrl
      ? {
          url: `https://borderlesskitchenseries.com${CANONICAL_OVERRIDES[book.slug] ?? `/books/${book.slug}`}`,
          offers: isSmmc
            ? [
                {
                  "@type": "Offer",
                  url: SMMC_AMAZON_PAPERBACK,
                  priceCurrency: "USD",
                  price: SMMC_AMAZON_PAPERBACK_PRICE.replace("$", ""),
                  availability: "https://schema.org/InStock",
                  seller: { "@type": "Organization", name: "Amazon" },
                },
                {
                  "@type": "Offer",
                  url: SMMC_AMAZON_KINDLE,
                  priceCurrency: "USD",
                  price: SMMC_AMAZON_KINDLE_PRICE.replace("$", ""),
                  availability: "https://schema.org/InStock",
                  seller: { "@type": "Organization", name: "Amazon" },
                },
                {
                  "@type": "Offer",
                  url: GUMROAD_SMMC_URL,
                  priceCurrency: "USD",
                  price: GUMROAD_SMMC_PRICE.replace("$", ""),
                  availability: "https://schema.org/InStock",
                  seller: { "@type": "Organization", name: "Borderless Kitchen" },
                },
              ]
            : {
                "@type": "Offer",
                url: purchaseUrl,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJson([
            { name: "Books", path: "/books" },
            { name: book.title, path: CANONICAL_OVERRIDES[book.slug] ?? `/books/${book.slug}` },
          ]),
        }}
      />
      {/* Hero image */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "55vh" }}>
        <div className="absolute inset-0">
          {book.heroImageSrc && book.heroImageSrc === book.coverImageSrc ? (
            /* When the hero art is the retail cover, show it whole. Cropping a
               portrait cover into a wide band cuts the title typography, so a
               softened copy fills the band and the cover sits contained. */
            <>
              <Image
                src={book.heroImageSrc}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="object-cover object-center scale-110 blur-2xl opacity-30"
              />
              <Image
                src={book.heroImageSrc}
                alt={book.heroImageAlt}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-contain object-center md:object-right opacity-80"
              />
            </>
          ) : book.heroImageSrc ? (
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
            {purchaseUrl ? (
              <div className="mt-10">
                {isSmmc ? (
                  <SmmcPurchaseOptions />
                ) : (
                  <>
                    <AmazonCTA
                      href={purchaseUrl}
                      label={`Buy ${book.title} on Amazon`}
                    />
                    <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                      {priceLine}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-10">
                {/* Corrected 2026-11-08. Pointed off-site at
                    free.borderlesskitchenseries.com, whose email delivery we
                    cannot verify — so it could promise a notification nobody
                    would receive. /connect is ours and its form now says so
                    honestly when signups are unavailable. */}
                <Link
                  href="/connect"
                  className="font-ui text-eyebrow uppercase text-ink border-b border-ink/40 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                >
                  Be first to hear when it drops →
                </Link>
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
          {purchaseUrl ? (
            <div className="mt-20 md:mt-28 pt-16 border-t border-hairline text-center">
              <p className="font-display italic text-display-3 text-ink/60 mb-8 max-w-xl mx-auto">
                The full recipes live inside the book.
              </p>
              {isSmmc ? (
                <div className="text-left inline-block">
                  <SmmcPurchaseOptions showHeading={false} />
                </div>
              ) : (
                <>
                  <AmazonCTA
                    href={purchaseUrl}
                    label={`Buy ${book.title} on Amazon`}
                  />
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mt-4">
                    {priceLine}
                  </p>
                </>
              )}
            </div>
          ) : null}
        </Container>
      </section>

      {/* Fixed 2026-11-07. `href` was never passed, so "Get the free recipes"
          opened /flavor-guide — a PDF matrix page with no recipes on it. Now
          links to /free, which is the free recipe collection. */}
      <EmailCaptureCTA
        heading="Both volumes are out now."
        body="Tokyo Meets Tuscany and Seoul Meets Mexico City — Japanese technique against Italian tradition, Korean fermentation against Mexican fire. Start with the free recipe collection."
        cta="Get the free recipes →"
        href="/free"
      />
    </>
  );
}

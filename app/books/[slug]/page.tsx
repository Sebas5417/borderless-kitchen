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

const TMT_AMAZON = process.env.NEXT_PUBLIC_AMAZON_URL_TMT ?? "https://www.amazon.com/dp/B0GY8H2TCQ";

export async function generateStaticParams() {
  return allBooks.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = allBooks.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: book.title,
    description: `${book.regionA} meets ${book.regionB}. ${book.subtitle ?? "A volume in the Borderless Kitchen series."}`,
    openGraph: {
      title: book.title,
      description: `${book.regionA} meets ${book.regionB}.`,
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

  const amazonUrl = book.status === "available" ? TMT_AMAZON : null;

  const allTeasers = allRecipeTeasers.filter((r) => r.bookSlug === book.slug);

  return (
    <>
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
                <AmazonCTA href={amazonUrl} label="Buy Tokyo Meets Tuscany on Amazon" />
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                  Paperback $24.99 · Hardcover $34.99 · eBook $9.99
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
              <AmazonCTA href={amazonUrl} label="Buy Tokyo Meets Tuscany on Amazon" />
              <p className="font-ui text-eyebrow uppercase text-ink/40 mt-4">
                Paperback $24.99 · Hardcover $34.99 · eBook $9.99
              </p>
            </div>
          ) : null}
        </Container>
      </section>

      <EmailCaptureCTA
        heading="The second volume is coming."
        body="Seoul Meets Mexico City — fermented depth meets layered heat. Be the first to know."
        cta="Notify me →"
      />
    </>
  );
}

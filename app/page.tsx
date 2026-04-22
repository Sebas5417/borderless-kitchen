import Link from "next/link";
import { allBooks, allStories } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/editorial/Hero";
import { PhilosophyStrip } from "@/components/editorial/PhilosophyStrip";
import { EditorialImage } from "@/components/media/EditorialImage";
import { BookCard } from "@/components/cards/BookCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeRise } from "@/components/motion/FadeRise";

export default function HomePage() {
  const tmt = allBooks.find((b) => b.slug === "tokyo-meets-tuscany");
  const upcoming = allBooks
    .filter((b) => b.status === "coming")
    .sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100));
  const stories = [...allStories]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  const tmtAmazonUrl = process.env.NEXT_PUBLIC_AMAZON_URL_TMT ?? "#";

  return (
    <>
      {/* 1. Hero */}
      <Hero
        eyebrow="Vol. I — Tokyo Meets Tuscany"
        headline="The borders are optional."
        link={{
          label: "Read the first volume → Tokyo Meets Tuscany",
          href: "/books/tokyo-meets-tuscany",
        }}
      />

      {/* 2. Philosophy strip */}
      <PhilosophyStrip />

      {/* 3. Featured book — TMT */}
      {tmt ? (
        <section className="py-24 md:py-32 bg-paper border-t border-hairline">
          <Container>
            <FadeRise>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                <div className="lg:col-span-5">
                  <EditorialImage
                    alt={tmt.coverImageAlt}
                    aspect="hero-portrait"
                    slot="featured-book-cover"
                  />
                </div>
                <div className="lg:col-span-7 lg:pt-8">
                  <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                    The first volume
                  </p>
                  <h2 className="font-display text-display-2 text-ink leading-tight">
                    Italian soul. Japanese precision.
                  </h2>
                  <p className="font-body text-lg text-ink/80 mt-8 max-w-prose leading-relaxed">
                    {tmt.title} is a study of two kitchens that already share
                    more than they admit — both built on restraint, both reverent
                    of one good ingredient, both suspicious of decoration. Thirty
                    recipes, half born in Tuscan farmhouses, half in Tokyo
                    apartments, all of them learned to belong to one another at
                    the same counter.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-8">
                    <AmazonCTA href={tmtAmazonUrl} />
                    <Link
                      href={`/books/${tmt.slug}`}
                      className="link-quiet text-ink text-base"
                    >
                      Inside the book
                    </Link>
                  </div>
                </div>
              </div>
            </FadeRise>
          </Container>
        </section>
      ) : null}

      {/* 4. Series preview */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
                The series
              </p>
              <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                Four kitchens. One conversation.
              </h2>
            </div>
            <Link href="/books" className="link-quiet text-ink text-base">
              All volumes
            </Link>
          </div>

          <FadeRise>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {upcoming.map((book) => (
                <li key={book.slug}>
                  <BookCard
                    slug={book.slug}
                    title={book.title}
                    regionA={book.regionA}
                    regionB={book.regionB}
                    status={book.status}
                    coverImageAlt={book.coverImageAlt}
                  />
                </li>
              ))}
            </ul>
          </FadeRise>
        </Container>
      </section>

      {/* 5. Stories */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
                Journal
              </p>
              <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                Essays on food, memory, and the borders we draw and undraw.
              </h2>
            </div>
          </div>

          <FadeRise>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {stories.map((story) => (
                <li key={story.slug}>
                  <StoryCard
                    slug={story.slug}
                    title={story.title}
                    dek={story.dek}
                    date={story.date}
                    heroImageAlt={story.heroImageAlt}
                    inactive
                  />
                </li>
              ))}
            </ul>
          </FadeRise>
        </Container>
      </section>

      {/* 6. Newsletter */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                Letters from the kitchen
              </p>
              <h2 className="font-display text-display-3 text-ink leading-tight">
                Quiet dispatches. New volumes. The occasional recipe note that
                didn't make the book.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <NewsletterForm
                label="Subscribe"
                placeholder="you@somewhere.com"
                buttonLabel="Send"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

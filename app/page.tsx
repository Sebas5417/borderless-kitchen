import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { allBooks, allStories, allFieldNotes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { HeroCarousel } from "@/components/editorial/HeroCarousel";
import { PhilosophyStrip } from "@/components/editorial/PhilosophyStrip";
import { EditorialImage } from "@/components/media/EditorialImage";
import { BookCard } from "@/components/cards/BookCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";
import { tmtAmazonUrl } from "@/lib/amazon";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute: "Borderless Kitchen — Italian soul. Japanese precision.",
  },
  description:
    "Borderless Kitchen — Italian soul meets Japanese precision. Shop Tokyo Meets Tuscany and explore bold, cross-cultural cookbooks and recipes by Sebastian.",
};

import { TMT_AMAZON } from "@/lib/amazon";

export default function HomePage() {
  const tmt = allBooks.find((b) => b.slug === "tokyo-meets-tuscany");
  const upcoming = allBooks
    .filter((b) => b.status === "coming")
    .sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100))
    .slice(0, 3);
  const now = new Date();
  const stories = [...allStories]
    .filter((s) => new Date(s.date) <= now)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);
  const notes = [...allFieldNotes]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <>
      {/* 1. Hero carousel — rotates through all five editorial banners */}
      <HeroCarousel
        eyebrow="Vol. II — Seoul Meets Mexico City — Coming Soon"
        headline="The borders are optional."
        link={{
          label: "Get notified when Vol. II drops →",
          href: "https://free.borderlesskitchenseries.com",
        }}
        images={[
          { src: "/images/banner-carousel-1.png", alt: "Golden sunset over Mexico City with food — Borderless Kitchen." },
          { src: "/images/banner-carousel-2.png", alt: "Warm spices and ingredients — Borderless Kitchen." },
          { src: "/images/banner-carousel-3.png", alt: "Dark Korean spices and ingredients — Borderless Kitchen." },
          { src: "/images/banner-carousel-4.png", alt: "Editorial spice spread — Borderless Kitchen." },
          { src: "/images/banner-carousel-5.png", alt: "Cinematic dark plate with book and camera — Borderless Kitchen." },
        ]}
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
                  {tmt.coverImageSrc ? (
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "3 / 4" }}
                    >
                      <Image
                        src={tmt.coverImageSrc}
                        alt={tmt.coverImageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <EditorialImage
                      alt={tmt.coverImageAlt}
                      aspect="hero-portrait"
                      slot="featured-book-cover"
                    />
                  )}
                </div>
                <div className="lg:col-span-7 lg:pt-8">
                  <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                    The first volume — available now
                  </p>
                  <h2 className="font-display text-display-2 text-ink leading-tight">
                    Italian soul. Japanese precision.
                  </h2>
                  <p className="font-body text-lg text-ink/80 mt-8 max-w-prose leading-relaxed">
                    Two kitchens that already share more than they admit — both
                    built on restraint, both reverent of one good ingredient,
                    both suspicious of decoration. Thirty recipes, half born in
                    Tuscan farmhouses, half in Tokyo apartments, all learned to
                    belong to one another at the same counter.
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mt-4">
                    Paperback $19.99 · Kindle $9.99
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-8">
                    <AmazonCTA href={TMT_AMAZON} />
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

      {/* 3b. Vol II tease — Seoul Meets Mexico City */}
      <section className="py-16 md:py-20 border-t border-hairline bg-charcoal-deep text-paper">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                Vol. II — Coming soon
              </p>
              <p className="font-display text-display-3 text-paper leading-tight">
                Seoul Meets Mexico City
              </p>
              <p className="font-body text-base text-paper/60 mt-2">
                Fermented depth meets layered heat.
              </p>
            </div>
            <Link
              href="/preorder"
              className="font-ui text-eyebrow uppercase text-paper/80 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 shrink-0"
            >
              Early access + 6 free preview recipes →
            </Link>
          </div>
        </Container>
      </section>

      {/* 3c. Free recipes CTA strip */}
      <section className="py-16 md:py-20 border-t border-hairline bg-paper">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                Free — no account needed
              </p>
              <p className="font-display text-display-3 text-ink leading-tight">
                19 cross-cultural recipes + the Flavor Pairing Matrix.
              </p>
              <p className="font-body text-base text-ink/60 mt-2">
                The full logic behind every Japanese-Italian swap, condensed.
              </p>
            </div>
            <Link
              href="/free"
              className="font-ui text-eyebrow uppercase text-ink border-b border-ink/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 shrink-0"
            >
              Get the free collection →
            </Link>
          </div>
        </Container>
      </section>

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
                    coverSrc={book.coverImageSrc ?? null}
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
                Notes on food, culture, memory, and movement.
              </h2>
            </div>
            <Link href="/journal" className="link-quiet text-ink text-base">
              All essays
            </Link>
          </div>

          <FadeRise>
            <div className="mb-10 pb-10 border-b border-hairline">
              <Link
                href="/journal/japanese-cooking-for-beginners-guide-to-getting-started"
                className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
              >
                <p className="font-ui text-eyebrow uppercase text-vermillion shrink-0">
                  Start here
                </p>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300 mb-2">
                    New to Japanese-Italian cooking? Start here →
                  </h3>
                  <p className="font-body text-sm text-ink/60 leading-relaxed max-w-prose">
                    What to read first, what to cook first, and what order to build the pantry — whether you're coming from Italian cooking or Japanese cooking.
                  </p>
                </div>
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {stories.map((story) => (
                <li key={story.slug}>
                  <StoryCard
                    slug={story.slug}
                    title={story.title}
                    dek={story.dek}
                    date={story.date}
                    heroImageAlt={story.heroImageAlt}
                    heroSrc={story.heroImageSrc ?? null}
                  />
                </li>
              ))}
            </ul>
          </FadeRise>
        </Container>
      </section>

      {/* 5b. Field Notes — quiet surface */}
      {notes.length > 0 ? (
        <section className="py-20 md:py-24 border-t border-hairline bg-ink/[0.02]">
          <Container>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
              <div>
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                  Field Notes
                </p>
                <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                  Shorter than essays. Closer to the counter.
                </h2>
              </div>
              <Link href="/notes" className="link-quiet text-ink text-base">
                All field notes
              </Link>
            </div>

            <FadeRise>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {notes.map((note) => {
                  const d = new Date(note.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <li key={note.slug}>
                      <Link href={`/notes/${note.slug}`} className="group block">
                        <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                          {d}
                          {note.place ? ` · ${note.place}` : ""}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300">
                          {note.title}
                        </h3>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FadeRise>
          </Container>
        </section>
      ) : null}

      {/* 6. Email capture */}
      <EmailCaptureCTA />

      {/* 7. Newsletter */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                Notes from the kitchen
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

import type { Metadata } from "next";
import Link from "next/link";
import { allStories } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { StoryCard } from "@/components/cards/StoryCard";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { PageHero } from "@/components/editorial/PageHero";
import { GUMROAD_SMMC_PRICE, GUMROAD_SMMC_URL } from "@/lib/gumroad";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "Journal",
  description:
    "Notes on food, culture, memory, and movement — essays from the Borderless Kitchen series on cross-cultural cooking and the conversations between cuisines.",
};

export default function JournalPage() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const stories = [...allStories]
    .filter((s) => new Date(s.date) <= today)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHero
        eyebrow="Journal"
        headline="Notes on food, culture, memory, and movement."
        dek="Not recipes. The stories behind them — why certain flavors exist, where they came from, and what they mean when they meet on the same plate."
        src="/images/banner-journal.png"
        alt="Editorial banner — the Borderless Kitchen Journal."
      />

      <section className="py-16 md:py-24">
        <Container>
          <FadeRise>
            <div className="mb-12 pb-12 border-b border-hairline">
              <Link
                href="/journal/japanese-cooking-for-beginners-guide-to-getting-started"
                className="group inline-flex flex-col gap-2"
              >
                <p className="font-ui text-eyebrow uppercase text-vermillion">
                  Start here
                </p>
                <h2 className="font-display text-display-3 text-ink leading-tight group-hover:text-vermillion transition-colors duration-300">
                  New to Japanese-Italian cooking? Read this first →
                </h2>
                <p className="font-body text-base text-ink/60 leading-relaxed max-w-2xl">
                  What to read, what to cook first, and what order to build the pantry — whether you're coming from Italian cooking or Japanese cooking.
                </p>
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14">
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

      <section className="py-14 md:py-20 border-t border-hairline">
        <Container>
          <div className="max-w-prose">
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
              Shorter pieces
            </p>
            <p className="font-body text-lg text-ink/70 leading-relaxed">
              Fragments — a paragraph from a market, a note from a kitchen,
              an ingredient caught in motion — collect in the{" "}
              <Link
                href="/notes"
                className="text-ink underline decoration-hairline underline-offset-4 hover:text-vermillion hover:decoration-vermillion transition-colors duration-300"
              >
                field notes
              </Link>
              .
            </p>
            <p className="font-ui text-eyebrow uppercase text-ink/40 mt-8 mb-3">
              Vol. II — Available now
            </p>
            <p className="font-body text-lg text-ink/70 leading-relaxed">
              The series has a second volume. <em>Seoul Meets Mexico City</em>{" "}
              — Korean × Mexican — is out now as an illustrated PDF,{" "}
              {GUMROAD_SMMC_PRICE}, instant download.{" "}
              <a
                href={GUMROAD_SMMC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-hairline underline-offset-4 hover:text-vermillion hover:decoration-vermillion transition-colors duration-300"
              >
                Get Volume II →
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* Re-pointed 2026-11-07. The banner is a link, not a form: it collects no
          address, so "new essays, volumes, and the occasional thing that didn't
          make the book" was a newsletter promise with no mechanism behind it.
          It now describes the free download it actually opens. */}
      <EmailCaptureCTA
        heading="Notes from the kitchen."
        body="The journal is free to read — and the Flavor Pairing Matrix is free to download. Sixteen Japanese–Italian substitutions on one printable page."
        cta="Get the free matrix →"
      />
    </>
  );
}

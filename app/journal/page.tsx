import type { Metadata } from "next";
import { allStories } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { StoryCard } from "@/components/cards/StoryCard";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays on food, memory, migration, and the borders we draw and undraw. From the kitchen of Borderless Kitchen.",
};

export default function JournalPage() {
  const stories = [...allStories].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  return (
    <>
      <section className="py-20 md:py-28 border-b border-hairline">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
            Journal
          </p>
          <h1 className="font-display text-display-1 text-ink leading-tight max-w-3xl">
            Essays on food, memory, and the borders we draw and undraw.
          </h1>
          <p className="font-body text-lg text-ink/60 mt-6 max-w-prose leading-relaxed">
            Not recipes. The stories behind them — why certain flavors exist,
            where they came from, and what they mean when they arrive on the
            same plate.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <FadeRise>
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

      <EmailCaptureCTA
        heading="Letters from the kitchen."
        body="New essays, volumes, and the occasional thing that didn't make the book."
        cta="free.borderlesskitchenseries.com →"
      />
    </>
  );
}

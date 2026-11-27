import type { Metadata } from "next";
import Link from "next/link";
import { allStories } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/editorial/PageHero";
import { GUIDE_SECTIONS } from "@/lib/guides";

export const metadata: Metadata = {
  alternates: { canonical: "/guides" },
  title: "Buying Guides",
  description:
    "Every Borderless Kitchen buying guide in one place: Japanese, Korean, Mexican and Italian pantry staples, tools, cookbooks and gifts. What to buy, what to skip, and how to read the label.",
};

export default function GuidesPage() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const bySlug = new Map(
    allStories.filter((s) => new Date(s.date) <= today).map((s) => [s.slug, s]),
  );
  const sections = GUIDE_SECTIONS.map((section) => ({
    ...section,
    stories: section.slugs
      .map((slug) => bySlug.get(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s)),
  })).filter((section) => section.stories.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Buying guides"
        headline="What to buy, what to skip."
        dek="Pantry staples, tools and cookbooks for Japanese, Korean, Mexican and Italian cooking — and the label words that tell you which bottle is the real thing."
        src="/images/banner-journal.png"
        alt="Editorial banner — Borderless Kitchen buying guides."
      />

      <section className="py-16 md:py-24">
        <Container>
          <nav aria-label="Guide sections" className="mb-14 flex flex-wrap gap-x-6 gap-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="font-ui text-eyebrow uppercase text-ink/60 hover:text-vermillion transition-colors duration-300"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-display text-display-3 text-ink leading-tight">
                  {section.title}
                </h2>
                <p className="font-body text-base text-ink/60 mt-2 mb-8">{section.dek}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {section.stories.map((story) => (
                    <li key={story.slug}>
                      <Link href={`/journal/${story.slug}`} className="group block">
                        <span className="font-display text-lg text-ink leading-snug group-hover:text-vermillion transition-colors duration-300">
                          {story.title}
                        </span>
                        <span className="block font-body text-sm text-ink/60 leading-relaxed mt-1 line-clamp-2">
                          {story.dek}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-ink/50 mt-16 max-w-prose">
            As an Amazon Associate we earn from qualifying purchases. Links in
            these guides may earn us a small commission at no extra cost to you.
          </p>
        </Container>
      </section>
    </>
  );
}

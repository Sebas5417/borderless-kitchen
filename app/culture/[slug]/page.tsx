import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPantryEntries } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { RedRule } from "@/components/editorial/RedRule";
import { ProseLayout } from "@/components/editorial/ProseLayout";
import { MDXContent } from "@/components/MDXContent";
import { EditorialImage } from "@/components/media/EditorialImage";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { breadcrumbJson } from "@/lib/breadcrumbSchema";
import { fitDescription } from "@/lib/seoMeta";

export async function generateStaticParams() {
  return allPantryEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = allPantryEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: entry.term,
    alternates: { canonical: `/culture/${entry.slug}` },
    description: fitDescription(
      `${entry.term}: ${/^[aeiou]/i.test(entry.classification) ? "an" : "a"} ${entry.classification.toLowerCase()} from ${entry.origin.join(" and ")}. What it is, how it tastes and how the Borderless Kitchen recipes use it — from the culture library.`,
    ),
  };
}

import { TMT_AMAZON } from "@/lib/amazon";

export default async function CultureEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = allPantryEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const sorted = [...allPantryEntries].sort((a, b) =>
    a.term.localeCompare(b.term),
  );
  const idx = sorted.findIndex((e) => e.slug === slug);
  const prev = sorted[idx - 1] ?? null;
  const next = sorted[idx + 1] ?? null;

  // DefinedTerm schema (2026-09-06): the 38 culture entries are glossary
  // definitions (term + classification + origin) and previously carried only a
  // BreadcrumbList, so search engines had nothing describing what the page is.
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.term,
    description: fitDescription(
      entry.body.raw.replace(/[*_`#>]/g, "").replace(/\s+/g, " ").trim(),
    ),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Borderless Kitchen Culture Library",
      url: "https://borderlesskitchenseries.com/culture",
    },
    url: `https://borderlesskitchenseries.com/culture/${entry.slug}`,
    termCode: entry.slug,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJson([
            { name: "Culture", path: "/culture" },
            { name: entry.term, path: `/culture/${entry.slug}` },
          ]),
        }}
      />
      {/* Full-bleed editorial moment */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "50vh" }}>
        <div className="absolute inset-0">
          {entry.heroImageSrc ? (
            <Image
              src={entry.heroImageSrc}
              alt={entry.heroImageAlt ?? entry.term}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
          ) : (
            <EditorialImage
              alt={entry.heroImageAlt ?? entry.term}
              aspect="hero-wide"
              slot={`pantry-hero-${entry.slug}`}
              className="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 to-charcoal-deep/30" />
        </div>
        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "50vh" }}>
          <Container className="pb-12 md:pb-20 pt-32">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/culture"
                className="font-ui text-eyebrow uppercase text-paper/50 hover:text-paper/80 transition-colors duration-300"
              >
                ← Culture
              </Link>
            </nav>
            <p className="font-ui text-eyebrow uppercase text-paper/50 mb-4">
              {entry.classification} · {entry.origin.join(", ")}
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-2xl">
              {entry.term}
            </h1>
          </Container>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-prose mx-auto">
            {/* Red rule — required for culture entries */}
            <RedRule className="mb-8" />

            {/* Opening sentence */}
            <p className="font-display italic text-display-3 text-ink/70 leading-tight mb-10">
              {entry.classification.charAt(0).toUpperCase() + entry.classification.slice(1)}.{" "}
              {entry.origin.join(" and ")}.
            </p>

            <ProseLayout>
              <MDXContent code={entry.body.code} />
            </ProseLayout>

            {/* Story cross-links */}
            {entry.storyRefs && entry.storyRefs.length > 0 ? (
              <div className="mt-14 pt-10 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                  In the journal
                </p>
                <ul className="space-y-2">
                  {entry.storyRefs.map((ref) => (
                    <li key={ref}>
                      <Link
                        href={`/journal/${ref}`}
                        className="font-display italic text-ink hover:text-vermillion transition-colors duration-300"
                      >
                        {ref.replace(/-/g, " ")} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Book CTA */}
            <div className="mt-14 pt-10 border-t border-hairline">
              <p className="font-body text-sm text-ink/60 mb-5">
                {entry.term} appears in the recipes of Tokyo Meets Tuscany.
              </p>
              <AmazonCTA href={TMT_AMAZON} />
            </div>

            {/* Prev/Next */}
            <nav
              aria-label="Previous and next entries"
              className="mt-14 pt-10 border-t border-hairline grid grid-cols-2 gap-8"
            >
              {prev ? (
                <div>
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">Previous</p>
                  <Link
                    href={`/culture/${prev.slug}`}
                    className="font-display text-lg text-ink hover:text-vermillion transition-colors duration-300"
                  >
                    ← {prev.term}
                  </Link>
                </div>
              ) : (
                <div />
              )}
              {next ? (
                <div className="text-right">
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">Next</p>
                  <Link
                    href={`/culture/${next.slug}`}
                    className="font-display text-lg text-ink hover:text-vermillion transition-colors duration-300"
                  >
                    {next.term} →
                  </Link>
                </div>
              ) : null}
            </nav>
          </div>
        </Container>
      </section>
    </article>
  );
}

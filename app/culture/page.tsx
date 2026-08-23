import type { Metadata } from "next";
import { allPantryEntries } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { PantryCard } from "@/components/cards/PantryCard";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  alternates: { canonical: "/culture" },
  title: "Culture",
  description:
    "A knowledge library of ingredients, techniques, and traditions from the Borderless Kitchen series.",
};

const CLASSIFICATIONS = ["ingredient", "technique", "tradition", "term"] as const;

const CLASSIFICATION_LABELS: Record<(typeof CLASSIFICATIONS)[number], string> = {
  ingredient: "Ingredients",
  technique: "Techniques",
  tradition: "Traditions",
  term: "Terms",
};

export default function CulturePage() {
  const entries = [...allPantryEntries].sort((a, b) =>
    a.term.localeCompare(b.term),
  );

  return (
    <>
      <PageHero
        eyebrow="Culture"
        headline="What the recipes are built on."
        dek="Not a glossary. A working library. Each entry is a thing worth understanding before you cook with it."
        src="/images/banner-culture.png"
        alt="Editorial banner — the Culture library."
      />

      {/* Classification rows */}
      {CLASSIFICATIONS.map((cls) => {
        const group = entries.filter((e) => e.classification === cls);
        if (group.length === 0) return null;
        return (
          <section key={cls} className="py-12 md:py-16 border-b border-hairline">
            <Container>
              <FadeRise>
                <h2 className="font-ui text-eyebrow uppercase text-ink/50 mb-6">
                  {CLASSIFICATION_LABELS[cls]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                  {group.map((entry) => (
                    <PantryCard
                      key={entry.slug}
                      slug={entry.slug}
                      term={entry.term}
                      classification={entry.classification}
                      origin={entry.origin}
                    />
                  ))}
                </div>
              </FadeRise>
            </Container>
          </section>
        );
      })}

      <EmailCaptureCTA
        heading="Get the free starter guide."
        body="Get the free starter guide — five pantry ingredients and three techniques that unlock both cuisines."
        cta="free.borderlesskitchenseries.com →"
      />
    </>
  );
}

import type { Metadata } from "next";
import { allPantryEntries } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { PantryCard } from "@/components/cards/PantryCard";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "A knowledge library of ingredients, techniques, and traditions from the Borderless Kitchen series.",
};

const CLASSIFICATIONS = ["ingredient", "technique", "tradition", "term"] as const;

export default function CulturePage() {
  const entries = [...allPantryEntries].sort((a, b) =>
    a.term.localeCompare(b.term),
  );

  return (
    <>
      <section className="py-20 md:py-28 border-b border-hairline">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
            Culture
          </p>
          <h1 className="font-display text-display-1 text-ink leading-tight max-w-3xl">
            What the recipes are built on.
          </h1>
          <p className="font-body text-lg text-ink/60 mt-6 max-w-prose leading-relaxed">
            Not a glossary. A working library. Each entry is a thing worth
            understanding before you cook with it.
          </p>
        </Container>
      </section>

      {/* Classification rows */}
      {CLASSIFICATIONS.map((cls) => {
        const group = entries.filter((e) => e.classification === cls);
        if (group.length === 0) return null;
        return (
          <section key={cls} className="py-12 md:py-16 border-b border-hairline">
            <Container>
              <FadeRise>
                <h2 className="font-ui text-eyebrow uppercase text-ink/50 mb-6">
                  {cls.charAt(0).toUpperCase() + cls.slice(1)}s
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

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SmmcSamplerOptIn } from "@/components/cta/SmmcSamplerOptIn";
import {
  GUMROAD_FUSION_PLAYBOOK_PRICE,
  GUMROAD_FUSION_PLAYBOOK_URL,
  GUMROAD_SMMC_PRICE,
  GUMROAD_SMMC_URL,
  GUMROAD_UMAMI_PRICE,
  GUMROAD_UMAMI_URL,
} from "@/lib/gumroad";

/**
 * The free three-recipe sampler for Seoul Meets Mexico City.
 *
 * The download is the independently reviewed 12-page sampler v3
 * (`public/smmc-sampler-v3.pdf`, sha256 07829e1d…), served unchanged. Its three
 * recipes are the ones listed below — they are NOT the SMMC recipes authored as
 * MDX for the site, so nothing here links to a `/recipes/[slug]` page that does
 * not exist. The PDF carries the complete recipes; no MDX pages are needed.
 */
const SAMPLER_RECIPES = [
  {
    title: "Kimchi Elote Bites",
    kind: "Small plates",
    line: "Charred corn folded into mayo, crema and queso fresco, then capped with a dressed kimchi–gochujang spoonful. Serve in small cups or on tostada chips.",
  },
  {
    title: "Kimchi Fried Rice with Chorizo",
    kind: "Rice",
    line: "Cold day-old rice stir-fried with Mexican chorizo, caramelised kimchi, gochujang and soy. A fried egg on top if you want one.",
  },
  {
    title: "Sweet Rice Horchata Pudding",
    kind: "Dessert · vegetarian",
    line: "Short-grain rice simmered with milk, cinnamon and condensed milk, finished with ground toasted sesame. Serve warm or chilled.",
  },
] as const;

const SAMPLER_PDF = "/smmc-sampler-v3.pdf";

export const metadata: Metadata = {
  title: "Free Seoul Meets Mexico City Sampler — Three Recipes",
  description:
    "A free 12-page PDF from Seoul Meets Mexico City: kimchi elote bites, kimchi fried rice with chorizo, and sweet rice horchata pudding. Complete recipes, no email required.",
  alternates: { canonical: "/free/seoul-meets-mexico-city" },
  openGraph: {
    title: "Free Seoul Meets Mexico City Sampler — Three Recipes",
    description:
      "Three complete recipes from the illustrated cookbook. Free 12-page printable PDF.",
    url: "/free/seoul-meets-mexico-city",
    type: "website",
  },
};

export default function SmmcSamplerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper py-24 md:py-32">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
            Free sampler · Seoul Meets Mexico City
          </p>
          <h1 className="font-display text-display-1 leading-tight max-w-4xl mb-8">
            Three recipes from the Korean–Mexican cookbook.
          </h1>
          <p className="font-body text-xl text-paper/70 leading-relaxed max-w-prose">
            Gochujang against chile. Kimchi against lime. Two fermented,
            chili-driven pantries that have more in common than either has with
            the cooking usually filed next to it. These three recipes are the
            shortest route into what the book does.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href={SAMPLER_PDF}
              download
              className="font-ui text-eyebrow uppercase text-paper border border-paper/40 px-6 py-3 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
            >
              Download the PDF — free ↓
            </a>
            <a
              href={GUMROAD_SMMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-eyebrow uppercase text-paper/60 px-0 py-3 border-b border-transparent hover:text-paper hover:border-paper transition-colors duration-300"
            >
              The full book — {GUMROAD_SMMC_PRICE} →
            </a>
          </div>
          <p className="font-ui text-xs text-paper/40 mt-5">
            No email required. 12 pages, printable, 6 × 9 in.
          </p>
        </Container>
      </section>

      {/* The three recipes */}
      <section className="py-20 md:py-28">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-10">
            What's in the sampler
          </p>
          <ul className="grid gap-x-12 gap-y-14 md:grid-cols-3">
            {SAMPLER_RECIPES.map((recipe, i) => (
              <li key={recipe.title}>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                  {String(i + 1).padStart(2, "0")} · {recipe.kind}
                </p>
                <h2 className="font-display text-display-3 leading-tight mb-4">
                  {recipe.title}
                </h2>
                <p className="font-body text-base text-ink/60 leading-relaxed">
                  {recipe.line}
                </p>
              </li>
            ))}
          </ul>
          <p className="font-body text-base text-ink/50 leading-relaxed max-w-prose mt-12">
            Every recipe in the sampler is the full method — ingredients,
            instructions, a chef's note, and a short "why this works" explaining
            the pairing. This text-first edition is built for reading on screen
            or on paper.
          </p>
        </Container>
      </section>

      {/* Download + optional signup */}
      <section id="sampler" className="bg-ink text-paper py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <SmmcSamplerOptIn />
          </div>
        </Container>
      </section>

      {/* What the book is */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] max-w-5xl mx-auto">
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
                About the book
              </p>
              <h2 className="font-display text-display-2 leading-tight">
                The full illustrated edition.
              </h2>
            </div>
            <div>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-6">
                <em>Seoul Meets Mexico City</em> works the overlap between two
                cuisines that both build flavour from fermented chili, acid, and
                char: gochujang and adobo, kimchi and curtido, sesame and
                cilantro. Every recipe explains why the pairing works, not just
                what to do.
              </p>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-8">
                The illustrated edition is an instant PDF download — no shipping,
                no account required.
              </p>
              <a
                href={GUMROAD_SMMC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                Get the illustrated edition — {GUMROAD_SMMC_PRICE}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Also from the kitchen */}
      <section className="border-t border-hairline py-20 md:py-28">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-10">
            Also from the kitchen
          </p>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 max-w-4xl">
            <div>
              <h2 className="font-display text-display-3 text-ink leading-tight mb-4">
                The Umami Handbook
              </h2>
              <p className="font-body text-base text-ink/60 leading-relaxed mb-6">
                A 22-page guide to the science of umami — the savoury fifth
                taste — and how to build it into everyday cooking.
              </p>
              <a
                href={GUMROAD_UMAMI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                Read the Umami Handbook — {GUMROAD_UMAMI_PRICE}
              </a>
            </div>
            <div>
              <h2 className="font-display text-display-3 text-ink leading-tight mb-4">
                The Fusion Flavor Playbook
              </h2>
              <p className="font-body text-base text-ink/60 leading-relaxed mb-6">
                The pairing logic on its own — which ingredients swap for which
                across cuisines, and why it works.
              </p>
              <a
                href={GUMROAD_FUSION_PLAYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                Get the Fusion Flavor Playbook — {GUMROAD_FUSION_PLAYBOOK_PRICE}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { TMT_AMAZON } from "@/lib/amazon";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  title: "Seoul Meets Mexico City — Vol. II, Coming Soon",
  description:
    "The second Borderless Kitchen book — 30 recipes and 6 master sauces at the intersection of Korean and Mexican cooking. Get notified when it launches and receive preview recipes now.",
  alternates: { canonical: "/preorder" },
  openGraph: {
    title: "Seoul Meets Mexico City — Borderless Kitchen Vol. II",
    description:
      "30 recipes and 6 master sauces where Korean and Mexican cooking traditions meet. Get early access and preview recipes.",
    type: "website",
    url: "/preorder",
    images: [
      {
        url: "/images/smmc-cover.png",
        width: 1200,
        height: 630,
        alt: "Seoul Meets Mexico City — Borderless Kitchen Vol. II cover",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/smmc-cover.png"] },
};

const PREVIEW_RECIPES = [
  {
    slug: "gochujang-pasta",
    title: "Gochujang Pasta",
    dek: "The Korean answer to cacio e pepe.",
  },
  {
    slug: "kimchi-fried-rice-arancini",
    title: "Kimchi Fried Rice Arancini",
    dek: "Korean fried rice in an Italian arancini shell.",
  },
  {
    slug: "doenjang-carbonara",
    title: "Doenjang Carbonara",
    dek: "Korean soybean paste stands in for Parmigiano.",
  },
  {
    slug: "bibimbap-risotto",
    title: "Bibimbap Risotto",
    dek: "The Korean rice bowl as a slow-cooked Italian grain dish.",
  },
  {
    slug: "korean-fried-chicken-tacos",
    title: "Korean Fried Chicken Tacos",
    dek: "Gochujang glaze, kimchi slaw, sesame-lime crema.",
  },
  {
    slug: "tteokbokki-arrabbiata",
    title: "Tteokbokki Arrabbiata",
    dek: "Korean rice cakes in the sauce Italy built for pasta.",
  },
];

const WHY_POINTS = [
  {
    heading: "The same logic, different ingredients.",
    body: "Korean and Mexican cooking share a structural obsession with layered fermented heat — gochujang and salsa verde are solving the same flavor problem with different agricultural traditions. That alignment is what makes this book possible.",
  },
  {
    heading: "Two fermentation traditions, one table.",
    body: "Korea perfected fermented vegetables, spice pastes, and umami-forward condiments over thousands of years. Mexico perfected dried chili complexity, masa-based starch, and bright acid. Combined, they fill each other's gaps.",
  },
  {
    heading: "30 original fusion recipes. 6 master sauces.",
    body: "Birria with doenjang broth. Mole negro with gochujang. Elote with gochugaru. Kimchi quesadilla. Korean fried chicken tacos. Every recipe follows the Flavor Pairing Matrix principle: find the structural equivalent, swap at the ingredient level.",
  },
];

export default function PreorderPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="max-w-2xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Borderless Kitchen — Volume II
              </p>
              <h1 className="font-display text-display-1 text-ink leading-none mb-6">
                Seoul Meets<br />Mexico City
              </h1>
              <p className="font-body text-xl text-ink/70 leading-relaxed mb-8 max-w-prose">
                Thirty recipes and six master sauces where Korean and Mexican cooking traditions collide —
                gochujang meets mole, kimchi meets salsa, tteok meets masa.
                The second volume in the Borderless Kitchen series.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="inline-block bg-ink/5 border border-hairline px-5 py-3">
                  <p className="font-ui text-eyebrow uppercase text-ink/60">Status</p>
                  <p className="font-display text-lg text-ink mt-1">Coming Soon</p>
                </div>
                <div className="inline-block bg-ink/5 border border-hairline px-5 py-3">
                  <p className="font-ui text-eyebrow uppercase text-ink/60">Preview Recipes</p>
                  <p className="font-display text-lg text-ink mt-1">6 Free Now</p>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Why it works */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <h2 className="font-display text-display-2 text-ink mb-12">
              Why Korean and Mexican flavors work together.
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {WHY_POINTS.map((point) => (
                <div key={point.heading}>
                  <h3 className="font-display text-xl text-ink mb-3 leading-tight">
                    {point.heading}
                  </h3>
                  <p className="font-body text-base text-ink/70 leading-relaxed">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Preview recipes */}
      <section className="py-16 md:py-24 bg-paper border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                  Free now — no account needed
                </p>
                <h2 className="font-display text-display-2 text-ink leading-tight">
                  Six preview recipes.
                </h2>
              </div>
              <Link
                href="/free"
                className="font-ui text-eyebrow uppercase text-ink border-b border-ink/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 shrink-0"
              >
                See all free recipes →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {PREVIEW_RECIPES.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="group block border border-hairline p-6 hover:border-vermillion transition-colors duration-300"
                >
                  <h3 className="font-display text-xl text-ink mb-1 group-hover:text-vermillion transition-colors duration-300">
                    {recipe.title}
                  </h3>
                  <p className="font-body text-sm text-ink/60 leading-relaxed">
                    {recipe.dek}
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-vermillion mt-4">
                    Get the recipe →
                  </p>
                </Link>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Volume I CTA */}
      <section className="py-16 md:py-20 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                  Already available
                </p>
                <h2 className="font-display text-display-2 text-ink mb-4 leading-tight">
                  Start with Volume I.
                </h2>
                <p className="font-body text-base text-ink/70 leading-relaxed mb-6">
                  Tokyo Meets Tuscany — 30 recipes at the intersection of Japanese and Italian cooking.
                  The same Flavor Pairing Matrix logic, applied to the Japanese-Italian axis.
                  Available now on Amazon.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={TMT_AMAZON}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
                  >
                    Tokyo Meets Tuscany on Amazon →
                  </Link>
                </div>
              </div>
              <div>
                <div className="border border-hairline p-8">
                  <p className="font-display italic text-display-3 text-ink/50 leading-tight mb-4">
                    "Japanese and Italian cooking are both obsessed with three things:
                    wheat, fermentation, and umami. That obsession is the reason the
                    flavors work across cultures."
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-ink/40">
                    — From the introduction to Tokyo Meets Tuscany
                  </p>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Be first when Seoul Meets Mexico City launches."
        body="Join the list for early access and the complete Flavor Pairing Matrix for Korean-Mexican cooking — delivered to the list first."
        cta="Get early access →"
      />
    </>
  );
}

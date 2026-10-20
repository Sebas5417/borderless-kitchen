import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { AmazonCTA } from "@/components/cta/AmazonCTA";

export const metadata: Metadata = {
  title: "Seoul Meets Mexico City — Vol. II, Out Now on Amazon",
  description:
    "The second Borderless Kitchen book — 30 recipes and 6 master sauces at the intersection of Korean and Mexican cooking. Out now in paperback and on Kindle. Explore free Korean–Mexican recipes.",
  alternates: { canonical: "/seoul-meets-mexico-city" },
  openGraph: {
    title: "Seoul Meets Mexico City — Borderless Kitchen Vol. II",
    description:
      "30 recipes and 6 master sauces where Korean and Mexican cooking traditions meet. Available now in paperback and on Kindle.",
    type: "website",
    url: "/seoul-meets-mexico-city",
    images: [
      {
        url: "/images/smmc-cover-current.png",
        width: 1200,
        height: 630,
        alt: "Seoul Meets Mexico City — Borderless Kitchen Vol. II cover",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/smmc-cover-current.png"] },
};

const PREVIEW_RECIPES = [
  {
    "slug": "gochujang-braised-short-rib-taco",
    "title": "Gochujang Braised Short Rib Taco",
    "dek": "Korean braising technique — gochujang, soy, sesame — on bone-in short ribs, served in a corn tortilla with pickled daikon and cilantro."
  },
  {
    "slug": "gochugaru-elote-korean-mexican-corn",
    "title": "Gochugaru Elote (Korean-Mexican Grilled Corn)",
    "dek": "Mexican street corn's mayo-cotija-chili formula, rebuilt with gochugaru heat and a gochujang-mayo base instead of crema. Same charred-corn foundation, a completely different chili character — smokier and slower-building than the usual chili powder."
  },
  {
    "slug": "mexican-korean-birria-tacos",
    "title": "Korean-Mexican Birria Tacos with Kimchi Salsa",
    "dek": "Birria braised with gochugaru and doenjang — the Mexican technique, Korean aromatics. Dip the tortilla in the braising consommé. Add kimchi where the salsa verde would go."
  },
  {
    "slug": "korean-fried-chicken-tacos",
    "title": "Korean Fried Chicken Tacos",
    "dek": "Gochujang-glazed fried chicken thighs in corn tortillas with kimchi slaw and sesame-lime crema. Korean fried chicken's lacquered crunch in the form factor of a taco."
  },
  {
    "slug": "birria-ramen",
    "title": "Birria Ramen",
    "dek": "Mexican birria's crimson, chili-braised beef over Japanese ramen noodles, with the consommé served alongside for dipping. Two braising traditions that were always doing the same thing."
  },
  {
    "slug": "kimchi-quesadilla",
    "title": "Kimchi Quesadilla",
    "dek": "Fermented kimchi, Oaxacan cheese, and a flour tortilla pressed until crisp. Korean heat meets Mexican technique in under 10 minutes."
  }
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

const smmcBookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Borderless Kitchen: Seoul Meets Mexico City",
  author: {
    "@type": "Person",
    name: "Sebastian Dri",
    url: "https://borderlesskitchenseries.com/about",
  },
  publisher: { "@type": "Organization", name: "Borderless Kitchen" },
  inLanguage: "en",
  genre: ["Cookbook", "Fusion Cuisine", "Cross-cultural cooking"],
  description:
    "The second Borderless Kitchen volume — 30 recipes and 6 master sauces where Korean and Mexican cooking traditions meet.",
  image: "https://borderlesskitchenseries.com/images/smmc-cover-current.png",
  url: "https://borderlesskitchenseries.com/seoul-meets-mexico-city",
  sameAs: "https://www.amazon.com/dp/B0H6VD21M2",
  isPartOf: {
    "@type": "BookSeries",
    name: "Borderless Kitchen",
    url: "https://borderlesskitchenseries.com/books",
  },
  offers: {
    "@type": "Offer",
    url: SMMC_AMAZON,
    priceCurrency: "USD",
    price: "9.99",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Amazon" },
  },
};

export default function SeoulMeetsMexicoCityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(smmcBookSchema) }} />
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-hairline">
        <Container>
          <FadeRise>
            <div className="grid gap-10 md:grid-cols-[1fr_280px] items-center">
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
                  <p className="font-display text-lg text-ink mt-1">Available Now — Paperback & Kindle</p>
                </div>
                <div className="inline-block bg-ink/5 border border-hairline px-5 py-3">
                  <p className="font-ui text-eyebrow uppercase text-ink/60">Free Recipes</p>
                  <p className="font-display text-lg text-ink mt-1">6 Free Now</p>
                </div>
              </div>
              <div className="mt-8">
                <AmazonCTA href={SMMC_AMAZON} label="Buy Seoul Meets Mexico City on Amazon →" />
                <p className="font-body text-sm text-ink/50 mt-2">Paperback and Kindle, both available now.</p>
              </div>
            </div>
            <Image src="/images/smmc-cover-current.png" alt="Seoul Meets Mexico City cookbook cover" width={602} height={785} sizes="(min-width: 768px) 280px, 70vw" priority className="w-full max-w-[280px] mx-auto h-auto" />
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
                  Six Korean–Mexican recipes to try.
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
                    rel="noopener noreferrer sponsored"
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
        heading="Start with six recipes, free."
        body="Seoul Meets Mexico City is out now in paperback and on Kindle. Join the list for free Korean-Mexican recipes and the complete Flavor Pairing Matrix."
        cta="Send them to me →"
      />
    </>
  );
}

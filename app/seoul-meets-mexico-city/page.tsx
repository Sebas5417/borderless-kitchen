import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SmmcWaitlist } from "@/components/cta/SmmcWaitlist";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";
import { GUMROAD_SMMC_URL, GUMROAD_SMMC_PRICE } from "@/lib/gumroad";
import {
  SMMC_AMAZON_KINDLE,
  SMMC_AMAZON_KINDLE_PRICE,
  SMMC_AMAZON_PAPERBACK,
  SMMC_AMAZON_PAPERBACK_PRICE,
} from "@/lib/amazon";

/**
 * The retail cover, pulled from the Amazon paperback listing (B0HDRBMLPT).
 * Every surface that shows the book as sold renders this one file so the
 * picture here and the picture on the listing cannot drift apart.
 */
const SMMC_COVER = "/images/smmc-cover-amazon.jpg";
const SMMC_COVER_W = 1000;
const SMMC_COVER_H = 1293;
const SMMC_COVER_ALT =
  "Cover of Seoul Meets Mexico City, the second Borderless Kitchen volume: gold filigree on black framing the title in gold, above a split skyline of Seoul and Mexico City, with a plate of charred tacos below.";

export const metadata: Metadata = {
  title: "Seoul Meets Mexico City — Out Now",
  alternates: { canonical: "/seoul-meets-mexico-city" },
  description:
    "Seoul Meets Mexico City — the Korean–Mexican collision. Volume II of the Borderless Kitchen series. Paperback and Kindle on Amazon, illustrated PDF on Gumroad.",
  openGraph: {
    title: "Seoul Meets Mexico City | Borderless Kitchen — Vol. II",
    description:
      "The Korean–Mexican collision. Paperback and Kindle on Amazon, illustrated PDF on Gumroad.",
    type: "website",
    url: "/seoul-meets-mexico-city",
    images: [
      {
        url: SMMC_COVER,
        width: SMMC_COVER_W,
        height: SMMC_COVER_H,
        alt: SMMC_COVER_ALT,
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [SMMC_COVER] },
};

// Superseded 2026-11-10. This schema used to say the Amazon listings "are no
// longer the purchase path" and offered Gumroad alone. Both editions were
// re-verified live that day (see lib/amazon.ts), so the schema now lists all
// three formats and points sameAs at the real listings.
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
  image: `https://borderlesskitchenseries.com${SMMC_COVER}`,
  url: "https://borderlesskitchenseries.com/seoul-meets-mexico-city",
  sameAs: [SMMC_AMAZON_PAPERBACK, SMMC_AMAZON_KINDLE, GUMROAD_SMMC_URL],
  isPartOf: {
    "@type": "BookSeries",
    name: "Borderless Kitchen",
    url: "https://borderlesskitchenseries.com/books",
  },
  offers: [
    {
      "@type": "Offer",
      url: SMMC_AMAZON_PAPERBACK,
      priceCurrency: "USD",
      price: SMMC_AMAZON_PAPERBACK_PRICE.replace("$", ""),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon" },
    },
    {
      "@type": "Offer",
      url: SMMC_AMAZON_KINDLE,
      priceCurrency: "USD",
      price: SMMC_AMAZON_KINDLE_PRICE.replace("$", ""),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon" },
    },
    {
      "@type": "Offer",
      url: GUMROAD_SMMC_URL,
      priceCurrency: "USD",
      price: GUMROAD_SMMC_PRICE.replace("$", ""),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Borderless Kitchen" },
    },
  ],
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

// Moved here 2026-11-10 when /preorder was consolidated into this page. The
// copy is unchanged; it is the only unique sales copy the duplicate route held.
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

export default function SeoulMeetsMexicoCityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(smmcBookSchema) }}
      />
      <section className="bg-ink text-paper">
        <Container className="min-h-[70vh] flex flex-col justify-center pt-32 pb-20">
          <FadeRise>
            <div className="max-w-2xl">
              <SmmcWaitlist dark />
            </div>
          </FadeRise>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-paper border-t border-hairline">
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

      <section className="py-16 md:py-24 bg-paper border-t border-hairline">
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

      <section className="py-16 md:py-20 bg-paper border-t border-hairline">
        <Container>
          <FadeRise>
            <div className="max-w-2xl">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                Meanwhile, in Vol. I
              </p>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-6">
                Tokyo Meets Tuscany — the Japanese–Italian collection — is out
                now.
              </p>
              <Link
                href="/tokyo-meets-tuscany"
                className="inline-block font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                Explore Tokyo Meets Tuscany →
              </Link>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* This banner is a link, not a form — it collects no email. It used to
          promise "free Korean-Mexican recipes and the complete Flavor Pairing
          Matrix" behind a "Send them to me →" button, then send the reader to
          /flavor-guide, which is the Japanese–Italian matrix and contains no
          Korean–Mexican recipes. Copy and destination now both point at the SMMC
          sampler page, which delivers without an email. Corrected 2026-11-07. */}
      <EmailCaptureCTA
        heading="Start with three Korean–Mexican recipes, free."
        body="Seoul Meets Mexico City is out now in paperback and on Kindle, with an illustrated PDF from our own shop. Read three complete recipes here, or take the 12-page sampler — no email needed."
        cta="Read the free recipes →"
        href="/free/seoul-meets-mexico-city"
      />
    </>
  );
}

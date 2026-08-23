import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SmmcWaitlist } from "@/components/cta/SmmcWaitlist";
import { FadeRise } from "@/components/motion/FadeRise";
import { SMMC_AMAZON } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Seoul Meets Mexico City — Out Now on Amazon",
  alternates: { canonical: "/seoul-meets-mexico-city" },
  description:
    "Seoul Meets Mexico City — the Korean–Mexican collision. Volume II of the Borderless Kitchen series. Out now in paperback and on Kindle.",
  openGraph: {
    title: "Seoul Meets Mexico City | Borderless Kitchen — Vol. II",
    description:
      "The Korean–Mexican collision. Available now on Kindle.",
    type: "website",
    url: "/seoul-meets-mexico-city",
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

// SMMC eBook live on Amazon (ASIN B0H6VD21M2, Kindle $9.99) — mirrors the
// schema on /books/seoul-meets-mexico-city.
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
  image: "https://borderlesskitchenseries.com/images/smmc-cover.png",
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
    </>
  );
}

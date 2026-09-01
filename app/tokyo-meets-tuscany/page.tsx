import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TMT_AMAZON } from "@/lib/amazon";
import { amazonOffer } from "@/lib/merchant-schema";
import { Container } from "@/components/layout/Container";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { SmmcWaitlist } from "@/components/cta/SmmcWaitlist";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Tokyo Meets Tuscany — Japanese Precision. Italian Comfort.",
  description:
    "A modern Japanese–Italian fusion cookbook for weeknight dinners that feel restaurant-level without restaurant prices. Download the free 5-Sauce Pack and get the book on Amazon.",
  alternates: { canonical: "/tokyo-meets-tuscany" },
  openGraph: {
    title: "Tokyo Meets Tuscany | Borderless Kitchen",
    description:
      "Japanese precision meets Italian comfort. Thirty tested fusion recipes — miso butter pasta, chili oil lasagna, soy-balsamic glaze. Free Sauce Pack download + book on Amazon.",
    type: "website",
    url: "/tokyo-meets-tuscany",
    images: [
      {
        url: "/images/tmt-cover-new.png",
        width: 1200,
        height: 630,
        alt: "Tokyo Meets Tuscany cookbook cover",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/tmt-cover-new.png"] },
};

const AMAZON_URL = TMT_AMAZON;

// Verified against the KDP interior + live Amazon listing (2026-07-26):
// 30 recipes, 6 master sauces, 90 pages, paperback $19.99 / Kindle $9.99, ISBN 9798257577871.
const tmtBookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Borderless Kitchen: Tokyo Meets Tuscany",
  alternateName:
    "Tokyo Meets Tuscany: A Modern Italian–Japanese Fusion Cookbook",
  author: {
    "@type": "Person",
    name: "Sebastian Dri",
    url: "https://borderlesskitchenseries.com/about",
  },
  publisher: { "@type": "Organization", name: "Borderless Kitchen" },
  isbn: "9798257577871",
  bookFormat: "https://schema.org/Paperback",
  numberOfPages: 90,
  inLanguage: "en",
  datePublished: "2026-04-20",
  genre: ["Cookbook", "Fusion Cuisine", "Cross-cultural cooking"],
  description:
    "A modern Japanese–Italian fusion cookbook — 30 recipes and 6 master sauces at the intersection of Japanese precision and Italian comfort, built on the Flavor Pairing Matrix.",
  image: "https://borderlesskitchenseries.com/images/tmt-cover-new.png",
  url: "https://borderlesskitchenseries.com/tokyo-meets-tuscany",
  sameAs: "https://www.amazon.com/dp/B0GY8H2TCQ",
  isPartOf: {
    "@type": "BookSeries",
    name: "Borderless Kitchen",
    url: "https://borderlesskitchenseries.com/books",
  },
  offers: amazonOffer({ url: TMT_AMAZON, price: "19.99" }),
};

const RECIPES = [
  {
    name: "Udon Bolognese",
    description:
      "Thick chewy udon in a slow-cooked Italian ragù. The collision that makes both traditions make more sense.",
    time: "40 min",
  },
  {
    name: "Chili Oil Lasagna Roll-Ups",
    description:
      "Classic lasagna structure, Japanese chili-oil heat. The Italian comfort food that went to Tokyo and came back dangerous.",
    time: "45 min",
  },
  {
    name: "Miso Butter Pasta",
    description:
      "Butter, miso, pasta water. Salty, deep, creamy, and impossible to mess up. The dish that started everything.",
    time: "15 min",
  },
];

export default function TokyoMeetsTuscanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tmtBookSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-charcoal-deep overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tmt-udon-bolognese.jpg"
            alt="Udon Bolognese — thick udon in rich Italian ragù"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-charcoal-deep/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/95 via-charcoal-deep/30 to-charcoal-deep/40" />
        </div>
        <Container className="relative z-10 min-h-[65vh] md:min-h-[70vh] flex flex-col justify-end pt-32 pb-16 md:pb-24">
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
              Borderless Kitchen — Vol. I
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl mb-6">
              Japanese precision meets Italian comfort.
            </h1>
            <p className="font-body text-xl text-paper/75 max-w-2xl leading-relaxed mb-10">
              A Japanese–Italian fusion cookbook for weeknight dinners that
              feel restaurant-level without restaurant prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-ui text-eyebrow uppercase text-paper bg-vermillion px-10 py-5 hover:bg-vermillion/90 transition-colors duration-300 text-center"
              >
                Get it on Amazon →
              </a>
              <a
                href="#sauce-pack"
                className="inline-block font-ui text-eyebrow uppercase text-paper border border-paper/40 px-10 py-5 hover:border-paper transition-colors duration-300 text-center"
              >
                Free Sauce Pack ↓
              </a>
            </div>
            <p className="font-ui text-xs text-paper/40 mt-4">
              Paperback $19.99 · Kindle $9.99
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* Philosophy strip */}
      <section className="bg-vermillion py-5">
        <Container>
          <p className="font-ui text-eyebrow uppercase text-paper text-center tracking-widest">
            Soy sauce and butter want the same thing. Chili oil and tomato are
            cousins. Flavor has no passport.
          </p>
        </Container>
      </section>

      {/* Sauce Pack opt-in */}
      <section id="sauce-pack" className="py-20 md:py-28 bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">
                  Free download
                </p>
                <h2 className="font-display text-display-2 text-paper leading-tight mb-6">
                  5 Japanese–Italian Sauces. Free.
                </h2>
                <p className="font-body text-lg text-paper/70 leading-relaxed mb-4">
                  The five core sauce recipes from <em>Tokyo Meets Tuscany</em>{" "}
                  — formatted, tested, and ready to use on pasta, rice, meat,
                  and vegetables.
                </p>
                <ul className="font-body text-paper/70 space-y-2 mb-8 text-base">
                  {[
                    "Miso Butter Sauce",
                    "Chili-Soy Garlic Oil",
                    "Umami Tomato Sauce",
                    "Soy-Balsamic Glaze",
                    "Parmesan-Miso Cream",
                  ].map((sauce) => (
                    <li key={sauce} className="flex items-center gap-3">
                      <span className="text-vermillion">—</span>
                      <span>{sauce}</span>
                    </li>
                  ))}
                </ul>
                {/* TODO: replace public/sauce-pack.pdf placeholder with the real Sauce Pack PDF */}
                <SubscribeForm
                  list="tmt"
                  placeholder="your@email.com"
                  buttonLabel="Send me the free Sauce Pack"
                  dark
                  successMessage="Check your email — and grab it now:"
                  successLink={{
                    href: "/sauce-pack.pdf",
                    label: "Download the Sauce Pack (PDF) →",
                  }}
                />
                <p className="font-ui text-xs text-paper/30 mt-4">
                  You'll receive the PDF instantly. No spam.
                </p>
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/tmt-carbonara-ramen.jpg"
                  alt="Carbonara Ramen — from Tokyo Meets Tuscany"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Recipe previews */}
      <section className="py-20 md:py-28 bg-paper">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
              What's inside
            </p>
            <h2 className="font-display text-display-2 text-ink leading-tight mb-16 max-w-xl">
              Thirty recipes. Zero compromises.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-hairline">
              {RECIPES.map((recipe) => (
                <div
                  key={recipe.name}
                  className="border-b border-r border-hairline p-10"
                >
                  <p className="font-ui text-xs uppercase text-ink/30 mb-3">
                    {recipe.time}
                  </p>
                  <h3 className="font-display text-2xl text-ink leading-tight mb-4">
                    {recipe.name}
                  </h3>
                  <p className="font-body text-base text-ink/60 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Food image break */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/images/tmt-meatballs-hero.jpg"
          alt="Teriyaki meatballs with Pecorino — Tokyo Meets Tuscany"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-display-2 text-paper text-center px-4">
            Food borders are fake.
            <br />
            Flavor is real.
          </p>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 md:py-28 bg-ink/[0.03] border-y border-hairline">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/tmt-cover-new.png"
                    alt="Tokyo Meets Tuscany cookbook"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">
                  The Borderless Kitchen system
                </p>
                <h2 className="font-display text-display-2 text-ink leading-tight mb-6">
                  Every recipe in this book was built on a principle, not a
                  hunch.
                </h2>
                <p className="font-body text-lg text-ink/70 leading-relaxed mb-4">
                  Miso and Parmigiano both exist to add fermented salt-depth.
                  Soy sauce and balsamic are both sweet-acid-savory finishers.
                  Udon and pappardelle are both wide, sauce-catching starch
                  noodles. The swaps in{" "}
                  <em>Tokyo Meets Tuscany</em> aren't creative experiments —
                  they're functional matches built on what each ingredient
                  actually does.
                </p>
                <p className="font-body text-lg text-ink/70 leading-relaxed mb-8">
                  That's the Borderless Kitchen method: understand function
                  first, then cross any border you want.
                </p>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-10 py-5 hover:bg-vermillion transition-colors duration-300"
                >
                  Tokyo Meets Tuscany on Amazon →
                </a>
                <p className="font-ui text-xs text-ink/40 mt-3">
                  Paperback $19.99 · Kindle $9.99
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* SMMC waitlist */}
      <section className="py-20 md:py-24 bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-2xl">
              <SmmcWaitlist dark />
              <Link
                href="/seoul-meets-mexico-city"
                className="inline-block font-ui text-eyebrow uppercase text-paper/50 border-b border-paper/30 pb-1 mt-8 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                More about Vol. II →
              </Link>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-paper">
        <Container>
          <FadeRise>
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
                Available now
              </p>
              <h2 className="font-display text-display-1 text-ink leading-tight mb-6">
                Tokyo Meets Tuscany.
              </h2>
              <p className="font-body text-lg text-ink/60 mb-10">
                Japanese precision. Italian comfort. One cookbook that makes
                both traditions make more sense.
              </p>
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-ui text-eyebrow uppercase text-paper bg-vermillion px-12 py-6 hover:bg-vermillion/90 transition-colors duration-300 text-lg"
              >
                Get it on Amazon →
              </a>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

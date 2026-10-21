import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { allBooks, allStories, allFieldNotes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { AvailableBooks } from "@/components/editorial/AvailableBooks";
import { BookCard } from "@/components/cards/BookCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute: "Borderless Kitchen — Japanese–Italian & Korean–Mexican Cookbooks",
  },
  description:
    "Explore Tokyo Meets Tuscany and Seoul Meets Mexico City: Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri, plus free recipes.",

  twitter: { ...({}), title: "Borderless Kitchen — Japanese–Italian & Korean–Mexican Cookbooks", description: "Explore Tokyo Meets Tuscany and Seoul Meets Mexico City: Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri, plus free recipes.", card: "summary_large_image", images: ["/images/banner-carousel-1.png"] },

  openGraph: { ...({}), title: "Borderless Kitchen — Japanese–Italian & Korean–Mexican Cookbooks", description: "Explore Tokyo Meets Tuscany and Seoul Meets Mexico City: Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri, plus free recipes.", url: "/", images: [{ url: "/images/banner-carousel-1.png", width: 2172, height: 724, alt: "Borderless Kitchen — cross-cultural cookbook series" }] },
};

import { SMMC_AMAZON } from "@/lib/amazon";

export default function HomePage() {
  const upcoming = allBooks
    .filter((b) => b.status === "coming")
    .sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100))
    .slice(0, 3);
  const now = new Date();
  const stories = [...allStories]
    .filter((s) => new Date(s.date) <= now)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);
  const notes = [...allFieldNotes]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  // Buying guides, pinned (2026-10-09). The "Stories" grid shows only the
  // newest essays, so the guides that carry product links fall off the
  // homepage within days. Listed by slug; a missing slug is skipped, never a 404.
  const GUIDE_SLUGS = [
    "best-korean-cooking-gifts-for-home-cooks",
    "best-mexican-cooking-gifts-for-home-cooks",
    "best-japanese-cooking-gifts-for-home-cooks",
    "best-italian-cooking-gifts-for-home-cooks",
    "best-gifts-for-ramen-lovers",
    "best-sushi-making-kit-what-you-actually-need",
    "best-hot-pot-setup-for-home-electric-vs-induction-vs-butane",
    "stocking-stuffers-for-home-cooks-under-25",
    "korean-mexican-pantry-starter-kit",
    "best-japanese-pantry-starter-kit-ingredients",
    "best-kimchi-making-supplies-and-equipment",
    "best-korean-cookbooks-for-home-cooks",
    "best-mexican-cookbooks-for-home-cooks",
    "best-japanese-cookbooks-for-home-cooks",
    "gochujang-vs-gochugaru-difference",
    "miso-vs-doenjang-difference",
    "mirin-vs-rice-vinegar-difference",
    "best-wok-for-home-cooking-buying-guide",
    "best-korean-bbq-grill-pan-for-home",
    "best-short-grain-rice-for-japanese-and-korean-cooking",
    "dashi-vs-korean-anchovy-broth",
    "kewpie-vs-regular-mayonnaise-difference",
    "masa-harina-vs-cornmeal-difference",
    "panko-vs-breadcrumbs-difference",
    "best-tortilla-press-how-to-choose",
    "ancho-vs-guajillo-vs-pasilla-dried-chiles",
    "best-pasta-maker-manual-vs-electric-vs-stand-mixer",
    "san-marzano-tomatoes-dop-how-to-buy",
    "best-donabe-japanese-clay-pot-how-to-choose",
    "best-japanese-mandoline-slicer-benriner",
    "arborio-vs-carnaroli-vs-vialone-nano-risotto-rice",
    "best-italian-cookbooks-for-home-cooks",
    "best-whetstone-for-japanese-knives-how-to-choose",
    "best-soy-sauce-brands-how-to-choose",
    "parmigiano-reggiano-vs-parmesan-how-to-buy",
    "best-chili-crisp-brands-how-to-choose",
    "best-dolsot-korean-stone-bowl-how-to-choose",
    "best-mexican-hot-sauce-valentina-vs-cholula-vs-tapatio",
    "mexican-oregano-vs-oregano-difference",
  ];
  const guides = GUIDE_SLUGS.map((slug) => allStories.find((s) => s.slug === slug)).filter(
    (s): s is (typeof allStories)[number] => Boolean(s),
  );
  // Seasonal gift band (2026-10-15): shown from Oct 15 to Dec 24, evaluated at
  // build time, so it disappears on the first deploy after Christmas Eve.
  const month = now.getMonth();
  const day = now.getDate();
  const giftSeason = (month === 9 && day >= 15) || month === 10 || (month === 11 && day <= 24);
  const GIFT_SLUGS = [
    "best-japanese-cooking-gifts-for-home-cooks",
    "best-korean-cooking-gifts-for-home-cooks",
    "best-mexican-cooking-gifts-for-home-cooks",
    "best-italian-cooking-gifts-for-home-cooks",
    "best-gifts-for-ramen-lovers",
    "stocking-stuffers-for-home-cooks-under-25",
  ];
  const giftGuides = GIFT_SLUGS.map((slug) => allStories.find((s) => s.slug === slug)).filter(
    (s): s is (typeof allStories)[number] => Boolean(s),
  );

  return (
    <>
      <section className="bg-paper py-10 md:py-16" aria-labelledby="latest-book-title">
        <Container className="grid md:grid-cols-[1.2fr_0.8fr] items-center gap-8 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">The latest cookbook · Volume II · Available now</p>
            <h1 id="latest-book-title" className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[5rem] leading-[1.05] text-ink">Seoul Meets<br />Mexico City</h1>
            <p className="font-body text-lg md:text-xl text-ink/75 leading-relaxed mt-6 max-w-lg">Korean depth. Mexican heat. Thirty recipes and six master sauces that bring two bold cooking traditions to your table.</p>
            <p className="font-ui text-sm text-ink/65 mt-4">Available in paperback and on Kindle.</p>
            <div className="flex flex-wrap items-center gap-5 mt-7">
              <a href={SMMC_AMAZON} target="_blank" rel="sponsored noopener noreferrer" className="bg-ink text-paper font-ui text-sm px-6 py-4 hover:bg-vermillion transition-colors">Buy on Amazon →</a>
              <Link href="/seoul-meets-mexico-city" className="font-ui text-sm border-b border-ink/40 pb-1">Explore the book →</Link>
            </div>
            <p className="font-ui text-xs leading-relaxed text-ink/60 mt-5 max-w-md">As an Amazon Associate we earn from qualifying purchases, at no extra cost to you.</p>
          </div>
          <Link href="/seoul-meets-mexico-city" aria-label="Explore Seoul Meets Mexico City" className="order-1 md:order-2 block w-[190px] sm:w-[240px] md:w-full max-w-[340px] mx-auto">
            <Image src="/images/smmc-cover-current.png" alt="Seoul Meets Mexico City cookbook — black-and-gold cover with Korean–Mexican tacos" width={602} height={785} sizes="(min-width: 768px) 340px, (min-width: 640px) 240px, 190px" priority className="w-full h-auto shadow-xl" />
          </Link>
        </Container>
      </section>
      <AvailableBooks />

      {/* 2b. Seasonal: holiday gift guides */}
      {giftSeason && giftGuides.length > 0 ? (
        <section className="py-14 md:py-16 border-t border-hairline bg-ink text-paper">
          <Container>
            <div className="md:flex md:items-end md:justify-between gap-10 mb-8">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">
                  Holiday gift guides
                </p>
                <h2 className="font-display text-display-3 text-paper leading-tight max-w-xl">
                  Gifts for the cook in your life, sorted by budget.
                </h2>
              </div>
              <Link
                href="/guides#gifts"
                className="hidden md:inline-block shrink-0 font-ui text-eyebrow uppercase text-paper/70 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                All gift guides →
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
              {giftGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/journal/${g.slug}`}
                    className="font-display text-lg text-paper/90 leading-snug hover:text-vermillion transition-colors duration-300"
                  >
                    {g.title.replace(/\s*\(\d{4}\).*$/, "")} →
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-base text-paper/70">
              Holiday menus:{" "}
              <Link href="/journal/fusion-friendsgiving-menu-korean-japanese-italian" className="text-paper underline decoration-paper/30 underline-offset-4 hover:text-vermillion">
                a fusion Friendsgiving
              </Link>
              ,{" "}
              <Link href="/journal/feast-of-the-seven-fishes-japanese-italian-menu" className="text-paper underline decoration-paper/30 underline-offset-4 hover:text-vermillion">
                a Japanese-Italian Feast of the Seven Fishes
              </Link>
              {" "}and{" "}
              <Link href="/journal/japanese-new-year-food-toshikoshi-soba-ozoni-osechi" className="text-paper underline decoration-paper/30 underline-offset-4 hover:text-vermillion">
                Japanese New Year food
              </Link>
              .
            </p>
            <Link
              href="/guides#gifts"
              className="md:hidden inline-block mt-8 font-ui text-eyebrow uppercase text-paper/70 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
            >
              All gift guides →
            </Link>
          </Container>
        </section>
      ) : null}

      {/* 3c. Free recipes CTA strip */}
      <section className="py-10 md:py-12 border-t border-hairline bg-paper">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                Free — no account needed
              </p>
              <p className="font-display text-display-3 text-ink leading-tight">
                85 free recipes + the Flavor Pairing Matrix.
              </p>
              <p className="font-body text-base text-ink/60 mt-2">
                Browse the recipes, then use the pairing guide to make your own Japanese–Italian swaps.
              </p>
            </div>
            <Link
              href="/free"
              className="font-ui text-eyebrow uppercase text-ink border-b border-ink/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 shrink-0"
            >
              Get the free collection →
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. Series preview */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
                Coming next
              </p>
              <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                More journeys in development.
              </h2>
            </div>
            <Link href="/books" className="link-quiet text-ink text-base">
              All volumes
            </Link>
          </div>

          <FadeRise>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {upcoming.map((book) => (
                <li key={book.slug}>
                  <BookCard
                    slug={book.slug}
                    title={book.title}
                    regionA={book.regionA}
                    regionB={book.regionB}
                    status={book.status}
                    coverImageAlt={book.coverImageAlt}
                    coverSrc={book.coverImageSrc ?? null}
                  />
                </li>
              ))}
            </ul>
          </FadeRise>
        </Container>
      </section>

      {/* 5. Stories */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
                Journal
              </p>
              <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                Notes on food, culture, memory, and movement.
              </h2>
            </div>
            <Link href="/journal" className="link-quiet text-ink text-base">
              All essays
            </Link>
          </div>

          <FadeRise>
            <div className="mb-10 pb-10 border-b border-hairline">
              <Link
                href="/journal/japanese-cooking-for-beginners-guide-to-getting-started"
                className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
              >
                <p className="font-ui text-eyebrow uppercase text-vermillion shrink-0">
                  Start here
                </p>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300 mb-2">
                    New to Japanese-Italian cooking? Start here →
                  </h3>
                  <p className="font-body text-sm text-ink/60 leading-relaxed max-w-prose">
                    What to read first, what to cook first, and what order to build the pantry — whether you're coming from Italian cooking or Japanese cooking.
                  </p>
                </div>
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {stories.map((story) => (
                <li key={story.slug}>
                  <StoryCard
                    slug={story.slug}
                    title={story.title}
                    dek={story.dek}
                    date={story.date}
                    heroImageAlt={story.heroImageAlt}
                    heroSrc={story.heroImageSrc ?? null}
                  />
                </li>
              ))}
            </ul>
          </FadeRise>
        </Container>
      </section>

      {/* 5a. Buying guides */}
      {guides.length > 0 ? (
        <section className="py-20 md:py-24 border-t border-hairline">
          <Container>
            <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
              Buying guides
            </p>
            <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight mb-10">
              What to buy, what to skip.
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/journal/${g.slug}`}
                    className="font-display text-lg text-ink leading-snug hover:text-vermillion transition-colors duration-300"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/guides"
              className="inline-block mt-10 font-ui text-eyebrow uppercase text-vermillion hover:text-ink transition-colors duration-300"
            >
              All buying guides →
            </Link>
          </Container>
        </section>
      ) : null}

      {/* 5b. Field Notes — quiet surface */}
      {notes.length > 0 ? (
        <section className="py-20 md:py-24 border-t border-hairline bg-ink/[0.02]">
          <Container>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
              <div>
                <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                  Field Notes
                </p>
                <h2 className="font-display text-display-3 text-ink max-w-xl leading-tight">
                  Shorter than essays. Closer to the counter.
                </h2>
              </div>
              <Link href="/notes" className="link-quiet text-ink text-base">
                All field notes
              </Link>
            </div>

            <FadeRise>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {notes.map((note) => {
                  const d = new Date(note.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <li key={note.slug}>
                      <Link href={`/notes/${note.slug}`} className="group block">
                        <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                          {d}
                          {note.place ? ` · ${note.place}` : ""}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300">
                          {note.title}
                        </h3>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FadeRise>
          </Container>
        </section>
      ) : null}

      {/* 6. Email capture */}
      <EmailCaptureCTA />

      {/* 7. Newsletter */}
      <section className="py-24 md:py-32 border-t border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                Notes from the kitchen
              </p>
              <h2 className="font-display text-display-3 text-ink leading-tight">
                Quiet dispatches. New volumes. The occasional recipe note that
                didn't make the book.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <NewsletterForm
                label="Subscribe"
                placeholder="you@somewhere.com"
                buttonLabel="Send"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

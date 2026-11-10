import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allBooks } from "contentlayer/generated";
import { fitTitle, fitDescription } from "@/lib/seoMeta";
import { Container } from "@/components/layout/Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeRise } from "@/components/motion/FadeRise";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  alternates: { canonical: "/books" },
  title: "The Series",
  description: fitDescription(
    "The Borderless Kitchen cookbook series — each volume pairs two cuisines and finds what they already share. Tokyo Meets Tuscany and Seoul Meets Mexico City.",
  ),
};

import { TMT_AMAZON } from "@/lib/amazon";
import { SmmcPurchaseOptions } from "@/components/cta/SmmcPurchaseOptions";

export default function BooksPage() {
  const tmt = allBooks.find((b) => b.slug === "tokyo-meets-tuscany")!;
  const smmc = allBooks.find((b) => b.slug === "seoul-meets-mexico-city");
  const future = allBooks
    .filter((b) => b.status === "coming" && b.slug !== "seoul-meets-mexico-city")
    .sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100));

  return (
    <>
      <PageHero
        eyebrow="Borderless Kitchen Series"
        headline="Four kitchens. One conversation."
        dek="Each volume puts two cuisines in the same room and asks what they already have in common. The answer is always more than you'd think."
        src="/images/banner-books.png"
        alt="Editorial banner — Borderless Kitchen series."
      />

      {/* Volume I — TMT */}
      <section className="py-24 md:py-32">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Cover */}
              <div className="lg:col-span-5">
                {tmt.coverImageSrc ? (
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <Image
                      src={tmt.coverImageSrc}
                      alt={tmt.coverImageAlt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <EditorialImage
                    alt={tmt.coverImageAlt}
                    aspect="hero-portrait"
                    slot="tmt-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="lg:col-span-7 lg:pt-6">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">
                  Vol. I — Available now
                </p>
                <h2 className="font-display text-display-1 text-ink leading-tight">
                  {tmt.title}
                </h2>
                <p className="font-ui text-eyebrow uppercase text-ink/50 mt-3 mb-8">
                  {tmt.regionA} × {tmt.regionB}
                </p>
                <div className="font-body text-lg text-ink/80 leading-relaxed max-w-prose space-y-4">
                  <p>
                    Italian soul. Japanese precision. Two kitchens that share
                    more than they admit — both built on restraint, both reverent
                    of one good ingredient, both suspicious of decoration.
                  </p>
                  <p>
                    Thirty recipes. Half born in Tuscan farmhouses, half in Tokyo
                    apartments. All of them learned to belong to one another.
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-ink/50">
                    Paperback $19.99 · Kindle $9.99
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <AmazonCTA href={TMT_AMAZON} label="Buy on Amazon" />
                  <Link
                    href="/books/tokyo-meets-tuscany"
                    className="link-quiet text-ink text-base"
                  >
                    Inside the book
                  </Link>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Volume II — Seoul Meets Mexico City */}
      {smmc ? (
        <section className="py-24 md:py-32 border-t border-hairline bg-ink/[0.02]">
          <Container>
            <FadeRise>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="pt-6 lg:pt-0">
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">
                      Vol. II — Available now
                    </p>
                    <h2 className="font-display text-display-1 text-ink leading-tight">
                      {smmc.title}
                    </h2>
                    <p className="font-ui text-eyebrow uppercase text-ink/50 mt-3 mb-8">
                      {smmc.regionA} × {smmc.regionB}
                    </p>
                    <div className="font-body text-lg text-ink/80 leading-relaxed max-w-prose space-y-4">
                      <p>
                        Two cities that have built entire culinary cultures
                        around fermentation, heat, and the slow accumulation of
                        flavor. Kimchi and salsa. Doenjang and mole. Gochugaru
                        and chile de árbol.
                      </p>
                      <p>
                        Thirty recipes at the meeting point of those two
                        pantries. Not fusion. Convergence — two traditions
                        arriving at the same truth from opposite directions.
                      </p>
                    </div>
                    <div className="mt-10 flex flex-col gap-8 items-start">
                      {/* Paperback, Kindle, PDF — each labelled, so a buyer who
                          wants the physical book or the ebook can find it. This
                          used to be a single Gumroad link, which read as though
                          the illustrated PDF were the only edition in print. */}
                      <SmmcPurchaseOptions />
                      <Link
                        href="/books/seoul-meets-mexico-city"
                        className="link-quiet text-ink text-base"
                      >
                        Inside the book
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
                  {/* The 1000×1293 frame plus object-contain shows the whole
                      retail cover exactly as Amazon lists it. The old 3/4 frame
                      with object-cover cropped the artwork — the gold border and
                      the bottom of the plate were cut off, which is what made the
                      site's cover look like a different book from the listing's. */}
                  {smmc.coverImageSrc ? (
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "1000 / 1293" }}
                    >
                      <Image
                        src={smmc.coverImageSrc}
                        alt={smmc.coverImageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <EditorialImage
                      alt={smmc.coverImageAlt}
                      aspect="hero-portrait"
                      slot="smmc-cover"
                    />
                  )}
                </div>
              </div>
            </FadeRise>
          </Container>
        </section>
      ) : null}

      {/* Future volumes */}
      {future.length > 0 ? (
        <section className="py-24 md:py-32 border-t border-hairline">
          <Container>
            <p className="font-ui text-eyebrow uppercase text-ink/50 mb-12">
              Further volumes
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {future.map((book) => (
                <li key={book.slug}>
                  <article>
                    <EditorialImage
                      alt={book.coverImageAlt}
                      aspect="hero-portrait"
                      slot={`future-${book.slug}`}
                      src={book.coverImageSrc ?? null}
                    />
                    <div className="mt-5">
                      <p className="font-ui text-eyebrow uppercase text-ink/50 mb-2">
                        {book.regionA} × {book.regionB}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                        {book.title}
                      </h3>
                      <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                        Coming soon
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <EmailCaptureCTA />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeRise } from "@/components/motion/FadeRise";
import { GUMROAD_SMMC_PRICE, GUMROAD_SMMC_URL } from "@/lib/gumroad";
import { TMT_AMAZON } from "@/lib/amazon";
import { ETSY_SHOP_URL } from "@/lib/etsy";

/**
 * Every claim on this page is constrained to what public/flavor-pairing-matrix.pdf
 * actually contains: sixteen pairings across eight categories, one page
 * (verified 2026-11-07 by text extraction of the shipped PDF — its own header
 * reads "Eight categories, sixteen pairings, one page").
 *
 * Three things were removed on 2026-11-07 because they were not true:
 *   1. "47 substitution rules" and the imperatives built on it — no such 47-row
 *      asset has ever existed. The real chart has 16 rows.
 *   2. The "Umami Depth Chart", "Heat Level Reference" and "Acid Map" cards in
 *      WHAT_YOU_GET — none of these exist as separate documents.
 *   3. Three unattributed testimonials ("Newsletter subscriber", "Home cook,
 *      Austin TX", "Reader via Instagram") and a "690+ articles" counter. No
 *      evidence trail exists for any of them.
 *
 * Both capture forms previously had no successLink, so a subscriber who was
 * told the PDF "arrives immediately" received nothing at all. Both now link
 * the existing PDF directly.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/flavor-guide" },
  title: "Free: The Japanese–Italian Flavor Pairing Matrix",
  description:
    "The free one-page Flavor Pairing Matrix — sixteen Japanese–Italian substitutions across eight categories, each mapped by function rather than by taste. What to use when you are out of Parmigiano, guanciale, yuzu, mirin or katsuobushi.",
  openGraph: {
    title: "Free: The Japanese–Italian Flavor Pairing Matrix",
    description:
      "Sixteen substitutions across eight categories. One page, printable, free. The chart behind every recipe in Tokyo Meets Tuscany.",
    type: "website",
  },
};

/** Eight of the sixteen rows on the printed matrix — an honest preview. */
const MATRIX_PREVIEW = [
  {
    italian: "Parmigiano Reggiano",
    japanese: "White miso",
    why: "Miso is sweeter; reduce salt elsewhere",
  },
  {
    italian: "Anchovy in oil",
    japanese: "Katsuobushi flakes",
    why: "Both dissolve into the fat invisibly",
  },
  {
    italian: "Guanciale",
    japanese: "Pancetta + katsuobushi",
    why: "Katsuobushi adds oceanic smokiness",
  },
  {
    italian: "Pecorino Romano",
    japanese: "Shiro dashi",
    why: "Lower volume; stronger per gram",
  },
  {
    italian: "Spaghetti",
    japanese: "Ramen noodle",
    why: "Alkaline chew; holds sauce differently",
  },
  {
    italian: "White wine",
    japanese: "Dry sake",
    why: "Sake is lower in tannins; sweeter finish",
  },
  {
    italian: "Lemon zest + juice",
    japanese: "Yuzu",
    why: "More floral; more zest, less juice",
  },
  {
    italian: "Ricotta",
    japanese: "Silken tofu",
    why: "Drain tofu well; it wants more seasoning",
  },
];

const CATEGORIES = [
  "Umami",
  "Fat & cure",
  "Finishing salt",
  "Starch & crumb",
  "Acid & alcohol",
  "Citrus & herb",
  "Heat",
  "Body",
];

const DOWNLOAD = {
  href: "/flavor-pairing-matrix.pdf",
  label: "Download the matrix →",
};

export default function FlavorGuidePage() {
  return (
    <>
      {/* HERO — above the fold */}
      <section className="bg-ink text-paper pt-16 pb-0 md:pt-24">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-6 tracking-widest">
              Free Download — No Credit Card
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-4xl mb-8">
              The Flavor Pairing<br />
              <span className="text-vermillion italic">Matrix.</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper/70 max-w-2xl leading-relaxed mb-10">
              Sixteen Japanese–Italian substitutions across eight categories.
              Every pairing mapped by what the ingredient actually does — not by
              taste, not by vibe. One page. Printable. Free.
            </p>

            {/* Primary email capture — delivers the PDF on submit */}
            <div className="bg-paper/5 border border-paper/10 rounded-sm p-8 max-w-lg">
              <NewsletterForm
                label="Send it to my inbox — free"
                placeholder="your@email.com"
                buttonLabel="Get the Matrix →"
                successLink={DOWNLOAD}
              />
              <p className="mt-4 font-ui text-xs text-paper/30">
                No spam. Occasional notes on technique and flavor. Unsubscribe
                anytime.
              </p>
            </div>
          </FadeRise>

          {/* Facts strip — counts verified against the shipped PDF */}
          <div className="mt-16 pt-8 border-t border-paper/10 grid grid-cols-3 gap-8 max-w-2xl pb-16">
            {[
              { num: "16", label: "Pairings" },
              { num: "8", label: "Categories" },
              { num: "1", label: "Page" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-display text-4xl md:text-5xl text-paper font-bold mb-1">
                  {num}
                </p>
                <p className="font-ui text-eyebrow uppercase text-paper/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PREVIEW — what's inside */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4 tracking-widest">
              Inside the matrix
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-8 max-w-2xl">
              Eight categories, sixteen swaps.
            </h2>
            <p className="font-body text-lg text-ink/70 leading-relaxed mb-8 max-w-prose">
              Each row names the Italian ingredient, the Japanese ingredient that
              does the same job, and what changes when you make the swap — the
              salt, the sweetness, the fat, the finish.
            </p>
            <ul className="flex flex-wrap gap-3 mb-16">
              {CATEGORIES.map((c) => (
                <li
                  key={c}
                  className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2"
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* Preview table — 8 of the 16 printed rows */}
            <div className="mb-6">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-6 tracking-widest">
                8 of 16 rows — preview
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="text-left font-ui text-eyebrow uppercase py-3 pr-6 text-ink/60">
                        Italian
                      </th>
                      <th className="text-left font-ui text-eyebrow uppercase py-3 pr-6 text-ink/60">
                        Japanese
                      </th>
                      <th className="text-left font-ui text-eyebrow uppercase py-3 text-ink/60 hidden md:table-cell">
                        What changes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATRIX_PREVIEW.map(({ italian, japanese, why }) => (
                      <tr key={italian} className="border-b border-ink/10">
                        <td className="py-4 pr-6 font-body font-bold text-ink">
                          {italian}
                        </td>
                        <td className="py-4 pr-6 font-body text-ink/80">
                          {japanese}
                        </td>
                        <td className="py-4 font-body text-ink/60 hidden md:table-cell">
                          {why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 font-ui text-xs text-ink/40 italic">
                  The other eight rows — togarashi, sansho, furikake, panko,
                  gremolata, pine nuts, balsamic and chicken stock — are on the
                  PDF.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* SECOND CTA */}
      <section className="bg-paper py-20 md:py-28 border-t border-hairline">
        <Container>
          <FadeRise>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
                Get the matrix.
                <br />
                <span className="text-vermillion italic">
                  Swap with a reason.
                </span>
              </h2>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-10">
                Enter your email and the one-page PDF is right here to download.
                The kind of thing you print out and tape to the inside of a
                cabinet door.
              </p>
              <div className="flex justify-center">
                <NewsletterForm
                  label="Free — no catch"
                  placeholder="your@email.com"
                  buttonLabel="Send it →"
                  successLink={DOWNLOAD}
                />
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* WHAT TO DO NEXT — existing products, existing destinations */}
      <section className="bg-ink text-paper py-16 md:py-20">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-8 tracking-widest">
              If the matrix is useful
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
              <div className="border border-paper/10 p-8">
                <p className="font-display text-xl text-paper mb-3 leading-tight">
                  Tokyo Meets Tuscany
                </p>
                <p className="font-body text-sm text-paper/60 leading-relaxed mb-5">
                  The matrix came out of Vol. I — thirty recipes and six master
                  sauces built on this same system.
                </p>
                <a
                  href={TMT_AMAZON}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-eyebrow uppercase text-vermillion text-xs hover:text-paper transition-colors"
                >
                  Vol. I on Amazon →
                </a>
              </div>
              <div className="border border-paper/10 p-8">
                <p className="font-display text-xl text-paper mb-3 leading-tight">
                  Seoul Meets Mexico City
                </p>
                <p className="font-body text-sm text-paper/60 leading-relaxed mb-5">
                  The same logic across Korean and Mexican cooking — gochujang
                  against chile, doenjang against masa. Illustrated PDF,{" "}
                  {GUMROAD_SMMC_PRICE}.
                </p>
                <a
                  href={GUMROAD_SMMC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-eyebrow uppercase text-vermillion text-xs hover:text-paper transition-colors"
                >
                  Vol. II on Gumroad →
                </a>
              </div>
              <div className="border border-paper/10 p-8">
                <p className="font-display text-xl text-paper mb-3 leading-tight">
                  Printable planning kits
                </p>
                <p className="font-body text-sm text-paper/60 leading-relaxed mb-5">
                  Fillable weekly menus, cook-ahead sheets and hosting checklists
                  — six of them, sold through our Etsy shop.
                </p>
                <a
                  href={ETSY_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-eyebrow uppercase text-vermillion text-xs hover:text-paper transition-colors"
                >
                  The Etsy shop →
                </a>
              </div>
            </div>
            <p className="font-ui text-eyebrow uppercase text-paper/30 text-xs mt-10">
              Or keep reading:{" "}
              <Link
                href="/free"
                className="text-paper/60 hover:text-vermillion transition-colors"
              >
                free recipes
              </Link>{" "}
              ·{" "}
              <Link
                href="/mini-course"
                className="text-paper/60 hover:text-vermillion transition-colors"
              >
                the five-day course
              </Link>
            </p>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { PRINTABLES, etsyUrl, ETSY_SHOP_URL } from "@/lib/etsy";

export const metadata: Metadata = {
  title: "Kitchen Printables",
  alternates: { canonical: "/printables" },
  description:
    "Fillable planners for the parts of cooking that are logistics rather than recipes — the week, the batch, the dinner party, the holiday oven. Print at home or type into them on screen.",
  openGraph: {
    title: "Borderless Kitchen Printables",
    description:
      "Planners for the logistics half of cooking: the week, the batch, the dinner party, and the holiday oven. Fillable PDFs, instant download.",
    type: "website",
    url: "/printables",
    images: [
      {
        url: "/images/banner-carousel-1.png",
        width: 1200,
        height: 630,
        alt: "Borderless Kitchen kitchen printables",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/banner-carousel-1.png"] },
};

export default function PrintablesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper py-20 md:py-32">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-6">
              Printables
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl mb-6">
              The half of cooking that isn&rsquo;t the recipe.
            </h1>
            <p className="font-body text-lg text-paper/70 max-w-2xl leading-relaxed">
              Nobody&rsquo;s dinner falls apart because the recipe was wrong. It
              falls apart because two things needed the oven at once, or the
              shopping list was written from memory, or the plan assumed a good
              day. These are the sheets for that.
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* The argument */}
      <section className="py-16 md:py-24">
        <Container wide={false}>
          <FadeRise>
            <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
              Every recipe in the Borderless Kitchen books was tested on its own,
              at its own temperature, with someone&rsquo;s full attention. That is
              how recipes have to be written and it is never how a meal is
              actually cooked. The gap between the two is timing, rack space and
              a shopping list &mdash; and none of it belongs in a cookbook.
            </p>
            <p className="font-body text-base text-ink/80 leading-relaxed">
              So it lives here instead. Each one is a fillable PDF: print it, or
              type straight into it on screen. Nothing is dated, so none of it
              expires.
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* The list */}
      <section className="pb-8">
        <Container>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
            {PRINTABLES.map((p, i) => (
              <li key={p.id} className="bg-paper">
                <FadeRise delay={i * 0.05}>
                  <div className="p-8 md:p-10 h-full flex flex-col">
                    <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                      {p.pages} pages
                      {p.fillable ? " · Fillable" : ""}
                    </p>
                    <h2 className="font-display text-2xl text-ink mb-4 leading-snug">
                      {p.title}
                    </h2>
                    <p className="font-body text-sm text-ink/70 leading-relaxed mb-8 flex-1">
                      {p.pitch}
                    </p>
                    <a
                      href={etsyUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 self-start hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                    >
                      Get it on Etsy
                    </a>
                  </div>
                </FadeRise>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Fine print + the free alternative, stated plainly */}
      <section className="py-16 md:py-24">
        <Container wide={false}>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
              Before you buy anything
            </p>
            <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
              There are{" "}
              <Link
                href="/free"
                className="text-ink border-b border-ink hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                nineteen free recipes and the Flavor Pairing Matrix
              </Link>{" "}
              on this site, no signup required for the recipes. Start there. The
              printables above solve a different problem &mdash; planning, not
              cooking &mdash; and they are worth exactly nothing to you if the
              planning is not where your week actually breaks.
            </p>
            <p className="font-body text-sm text-ink/60 leading-relaxed">
              Checkout, delivery and any refunds are handled by Etsy, not by us.
              Each file downloads immediately after purchase. Nothing is shipped.{" "}
              <a
                href={ETSY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/80 border-b border-ink/40 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                See the whole shop
              </a>
              .
            </p>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

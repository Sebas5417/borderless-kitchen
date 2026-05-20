import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sebastian Dri is the creator of the Borderless Kitchen series — cookbooks built on the idea that great cooking isn't limited by geography.",
};

const TMT_AMAZON = process.env.NEXT_PUBLIC_AMAZON_URL_TMT ?? "https://www.amazon.com/dp/B0GY8H2TCQ";

export default function AboutPage() {
  return (
    <>
      {/* Full-bleed portrait hero */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "80vh" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero-chef.png"
            alt="Sebastian Dri in the kitchen — steam rising from a cast iron pan."
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/80 via-charcoal-deep/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "80vh" }}>
          <Container className="pb-16 md:pb-24 pt-40">
            <p className="font-ui text-eyebrow uppercase text-paper/50 mb-4">
              Sebastian Dri
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl">
              Great cooking isn't limited by geography.
            </h1>
          </Container>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 md:py-32">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Author note — modeled on the book's back matter */}
              <div className="lg:col-span-7">
                <div className="max-w-prose space-y-6 font-body text-lg text-ink/90 leading-relaxed">
                  <p>
                    Sebastian Dri is the creator of the Borderless Kitchen
                    series, built on the idea that great cooking isn't limited by
                    geography. The approach focuses on structure, bold flavor, and
                    making fusion feel intentional instead of chaotic.
                  </p>
                  <p>
                    The best meals he's encountered across a lifetime of eating in
                    strange places and beautiful places and places nobody would
                    think to look — none of them knew where they came from. They
                    knew what they wanted. They wanted to feed you well, and they
                    did it without apology.
                  </p>
                  <p>
                    That conviction is what the Borderless Kitchen series is
                    built on. Not that cuisines should be blended carelessly, but
                    that the lines between them were always more porous than the
                    cookbooks suggested — and that reading those lines carefully
                    produces something more interesting than ignoring them.
                  </p>
                  <p>
                    You won't find confusion here. You'll find clarity, contrast,
                    and dishes that actually work.
                  </p>
                </div>
              </div>

              {/* Portrait + aside */}
              <div className="lg:col-span-5">
                <div
                  className="relative overflow-hidden mb-8"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src="/images/sebastian-portrait.png"
                    alt="Sebastian Dri — author of the Borderless Kitchen series."
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                      The series
                    </p>
                    <p className="font-body text-sm text-ink/70 leading-relaxed">
                      Four volumes. Four collisions between cuisines that already
                      share more than they admit. Vol. I — Tokyo Meets Tuscany —
                      is live now. Vol. II — Seoul Meets Mexico City — is in
                      progress.
                    </p>
                  </div>
                  <div className="pt-4">
                    <AmazonCTA href={TMT_AMAZON} label="Get Vol. I on Amazon" />
                    <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
                      Paperback $24.99 · Hardcover $34.99 · eBook $9.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28 border-t border-hairline bg-ink/[0.02]">
        <Container>
          <FadeRise>
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-8">
                The philosophy
              </p>
              <blockquote>
                <p className="font-display italic text-display-2 text-ink leading-tight">
                  "Italian soul. Japanese precision. Flavor built with intention."
                </p>
              </blockquote>
              <p className="font-body text-lg text-ink/60 mt-10 max-w-prose mx-auto leading-relaxed">
                This series is not about erasing the lines between cuisines. It's
                about reading them — and discovering that the lines were always
                more porous than the cookbooks suggested.
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>

      <EmailCaptureCTA
        heading="Stay close to the kitchen."
        body="New volumes, stories from the counter, and the occasional thing that didn't make it into the book."
        cta="free.borderlesskitchenseries.com →"
      />
    </>
  );
}

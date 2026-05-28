import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sebastian Dri is the author of the Borderless Kitchen cookbook series. Cross-cultural cooking grounded in technique, restraint, and the conversation between cuisines.",
};

const TMT_AMAZON = process.env.NEXT_PUBLIC_AMAZON_URL_TMT ?? "https://www.amazon.com/dp/B0GY8H2TCQ";

export default function AboutPage() {
  return (
    <>
      {/* Full-bleed portrait hero */}
      <section className="relative bg-charcoal-deep overflow-hidden" style={{ minHeight: "80vh" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/banner-about.png"
            alt="Sebastian Dri in the kitchen — steam rising from a cast iron pan."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
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
              Flavor never needed borders.
            </h1>
            <p className="font-display italic text-xl md:text-2xl text-paper/70 mt-6 max-w-xl leading-snug">
              Cookbooks built on one idea: the best flavors never needed a
              passport.
            </p>
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
                    Sebastian Dri is the author of the Borderless Kitchen
                    series. The work starts with one idea: cuisines were never
                    as separated as cookbooks often pretend they are.
                  </p>
                  <p>
                    The approach is simple. Bold flavor. Strong structure.
                    Fusion that feels intentional instead of forced. Not
                    gimmicks. Not chaos. Dishes that make sense the moment you
                    taste them.
                  </p>
                  <p>
                    The best meals he's eaten weren't trying to impress anyone
                    — tiny kitchens, roadside places, towns most people pass
                    through without slowing down. What those meals shared
                    wasn't authenticity in the marketing sense. It was
                    confidence. They knew what they were doing, and they did
                    it well.
                  </p>
                  <p>
                    That became the foundation for the series. Techniques
                    travel. Ingredients evolve. Flavor crosses oceans long
                    before anyone gives it permission to. Once you read the
                    structure underneath a cuisine — the salt, the acid, the
                    heat, the patience — you can hold two of them next to each
                    other and hear the same conversation.
                  </p>
                  <p>
                    The recipes are written for real kitchens. Clear over
                    clever. Bold over decorative. No trend-chasing. Dishes
                    worth cooking twice.
                  </p>
                </div>
              </div>

              {/* Portrait + aside */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                <div
                  className="relative overflow-hidden rounded-xl mb-8 w-full max-w-[360px]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src="/images/author-photo.png"
                    alt="Sebastian Dri — author of the Borderless Kitchen series."
                    fill
                    sizes="(min-width: 1024px) 360px, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                      The series
                    </p>
                    <p className="font-body text-sm text-ink/70 leading-relaxed">
                      Four volumes. Four pairings of cuisines that already share
                      more than they admit. Vol.&nbsp;I — Tokyo Meets Tuscany —
                      is out. Vol.&nbsp;II — Seoul Meets Mexico City — is in
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
                The series isn't about erasing the lines between cuisines. It's
                about reading them — and noticing they were always more porous
                than the cookbooks pretended.
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

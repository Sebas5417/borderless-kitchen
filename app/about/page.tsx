import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sebastian Dri — former FWC officer, boat captain, and the creator of the Borderless Kitchen series.",
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
            alt="Sebastian Dri cooking in a professional kitchen — steam rising from a pan."
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
              The kitchen has always been a border crossing.
            </h1>
          </Container>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 md:py-32">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Main bio text */}
              <div className="lg:col-span-7">
                <div className="max-w-prose space-y-6 font-body text-lg text-ink/90 leading-relaxed">
                  <p>
                    I grew up in Mamaroneck, New York — a suburb north of the
                    city that exists in a perpetual argument with itself about
                    whether it's a real place or just where people go when
                    Manhattan gets too expensive. My family is Argentinian. The
                    table had asado, empanadas, dulce de leche in the fridge next
                    to someone else's leftover pasta, and a general attitude that
                    food didn't need to explain itself — it needed to feed you.
                  </p>
                  <p>
                    I spent years on the water after that. FWC officer. Boat
                    captain. Work that puts you outdoors, in motion, eating what's
                    local and fast and honest. Fishing boats at 5 a.m. have
                    excellent kitchens — not in size, but in clarity. You cook
                    what you caught. You season what you have. Nobody performs.
                  </p>
                  <p>
                    I came to writing and entrepreneurship later than most books
                    tell you to. My daughter Sofia was twelve when I started the
                    Borderless Kitchen project. She's fourteen now and she still
                    tells me when something doesn't taste right. She is, as it
                    turns out, the most reliable editor I have.
                  </p>
                  <p>
                    The premise of this series is not complicated: the best food
                    I've eaten across a career of eating in strange places and
                    beautiful places and places nobody would think to look —
                    none of it knew where it came from. It knew what it wanted.
                    It wanted to feed you well.
                  </p>
                  <p>
                    That's the only border that matters.
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
                    alt="Sebastian Dri — three portraits: in chef whites, cooking, and relaxed with fresh herbs."
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
                      is live now. Vol. II — San Miguel Meets Cancún — is in
                      progress.
                    </p>
                  </div>
                  <div className="pt-4">
                    <AmazonCTA href={TMT_AMAZON} label="Get Vol. I on Amazon" />
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

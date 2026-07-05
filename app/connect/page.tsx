import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { FadeRise } from "@/components/motion/FadeRise";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Notes from the kitchen — the free starter guide, news on new Borderless Kitchen volumes, and the occasional recipe note that didn't make the book.",
};

import { TMT_AMAZON } from "@/lib/amazon";

export default function ConnectPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect"
        headline="Stay close to the kitchen."
        dek="New volumes, essays from the counter, and the occasional recipe note that didn't make the book."
        src="/images/banner-connect.png"
        alt="Editorial banner — connect with Borderless Kitchen."
      />
      <section className="py-20 md:py-32">
      <Container>
        <FadeRise>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left */}
            <div className="lg:col-span-5">
              <div className="space-y-5 font-body text-lg text-ink/70 leading-relaxed max-w-prose">
                <p>
                  New volumes, essays from the counter, and the occasional recipe
                  note that didn't make the book. Infrequent. Worth it.
                </p>
                <p>
                  Or get the free starter guide — five pantry ingredients and
                  three techniques that unlock both cuisines.
                </p>
              </div>

              {/* Free guide link */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                  Free starter guide
                </p>
                <a
                  href="https://free.borderlesskitchenseries.com"
                  className="font-display italic text-xl text-ink hover:text-vermillion transition-colors duration-300"
                >
                  free.borderlesskitchenseries.com →
                </a>
              </div>

              {/* Book */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                  Vol. I — Available now
                </p>
                <AmazonCTA href={TMT_AMAZON} label="Get Tokyo Meets Tuscany" />
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
                  Paperback $24.99 · Hardcover $34.99 · eBook $9.99
                </p>
              </div>

              {/* Vol II tease */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                  Vol. II — Coming soon
                </p>
                <p className="font-body text-base text-ink/70">
                  Seoul Meets Mexico City. Fermented depth meets layered heat.
                </p>
                <a
                  href="https://free.borderlesskitchenseries.com"
                  className="inline-block mt-3 font-ui text-eyebrow uppercase text-ink border-b border-ink/40 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                >
                  Notify me when it drops →
                </a>
              </div>
            </div>

            {/* Right — newsletter form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="bg-ink/[0.03] border border-hairline p-10 md:p-12">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-6">
                  Notes from the kitchen
                </p>
                <h2 className="font-display text-display-3 text-ink leading-tight mb-8">
                  What doesn't fit inside the book continues here.
                </h2>
                <NewsletterForm
                  label="Your email"
                  placeholder="you@somewhere.com"
                  buttonLabel="Subscribe"
                />
                <p className="font-ui text-xs text-ink/40 mt-6">
                  No spam. No weekly blasts. Infrequent and worth your time.
                </p>
              </div>
            </div>
          </div>
        </FadeRise>
      </Container>
      </section>
    </>
  );
}

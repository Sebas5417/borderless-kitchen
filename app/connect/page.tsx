import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get the free starter guide, follow the series, or drop a line.",
};

const TMT_AMAZON = process.env.NEXT_PUBLIC_AMAZON_URL_TMT ?? "https://www.amazon.com/dp/B0GY8H2TCQ";

export default function ConnectPage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <FadeRise>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left */}
            <div className="lg:col-span-5">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
                Connect
              </p>
              <h1 className="font-display text-display-2 text-ink leading-tight">
                Stay close to the kitchen.
              </h1>
              <div className="mt-8 space-y-5 font-body text-lg text-ink/70 leading-relaxed max-w-prose">
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
                  Paperback $24.99 · eBook $9.99
                </p>
              </div>

              {/* Vol II tease */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                  Vol. II — Coming soon
                </p>
                <p className="font-body text-base text-ink/70">
                  San Miguel Meets Cancún. Colonial restraint meets coastal fire.
                  Subscribe to be notified.
                </p>
              </div>
            </div>

            {/* Right — newsletter form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="bg-ink/[0.03] border border-hairline p-10 md:p-12">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-6">
                  Letters from the kitchen
                </p>
                <h2 className="font-display text-display-3 text-ink leading-tight mb-8">
                  Quiet dispatches. New volumes. The occasional recipe note that
                  didn't make the book.
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
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { FadeRise } from "@/components/motion/FadeRise";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  alternates: { canonical: "/connect" },
  title: "Connect",
  description:
    "Notes from the kitchen — new Borderless Kitchen volumes, essays from the counter, and the occasional recipe note that didn't make the book.",
};

import { TMT_AMAZON } from "@/lib/amazon";
import { GUMROAD_SMMC_URL, GUMROAD_SMMC_PRICE } from "@/lib/gumroad";

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
                {/* Corrected 2026-11-08. This promised three recipes "sent by
                    email". The destination (free.borderlesskitchenseries.com)
                    is a separate lead page whose email delivery we cannot
                    verify, so the inbox promise is removed. Points at the
                    sampler served from this site, which downloads directly. */}
                <p>
                  Or start with the free Seoul Meets Mexico City sampler — a
                  printable PDF you can download right now, no email address
                  needed.
                </p>
              </div>

              {/* Free recipes link */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                  Free sampler
                </p>
                <Link
                  href="/free/seoul-meets-mexico-city"
                  className="font-display italic text-xl text-ink hover:text-vermillion transition-colors duration-300"
                >
                  Read the Seoul Meets Mexico City sampler →
                </Link>
              </div>

              {/* Book */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
                  Vol. I — Available now
                </p>
                <AmazonCTA href={TMT_AMAZON} label="Get Tokyo Meets Tuscany" />
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
                  Paperback $19.99 · Kindle $9.99
                </p>
              </div>

              {/* Vol II */}
              <div className="mt-10 pt-8 border-t border-hairline">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-2">
                  Vol. II — Out now
                </p>
                <p className="font-body text-base text-ink/70">
                  Seoul Meets Mexico City. Fermented depth meets layered heat.
                </p>
                <a
                  href={GUMROAD_SMMC_URL}
                  className="mt-3 inline-block font-ui text-eyebrow uppercase text-ink border border-ink/40 px-5 py-3 hover:bg-ink hover:text-paper transition-colors duration-300"
                >
                  Get the illustrated PDF — {GUMROAD_SMMC_PRICE} →
                </a>
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
                  Illustrated edition · instant PDF download
                </p>
                {/* Added 2026-11-10: the PDF is one of three editions. Link
                    out to the book page rather than duplicating the Amazon CTAs. */}
                <p className="font-ui text-eyebrow uppercase text-ink/40 mt-2">
                  <Link
                    href="/seoul-meets-mexico-city"
                    className="underline hover:text-vermillion transition-colors"
                  >
                    Paperback and Kindle on Amazon — all three editions →
                  </Link>
                </p>
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

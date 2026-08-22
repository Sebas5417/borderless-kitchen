import type { Metadata } from "next";
import Link from "next/link";
import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";

/**
 * The landing page for @_borderlesskitchen traffic.
 *
 * Every recipe caption on the account ends "Comment RECIPE and I'll DM you the
 * full recipe / Full cookbook link in bio" — and the bio pointed at a Linktree,
 * which answers neither half of that promise. This page does: the free pack up
 * top, the books directly under it.
 *
 * noindex on purpose. It duplicates copy from /free and the two book pages;
 * letting Google index it would just split the ranking signal.
 */
export const metadata: Metadata = {
  title: "Welcome from Instagram — Your Free Fusion Recipe Pack",
  description:
    "The three fusion recipes we promised, plus both Borderless Kitchen cookbooks — Tokyo Meets Tuscany and Seoul Meets Mexico City.",
  robots: { index: false, follow: true },
};

const GUMROAD_SMMC = "https://facelesschannel.gumroad.com/l/dqnqe";
const GUMROAD_PLAYBOOK = "https://facelesschannel.gumroad.com/l/uycpjs";

const STARTER_RECIPES = [
  {
    slug: "gochujang-pasta",
    name: "Gochujang Pasta",
    note: "Korean chile paste where the 'nduja would go. Twenty minutes.",
  },
  {
    slug: "doenjang-carbonara",
    name: "Doenjang Carbonara",
    note: "Fermented soybean paste doing the pecorino's job. No cream, ever.",
  },
  {
    slug: "birria-ramen",
    name: "Birria Ramen",
    note: "The consommé is the broth. This is the one people message about.",
  },
];

export default function InstagramPage() {
  return (
    <>
      {/* ── The promise, kept ─────────────────────────────────────────── */}
      <section className="bg-charcoal-deep text-paper pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
              Welcome from Instagram
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl">
              Here&rsquo;s the recipe pack.
            </h1>
            <p className="font-body text-lg text-paper/75 mt-6 max-w-prose leading-relaxed">
              Three full recipes from the Borderless Kitchen series — ingredients,
              method, the ratios that actually matter. No paywall, no upsell page
              in between. Drop your email and they land in your inbox.
            </p>
          </FadeRise>

          <FadeRise>
            <div className="mt-10">
              <SubscribeForm
                list="smmc"
                dark
                label="Send them to"
                buttonLabel="Send the pack"
                successMessage="Sent. Check your inbox — and your spam folder, once."
                successLink={{ href: "/free", label: "Start reading now →" }}
              />
              <p className="font-ui text-xs text-paper/40 mt-4">
                One email with the recipes. A short note most weeks. Unsubscribe
                whenever.
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* ── What's in the pack ───────────────────────────────────────── */}
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-ink/50 mb-8">
              What you&rsquo;re getting
            </p>
          </FadeRise>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STARTER_RECIPES.map((recipe) => (
              <FadeRise key={recipe.slug}>
                <article>
                  <h2 className="font-display text-display-3 text-ink leading-tight">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="hover:text-vermillion transition-colors duration-300"
                    >
                      {recipe.name}
                    </Link>
                  </h2>
                  <p className="font-body text-base text-ink/70 mt-3 leading-relaxed">
                    {recipe.note}
                  </p>
                </article>
              </FadeRise>
            ))}
          </div>
          <FadeRise>
            <p className="font-body text-base text-ink/60 mt-12 max-w-prose">
              There are{" "}
              <Link
                href="/recipes"
                className="text-vermillion border-b border-vermillion/40 hover:border-vermillion transition-colors duration-300"
              >
                dozens more free recipes
              </Link>{" "}
              on the site. The books are where the system lives.
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* ── The books ────────────────────────────────────────────────── */}
      <section className="bg-ink text-paper py-16 md:py-24">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/50 mb-4">
              The cookbooks
            </p>
            <h2 className="font-display text-display-2 text-paper leading-tight max-w-2xl">
              Two food cultures, same pan, on purpose.
            </h2>
            <p className="font-body text-base text-paper/70 mt-5 max-w-prose leading-relaxed">
              Not fusion for novelty. Every dish has to earn its place on both
              sides of the border it crosses.
            </p>
          </FadeRise>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
            <FadeRise>
              <article className="border-t border-paper/20 pt-6">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">
                  Vol. I
                </p>
                <h3 className="font-display text-display-3 text-paper leading-tight">
                  Tokyo Meets Tuscany
                </h3>
                <p className="font-body text-base text-paper/70 mt-4 leading-relaxed">
                  Japanese technique against Italian tradition — dashi risotto,
                  miso ragù, doenjang cacio e pepe. The book that started the
                  series.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <AmazonCTA
                    href={TMT_AMAZON}
                    label="Buy the paperback"
                    className="!text-paper !border-paper hover:!text-vermillion hover:!border-vermillion"
                  />
                  <Link
                    href="/tokyo-meets-tuscany"
                    className="inline-flex items-center font-ui text-eyebrow uppercase text-paper/60 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                  >
                    Read a sample
                  </Link>
                </div>
              </article>
            </FadeRise>

            <FadeRise>
              <article className="border-t border-paper/20 pt-6">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">
                  Vol. II — out now
                </p>
                <h3 className="font-display text-display-3 text-paper leading-tight">
                  Seoul Meets Mexico City
                </h3>
                <p className="font-body text-base text-paper/70 mt-4 leading-relaxed">
                  Thirty recipes and six master sauces where Korean fermentation
                  meets Mexican fire — birria ramyeon, elote bibimbap, gochugaru
                  albóndigas.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <AmazonCTA
                    href={SMMC_AMAZON}
                    label="Buy the paperback"
                    className="!text-paper !border-paper hover:!text-vermillion hover:!border-vermillion"
                  />
                  <a
                    href={GUMROAD_SMMC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-ui text-eyebrow uppercase text-paper/60 border-b border-paper/30 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
                  >
                    Digital edition — $19
                  </a>
                </div>
              </article>
            </FadeRise>
          </div>

          <FadeRise>
            <div className="mt-16 border-t border-paper/20 pt-8 md:flex md:items-end md:justify-between md:gap-10">
              <div>
                <p className="font-ui text-eyebrow uppercase text-paper/50 mb-3">
                  Not ready for a whole book?
                </p>
                <h3 className="font-display text-display-3 text-paper leading-tight">
                  The Fusion Flavor Playbook
                </h3>
                <p className="font-body text-base text-paper/70 mt-3 max-w-prose leading-relaxed">
                  The pairing logic on its own — which ingredients swap for which
                  across cuisines, and why it works. Thirty pages, no filler.
                </p>
              </div>
              <a
                href={GUMROAD_PLAYBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 md:mt-0 inline-flex shrink-0 items-center font-ui text-eyebrow uppercase text-paper border-b border-paper pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
              >
                Get it — $12
              </a>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* ── Back to the feed ─────────────────────────────────────────── */}
      <section className="bg-paper py-14 md:py-16">
        <Container>
          <FadeRise>
            <p className="font-body text-base text-ink/70 max-w-prose leading-relaxed">
              Comment <strong className="text-ink">RECIPE</strong> on any post and
              we&rsquo;ll send the full method. Everything else lives{" "}
              <Link
                href="/"
                className="text-vermillion border-b border-vermillion/40 hover:border-vermillion transition-colors duration-300"
              >
                here on the site
              </Link>
              .
            </p>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

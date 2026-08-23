import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Day 1: Dashi — The Invisible Foundation | Fusion Kitchen Mini-Course",
  description:
    "Make ichiban dashi from scratch. Understand why kombu and katsuobushi together produce more umami than any other combination. The foundation of everything in this course.",
};

export default function Day1Page() {
  return (
    <>
      {/* Course breadcrumb */}
      <div className="border-b border-hairline py-4">
        <Container>
          <div className="flex items-center gap-3 font-ui text-eyebrow uppercase text-ink/40 text-xs">
            <Link href="/mini-course" className="hover:text-vermillion transition-colors">
              Mini-Course
            </Link>
            <span>→</span>
            <span className="text-vermillion">Day 1 of 5</span>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-hairline bg-ink text-paper">
        <Container>
          <FadeRise>
            <div className="max-w-3xl">
              <p className="font-ui text-eyebrow uppercase text-vermillion mb-4 tracking-widest">
                Day 1 — The Foundation
              </p>
              <h1 className="font-display text-display-1 text-paper leading-none mb-6">
                Dashi.
              </h1>
              <p className="font-body text-xl text-paper/70 leading-relaxed max-w-2xl">
                The invisible backbone of Japanese cooking. Every great Japanese dish — and every Japanese-Italian fusion dish in this course — starts here. You cannot substitute dashi. You can only make it.
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 border-b border-hairline">
        <Container>
          <div className="max-w-prose mx-auto">
            <FadeRise>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                What you're making today.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                <strong>Ichiban dashi</strong> — first dashi. The clearest, most refined expression of the two-ingredient umami system. You'll make it, taste it plain, and then use it in a simple miso soup. After today, every dish you cook is built on something you understand from the ground up.
              </p>

              {/* Recipe card */}
              <div className="border border-hairline p-8 md:p-10 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">Ichiban Dashi Recipe</p>

                <div className="mb-8">
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">What you need</p>
                  <ul className="space-y-2">
                    {[
                      "1 liter (4 cups) cold water",
                      "20g kombu (about a 10cm / 4-inch piece)",
                      "20g katsuobushi (dried bonito flakes, loosely packed)",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-ui text-vermillion shrink-0">—</span>
                        <p className="font-body text-base text-ink/80">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">Method</p>
                  <ol className="space-y-6">
                    {[
                      {
                        step: "01",
                        instruction: "Place the kombu in cold water. Let it soak for at least 30 minutes — overnight in the fridge is better. The water will turn pale gold.",
                      },
                      {
                        step: "02",
                        instruction: "Bring the water to a gentle heat over medium. Watch closely — you want it to reach about 60°C (140°F), which is just before simmering. Small bubbles will begin forming on the kombu.",
                      },
                      {
                        step: "03",
                        instruction: "Remove the kombu just before the water boils. Do not boil kombu — it releases bitter, slimy compounds. The kombu's job is done.",
                      },
                      {
                        step: "04",
                        instruction: "Bring the liquid to a full simmer. Add all the katsuobushi at once. Do not stir. Let it steep for exactly 2 minutes.",
                      },
                      {
                        step: "05",
                        instruction: "Remove from heat. Let the katsuobushi settle to the bottom (about 1 minute). Strain through a fine mesh strainer or cheesecloth. Do not squeeze — just let it drain. The liquid is ichiban dashi.",
                      },
                      {
                        step: "06",
                        instruction: "Taste it immediately, while warm and fresh. It should be lightly golden, with a clean oceanic depth and a subtle sweetness. If it tastes flat, your kombu was too old — replace it next time.",
                      },
                    ].map(({ step, instruction }) => (
                      <li key={step} className="flex gap-6">
                        <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">{step}</span>
                        <p className="font-body text-base text-ink/80 leading-relaxed">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Why this works.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                Dashi is the clearest demonstration of <strong>umami synergy</strong> in cooking. Kombu contains glutamates. Katsuobushi contains inosinate. When you combine them, the perceived umami isn't additive — it's multiplicative. Studies show the synergy between glutamate and inosinate can intensify umami perception by six to eight times compared to either ingredient alone.
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                This is why dashi tastes so much more complex than it has any right to, given that it contains only two ingredients and no fat, no acid, no salt. You are extracting pure umami from the most efficient possible source.
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-12">
                The Italian equivalent isn't a single ingredient — it's the combination of Parmigiano Reggiano (glutamate) with guanciale or anchovy (inosinate). Every great Roman pasta dish uses this synergy intuitively. Dashi just makes the system visible.
              </p>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                Now: make miso soup.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-8">
                Use the dashi you just made. This is the point of Day 1 — to taste the dashi in something, not just plain.
              </p>

              <div className="border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">Simple Miso Soup</p>
                <p className="font-body text-sm text-ink/60 mb-6">Serves 2</p>
                <ol className="space-y-4">
                  {[
                    "Bring 500ml of your dashi to a gentle simmer.",
                    "Add 2-3 tablespoons of white miso (shiro miso). Add the miso off the heat — never boil miso, it kills the live cultures and dulls the flavor. Use a small strainer or whisk to dissolve it fully.",
                    "Add 100g soft tofu (silken or medium-firm), cut into 1.5cm cubes. Warm gently for 1 minute.",
                    "Add 1 tablespoon dried wakame seaweed, rehydrated for 5 minutes in cold water, then drained. Stir in just before serving.",
                    "Taste. Adjust miso if needed. Serve in warmed bowls. Top with thinly sliced green onion.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="font-mono text-sm text-ink/30 shrink-0 pt-0.5">0{i + 1}</span>
                      <p className="font-body text-base text-ink/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-ink/[0.04] border border-hairline p-8 mb-12">
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">Today's key insight</p>
                <p className="font-display text-xl text-ink leading-relaxed">
                  "The dashi is invisible in the soup — you don't taste it separately, you only notice its absence. That's what a great stock does: it makes everything else taste more like itself."
                </p>
              </div>

              <h2 className="font-display text-display-2 text-ink mb-6 leading-tight">
                What to save for tomorrow.
              </h2>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-4">
                Save the spent kombu and katsuobushi. They are used in <strong>niban dashi</strong> (second dashi) — a weaker, earthier stock perfect for braising, noodle broths, and anything where a more rustic flavor profile is appropriate. Put them in a container of cold water in the fridge.
              </p>
              <p className="font-body text-base text-ink/80 leading-relaxed mb-12">
                Tomorrow (Day 2), you'll use your fresh ichiban dashi to make miso butter — and discover why miso and Parmigiano are structurally the same ingredient.
              </p>

              {/* Nav to Day 2 */}
              <div className="border-t border-hairline pt-10 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
                <div>
                  <p className="font-ui text-eyebrow uppercase text-ink/40 mb-1">Next</p>
                  <p className="font-display text-xl text-ink">Day 2: Miso — Where Fermented Depth Meets Italian Technique</p>
                </div>
                <Link
                  href="/mini-course/day-2"
                  className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300 shrink-0"
                >
                  Day 2 →
                </Link>
              </div>

            </FadeRise>
          </div>
        </Container>
      </section>

      {/* Email CTA */}
      <section className="py-16 md:py-20 bg-ink/[0.02] border-t border-hairline">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-2 gap-10 items-start max-w-3xl mx-auto">
              <div>
                <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Get all 5 days in your inbox</p>
                <p className="font-display text-display-3 text-ink leading-tight mb-4">
                  The complete course. Daily, for free.
                </p>
                <p className="font-body text-sm text-ink/60 leading-relaxed">
                  Sign up to receive each day as an email — with extra notes, shopping lists, and the printable reference cards. Or keep reading here. Either way, the content is free.
                </p>
              </div>
              <NewsletterForm
                label="Your email"
                placeholder="you@somewhere.com"
                buttonLabel="Send me the course"
              />
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="max-w-prose mx-auto">
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">Legal</p>
          <h1 className="font-display text-display-2 text-ink leading-tight mb-12">
            Terms of Use
          </h1>
          <div className="space-y-6 font-body text-base text-ink/80 leading-relaxed">
            <p>
              <strong>Last updated:</strong> January 2026
            </p>
            <p>
              This is the website for Borderless Kitchen, a cookbook series by
              Sebastian Dri. The content here — essays, recipe teasers,
              pantry entries, and writing — is original work and is protected
              by copyright.
            </p>
            <p>
              You are welcome to share, quote, and link to anything on this
              site with attribution. You may not reproduce full essays or
              recipe teasers without permission. To ask about licensing or
              reproduction, email{" "}
              <a
                href="mailto:hello@borderlesskitchenseries.com"
                className="text-vermillion hover:underline"
              >
                hello@borderlesskitchenseries.com
              </a>
              .
            </p>
            <p>
              The full recipes in the Borderless Kitchen books are protected
              intellectual property. Teasers on this site are summaries only —
              they do not constitute publication of the full method.
            </p>
            <p>
              This site is provided as-is. We make no warranties about
              uptime or accuracy. We are not responsible for third-party
              links, including the Amazon purchase page.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="max-w-prose mx-auto">
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">Legal</p>
          <h1 className="font-display text-display-2 text-ink leading-tight mb-12">
            Privacy Policy
          </h1>
          <div className="space-y-6 font-body text-base text-ink/80 leading-relaxed">
            <p>
              <strong>Last updated:</strong> January 2026
            </p>
            <p>
              Borderless Kitchen (<em>borderlesskitchenseries.com</em>) collects
              email addresses submitted voluntarily through the newsletter form on
              this site. We use these addresses only to send the newsletter and
              related updates. We do not sell, share, or rent your data to any
              third party.
            </p>
            <p>
              We do not use tracking cookies, behavioral analytics, or ad
              networks on this site. No analytics are active at launch.
            </p>
            <p>
              If you submitted your email and want it removed, email{" "}
              <a
                href="mailto:hello@borderlesskitchenseries.com"
                className="text-vermillion hover:underline"
              >
                hello@borderlesskitchenseries.com
              </a>{" "}
              and we will delete it within 48 hours.
            </p>
            <p>
              That's it. No fine print worth reading. We believe your data should
              stay yours.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

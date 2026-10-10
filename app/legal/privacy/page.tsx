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
              <strong>Last updated:</strong> October 2026
            </p>
            <p>
              Borderless Kitchen (<em>borderlesskitchenseries.com</em>) collects
              email addresses submitted voluntarily through the newsletter form.
              MailerLite processes these addresses to send the newsletter and
              related updates. We do not sell or rent email addresses.
            </p>
            <p>
              This site uses Google Analytics 4 to understand visits and site
              activity. Analytics may include pages viewed, referral source,
              browser and device details, and interactions such as Amazon book
              link clicks and successful newsletter signups. We do not send the
              email address entered in a form to Google Analytics. Google may use
              cookies or similar identifiers for analytics, depending on the
              measurement settings and your browser. For details, see{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-vermillion hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Google's Privacy Policy
              </a>
              .
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
          </div>
        </div>
      </Container>
    </section>
  );
}

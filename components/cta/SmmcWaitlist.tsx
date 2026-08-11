import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { SMMC_AMAZON } from "@/lib/amazon";

type Props = {
  /** Paper-on-ink styling for dark sections. Defaults to dark. */
  dark?: boolean;
};

/**
 * Seoul Meets Mexico City is live on Kindle — this block sells it and
 * captures email for the paperback launch, not a pre-release waitlist.
 */
export function SmmcWaitlist({ dark = true }: Props) {
  return (
    <div>
      <p
        className={`font-ui text-eyebrow uppercase mb-4 ${dark ? "text-paper/30" : "text-ink/40"}`}
      >
        Borderless Kitchen — Vol. II
      </p>
      <h2
        className={`font-display text-display-2 leading-tight mb-6 ${dark ? "text-paper" : "text-ink"}`}
      >
        Seoul Meets Mexico City — the Korean–Mexican collision. Out now on Amazon.
      </h2>
      <p
        className={`font-body text-lg leading-relaxed mb-6 max-w-prose ${dark ? "text-paper/60" : "text-ink/60"}`}
      >
        Gochujang and adobo. Kimchi and tacos. Doenjang and mole. Kindle
        $9.99 — paperback on the way.
      </p>
      <div className="mb-8">
        <AmazonCTA href={SMMC_AMAZON} label="Buy Seoul Meets Mexico City on Amazon →" className={dark ? "text-paper border-paper" : undefined} />
      </div>
      <SubscribeForm
        list="smmc"
        placeholder="your@email.com"
        buttonLabel="Notify me for the paperback"
        dark={dark}
        successMessage="You're on the list. We'll email you the moment the Seoul Meets Mexico City paperback ships."
      />
    </div>
  );
}

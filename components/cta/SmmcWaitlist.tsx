import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { SMMC_AMAZON } from "@/lib/amazon";

type Props = {
  /** Paper-on-ink styling for dark sections. Defaults to dark. */
  dark?: boolean;
};

/**
 * Seoul Meets Mexico City is fully published — Kindle since 2026-07-31, paperback
 * since 2026-08-11. This block sells it. It is not a waitlist and has not been one
 * for a while; the name is kept because two pages import it.
 *
 * Do not reintroduce "coming soon" / "notify me for the paperback" copy here. That
 * wording survived on this component and on 18 Instagram posts for weeks after the
 * book shipped, telling people they could not buy something they could.
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
        Gochujang and adobo. Kimchi and tacos. Doenjang and mole. Thirty recipes
        and six master sauces, in paperback and on Kindle.
      </p>
      <div className="mb-8">
        <AmazonCTA href={SMMC_AMAZON} label="Buy Seoul Meets Mexico City on Amazon →" className={dark ? "text-paper border-paper" : undefined} />
      </div>
      <SubscribeForm
        list="smmc"
        placeholder="your@email.com"
        buttonLabel="Send me recipes"
        dark={dark}
        successMessage="You're on the list. Free Korean-Mexican recipes are on the way."
      />
    </div>
  );
}

import { SubscribeForm } from "@/components/forms/SubscribeForm";

type Props = {
  /** Paper-on-ink styling for dark sections. Defaults to dark. */
  dark?: boolean;
};

/**
 * Slim Seoul Meets Mexico City waitlist block. Vol. II is not for sale —
 * coming-soon copy and an email capture only, never a buy link or price.
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
        Seoul Meets Mexico City — the Korean–Mexican collision. Coming soon.
      </h2>
      <p
        className={`font-body text-lg leading-relaxed mb-8 max-w-prose ${dark ? "text-paper/60" : "text-ink/60"}`}
      >
        Gochujang and adobo. Kimchi and tacos. Doenjang and mole. Be the first
        to know when it lands.
      </p>
      <SubscribeForm
        list="smmc"
        placeholder="your@email.com"
        buttonLabel="Join the waitlist"
        dark={dark}
        successMessage="You're on the waitlist. We'll email you the moment Seoul Meets Mexico City is ready."
      />
    </div>
  );
}

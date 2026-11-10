import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { SmmcPurchaseOptions } from "@/components/cta/SmmcPurchaseOptions";

type Props = {
  /** Paper-on-ink styling for dark sections. Defaults to dark. */
  dark?: boolean;
};

/**
 * The free SMMC sampler, served as a plain static file. No email needed.
 */
const SAMPLER_PDF = "/smmc-sampler-v3.pdf";

/**
 * Email capture is OFF (2026-11-07).
 *
 * `POST /api/subscribe` now reports `503 {ok:false, error:"not-configured"}`
 * instead of pretending success, but nothing is stored and no SMMC welcome
 * automation exists yet, so a form here would still collect promise with
 * nothing behind it — "free recipes are on the way" and nothing on the way.
 * Same decision, same reason, as
 * `SmmcSamplerOptIn.tsx`; the two components have to move together.
 *
 * Flip to `true` only when the SMMC list saves subscribers AND something
 * actually delivers them something.
 */
const SUBSCRIBE_ENABLED = false;

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
        Seoul Meets Mexico City — the Korean–Mexican collision. Out now.
      </h2>
      <p
        className={`font-body text-lg leading-relaxed mb-6 max-w-prose ${dark ? "text-paper/60" : "text-ink/60"}`}
      >
        Gochujang and adobo. Kimchi and tacos. Doenjang and mole. Thirty recipes
        and six master sauces, in the illustrated edition.
      </p>
      <div className="mb-10">
        {/* All three editions, labelled. The retail cookbook is on Amazon in
            print and on Kindle; the illustrated PDF is ours on Gumroad. This
            block used to offer the Gumroad PDF alone, which read as though the
            book existed nowhere else. */}
        <SmmcPurchaseOptions onDark={dark} showHeading={false} />
      </div>
      {SUBSCRIBE_ENABLED ? (
        <SubscribeForm
          list="smmc"
          placeholder="your@email.com"
          buttonLabel="Add me to the list"
          dark={dark}
          successMessage="You're on the list."
        />
      ) : (
        <div>
          <a
            href={SAMPLER_PDF}
            download
            className={`inline-block font-ui text-eyebrow uppercase border-b pb-1 transition-colors duration-300 ${
              dark
                ? "text-paper border-paper/40 hover:text-vermillion hover:border-vermillion"
                : "text-ink border-ink/40 hover:text-vermillion hover:border-vermillion"
            }`}
          >
            Read the free sampler — no email needed ↓
          </a>
          <p
            className={`mt-3 font-body text-sm leading-relaxed max-w-prose ${dark ? "text-paper/40" : "text-ink/40"}`}
          >
            Twelve pages of the illustrated edition, printable PDF.
          </p>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { GUMROAD_SMMC_URL, GUMROAD_SMMC_PRICE } from "@/lib/gumroad";

type Props = {
  /** Paper-on-ink styling for dark sections. Defaults to dark. */
  dark?: boolean;
  /** Where the reader can read the three recipes on the web, if not already there. */
  showRecipeLink?: boolean;
};

const RECIPES = [
  {
    title: "Kimchi Elote Bites",
    line: "Charred corn, queso fresco and crema, capped with dressed kimchi and gochujang.",
  },
  {
    title: "Kimchi Fried Rice with Chorizo",
    line: "Day-old rice, Mexican chorizo, caramelised kimchi, gochujang and soy.",
  },
  {
    title: "Sweet Rice Horchata Pudding",
    line: "Rice simmered with cinnamon and condensed milk, finished with toasted sesame.",
  },
];

/** The reviewed 12-page sampler v3, served byte-for-byte from /public. */
const SAMPLER_PDF = "/smmc-sampler-v3.pdf";

/**
 * Subscriber capture is switched OFF.
 *
 * The SMMC MailerLite group is not configured, so the form cannot save anyone.
 * Note that the deployed route does not say so: when the key or group is
 * missing, `app/api/subscribe/route.ts` now returns
 * `503 {ok:false, error:"not-configured"}` and `SubscribeForm` says the address
 * was not saved (it used to return `200 {ok:true}`, which is why this stayed
 * off). Even with an honest error, nothing is captured and no SMMC welcome
 * automation exists. Showing a form that cannot capture is worse than showing
 * no form: the reader
 * types an address,
 * nothing is stored, and the site has implied a promise it cannot keep. The
 * sampler is delivered by the direct PDF link above, which needs no email.
 *
 * Flip this to `true` only after `MAILERLITE_API_KEY` and
 * `MAILERLITE_SMMC_GROUP_ID` are set in Vercel **and** a real signup has been
 * confirmed to land in the SMMC group.
 */
const SUBSCRIBE_ENABLED = false;

/**
 * The SMMC free-sampler opt-in.
 *
 * The download does NOT require an email. The direct PDF link comes first and
 * always works; the MailerLite form below it is optional and only adds the
 * three-email follow-up sequence. Never gate the PDF behind the form.
 *
 * Capture goes through the existing shared MailerLite path — `SubscribeForm`
 * with `list="smmc"` → `POST /api/subscribe` → the SMMC group. Do not swap in
 * `NewsletterForm`: that component posts to the generic group and cannot
 * address the SMMC list.
 *
 * The success link is a static PDF in /public so delivery does not silently
 * depend on the MailerLite welcome automation being switched on. The automation
 * adds the email copy; the download works either way.
 *
 * The purchase CTA is the Gumroad illustrated edition, not Amazon — this is the
 * KDP-independent sales path and must keep working while the KDP account is
 * suspended.
 */
export function SmmcSamplerOptIn({ dark = true, showRecipeLink = false }: Props) {
  return (
    <div>
      <p
        className={`font-ui text-eyebrow uppercase mb-4 ${dark ? "text-vermillion" : "text-vermillion"}`}
      >
        Free download
      </p>
      <h2
        className={`font-display text-display-2 leading-tight mb-6 ${dark ? "text-paper" : "text-ink"}`}
      >
        Three Korean–Mexican recipes. Free.
      </h2>
      <p
        className={`font-body text-lg leading-relaxed mb-8 max-w-prose ${dark ? "text-paper/70" : "text-ink/70"}`}
      >
        The 12-page sampler from <em>Seoul Meets Mexico City</em> — three
        complete recipes with ingredients, method, a chef's note, and the
        pairing logic behind each one. Printable.
      </p>

      <ul className={`font-body space-y-3 mb-8 ${dark ? "text-paper/70" : "text-ink/70"}`}>
        {RECIPES.map((r) => (
          <li key={r.title} className="flex gap-3">
            <span className="text-vermillion shrink-0">—</span>
            <span>
              <span className={dark ? "text-paper" : "text-ink"}>{r.title}.</span>{" "}
              {r.line}
            </span>
          </li>
        ))}
      </ul>

      {/* No email required — this link is the delivery path. */}
      <a
        href={SAMPLER_PDF}
        download
        className={`inline-flex items-center font-ui text-eyebrow uppercase px-6 py-3 border transition-colors duration-300 ${
          dark
            ? "text-paper border-paper/40 hover:border-vermillion hover:text-vermillion"
            : "text-ink border-ink/30 hover:border-vermillion hover:text-vermillion"
        }`}
      >
        Download the sampler — free ↓
      </a>
      <p className={`font-body text-sm mt-3 ${dark ? "text-paper/40" : "text-ink/40"}`}>
        No email required. 12 pages, printable PDF.
      </p>

      {SUBSCRIBE_ENABLED ? (
        <div
          className={`mt-10 pt-8 border-t ${dark ? "border-paper/15" : "border-hairline"}`}
        >
          <p
            className={`font-body text-base leading-relaxed mb-5 max-w-prose ${dark ? "text-paper/60" : "text-ink/60"}`}
          >
            Optional: leave your email and we'll add you to the list. The download
            above works either way, with or without an address.
          </p>
          <SubscribeForm
            list="smmc"
            placeholder="your@email.com"
            buttonLabel="Also email it to me"
            dark={dark}
            successMessage="You're on the list. Download the sampler here:"
            successLink={{
              href: SAMPLER_PDF,
              label: "Download the sampler (PDF) →",
            }}
          />
          <p className={`font-ui text-xs mt-4 ${dark ? "text-paper/30" : "text-ink/30"}`}>
            Occasional Korean–Mexican recipes after that. Unsubscribe any time.
          </p>
        </div>
      ) : null}

      <div
        className={`mt-10 pt-8 border-t ${dark ? "border-paper/15" : "border-hairline"}`}
      >
        <p
          className={`font-body text-base leading-relaxed mb-5 max-w-prose ${dark ? "text-paper/60" : "text-ink/60"}`}
        >
          Want the illustrated edition? It's an instant PDF download —
          {GUMROAD_SMMC_PRICE}, no shipping, no account required.
        </p>
        <Link
          href={GUMROAD_SMMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center font-ui text-eyebrow uppercase pb-1 border-b transition-colors duration-300 ${
            dark
              ? "text-paper border-paper hover:text-vermillion hover:border-vermillion"
              : "text-ink border-ink hover:text-vermillion hover:border-vermillion"
          }`}
        >
          Get the illustrated PDF — {GUMROAD_SMMC_PRICE}
        </Link>
      </div>

      {showRecipeLink ? (
        <p className={`font-ui text-xs mt-6 ${dark ? "text-paper/40" : "text-ink/40"}`}>
          <Link
            href="/free/seoul-meets-mexico-city"
            className="underline hover:text-vermillion transition-colors"
          >
            See the full sampler details
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}

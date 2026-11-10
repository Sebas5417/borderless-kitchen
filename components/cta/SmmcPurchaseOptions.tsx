import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { GUMROAD_SMMC_PRICE, GUMROAD_SMMC_URL } from "@/lib/gumroad";
import {
  SMMC_AMAZON_KINDLE,
  SMMC_AMAZON_KINDLE_PRICE,
  SMMC_AMAZON_PAPERBACK,
  SMMC_AMAZON_PAPERBACK_PRICE,
} from "@/lib/amazon";

type Props = {
  /** Paper-on-ink styling, for blocks inside a `bg-ink` section. */
  onDark?: boolean;
  /** Show the small "three ways to read it" eyebrow. */
  showHeading?: boolean;
};

/**
 * The three ways to buy Seoul Meets Mexico City, labelled by format.
 *
 * The site sold Vol. II through Gumroad alone and printed nothing about the
 * Amazon editions, so a buyer who wanted a physical book or a Kindle file had
 * no way to find one — while the copy implied Gumroad was the only option.
 * Both Amazon listings are live and in stock (verified 2026-11-10 in
 * lib/amazon.ts), so all three belong here, named so nobody has to guess
 * which one they are buying.
 *
 * The Gumroad link is a plain anchor on purpose: it is not an Amazon listing,
 * so it carries no affiliate parameters and no `sponsored` rel. The Associates
 * disclosure below is rendered once for the two Amazon links rather than
 * twice via two AmazonCTA disclosures, which would read as boilerplate noise
 * and push the Gumroad option off the screen.
 */
export function SmmcPurchaseOptions({ onDark = false, showHeading = true }: Props) {
  const muted = onDark ? "text-paper/45" : "text-ink/45";
  const note = onDark ? "text-paper/50" : "text-ink/50";
  const gumroadTone = onDark
    ? "text-paper border-paper hover:text-vermillion hover:border-vermillion"
    : "text-ink border-ink hover:text-vermillion hover:border-vermillion";

  return (
    <div>
      {showHeading ? (
        <p className={`font-ui text-eyebrow uppercase mb-6 ${muted}`}>
          Three ways to read it
        </p>
      ) : null}

      <ul className="space-y-6 max-w-prose">
        <li>
          <p className={`font-ui text-eyebrow uppercase mb-2 ${muted}`}>
            Paperback &middot; {SMMC_AMAZON_PAPERBACK_PRICE}
          </p>
          <AmazonCTA
            href={SMMC_AMAZON_PAPERBACK}
            label="Buy the paperback on Amazon"
            onDark={onDark}
            hideDisclosure
          />
          <p className={`font-body text-sm leading-relaxed mt-2 ${note}`}>
            The printed cookbook, shipped by Amazon.
          </p>
        </li>

        <li>
          <p className={`font-ui text-eyebrow uppercase mb-2 ${muted}`}>
            Kindle &middot; {SMMC_AMAZON_KINDLE_PRICE}
          </p>
          <AmazonCTA
            href={SMMC_AMAZON_KINDLE}
            label="Get the Kindle edition on Amazon"
            onDark={onDark}
            hideDisclosure
          />
          <p className={`font-body text-sm leading-relaxed mt-2 ${note}`}>
            The ebook, read in the Kindle app or on a Kindle.
          </p>
        </li>

        <li>
          <p className={`font-ui text-eyebrow uppercase mb-2 ${muted}`}>
            Illustrated PDF &middot; {GUMROAD_SMMC_PRICE}
          </p>
          <a
            href={GUMROAD_SMMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center font-ui text-eyebrow uppercase border-b pb-1 transition-colors duration-300 ${gumroadTone}`}
          >
            Get the illustrated PDF on Gumroad
          </a>
          <p className={`font-body text-sm leading-relaxed mt-2 ${note}`}>
            A downloadable PDF from our own shop, delivered instantly.
          </p>
        </li>
      </ul>

      <p className={`font-ui text-xs leading-relaxed mt-6 max-w-prose ${muted}`}>
        As an Amazon Associate we earn from qualifying purchases. The two Amazon
        links are affiliate links &mdash; they cost you nothing extra. The
        Gumroad link is not an affiliate link.
      </p>
    </div>
  );
}

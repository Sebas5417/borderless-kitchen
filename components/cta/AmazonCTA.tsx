type Props = {
  href: string;
  label?: string;
  className?: string;
  /**
   * Suppress the affiliate disclosure. Only for places that already carry
   * their own disclosure copy (e.g. /shop) — never to tidy up a layout.
   */
  hideDisclosure?: boolean;
};

/**
 * The single primary book CTA. Editorial, not button-shaped.
 * Hairline underline, vermillion on hover.
 *
 * The affiliate disclosure lives here, next to the link, rather than on each
 * page that happens to render one. The Amazon Associates Operating Agreement
 * and the FTC endorsement guides both want it on the page with the link and
 * close to it; keeping it inside the component means a new page carrying a
 * book CTA cannot silently ship without one. Journal, recipe and culture
 * pages all render this and all previously lacked any disclosure.
 */
export function AmazonCTA({
  href,
  label = "Buy on Amazon",
  className,
  hideDisclosure = false,
}: Props) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 ${className ?? ""}`}
      >
        {label}
      </a>
      {hideDisclosure ? null : (
        <p className="font-ui text-xs leading-relaxed text-ink/45 mt-4 max-w-prose">
          As an Amazon Associate we earn from qualifying purchases. This is an
          affiliate link &mdash; it costs you nothing extra.
        </p>
      )}
    </>
  );
}

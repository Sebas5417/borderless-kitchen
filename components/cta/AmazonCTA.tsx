type Props = {
  href: string;
  label?: string;
  className?: string;
};

/**
 * The single primary book CTA. Editorial, not button-shaped.
 * Hairline underline, vermillion on hover.
 */
export function AmazonCTA({
  href,
  label = "Buy on Amazon",
  className,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 ${className ?? ""}`}
    >
      {label}
    </a>
  );
}

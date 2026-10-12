"use client";

type Props = {
  href: string;
  label?: string;
  className?: string;
  /** Suppress the affiliate disclosure only where nearby copy already provides it. */
  hideDisclosure?: boolean;
};

type WindowWithGtag = Window & {
  gtag?: (
    command: string,
    action: string,
    parameters?: Record<string, string>,
  ) => void;
};

/**
 * The primary book CTA includes the required affiliate disclosure and sends a
 * privacy-conscious GA4 event when a reader follows the Amazon link.
 */
export function AmazonCTA({
  href,
  label = "Buy on Amazon",
  className,
  hideDisclosure = false,
}: Props) {
  function trackBookClick() {
    const bookId = href.match(/\/dp\/([A-Z0-9]+)/i)?.[1];
    (window as WindowWithGtag).gtag?.("event", "amazon_book_click", {
      ...(bookId ? { book_id: bookId } : {}),
      page_path: window.location.pathname,
      link_url: href,
    });
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={trackBookClick}
        className={
          "inline-flex items-center font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300 " +
          (className ?? "")
        }
      >
        {label}
      </a>
      {hideDisclosure ? null : (
        <p className="font-ui text-xs leading-relaxed text-ink/45 mt-4 max-w-prose">
          As an Amazon Associate we earn from qualifying purchases. This is an affiliate link &mdash; it costs you nothing extra.
        </p>
      )}
    </>
  );
}

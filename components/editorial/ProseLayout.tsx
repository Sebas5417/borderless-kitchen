import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * 68ch prose column — used for journal essays and longform copy.
 * Styles the MDX output without requiring @tailwindcss/typography.
 */
export function ProseLayout({ children, className }: Props) {
  return (
    <div
      className={[
        "max-w-prose mx-auto",
        "font-body text-lg text-ink/90 leading-relaxed",
        // paragraphs
        "[&_p]:mb-7",
        // headings
        "[&_h2]:font-display [&_h2]:text-display-3 [&_h2]:text-ink [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:leading-tight",
        "[&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-ink [&_h3]:mt-10 [&_h3]:mb-4",
        // emphasis
        "[&_em]:font-display [&_em]:italic [&_em]:not-italic:normal-case",
        "[&_strong]:font-bold [&_strong]:text-ink",
        // links
        "[&_a]:text-vermillion [&_a]:underline [&_a:hover]:no-underline",
        // lists
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2",
        // blockquotes — styled like pull quotes inline
        "[&_blockquote]:border-l-2 [&_blockquote]:border-vermillion [&_blockquote]:pl-6 [&_blockquote]:my-10 [&_blockquote]:font-display [&_blockquote]:italic [&_blockquote]:text-display-3 [&_blockquote]:text-ink/80 [&_blockquote]:leading-tight",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

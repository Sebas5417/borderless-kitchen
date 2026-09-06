"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useMDXComponent } from "next-contentlayer2/hooks";

type Props = {
  code: string;
  /** Slugs that exist under /journal — when provided, links to unknown journal slugs render as plain text. */
  storySlugs?: string[];
  /** Slugs that exist under /culture — when provided, links to unknown pantry slugs render as plain text. */
  pantrySlugs?: string[];
};

const JOURNAL_RE = /^\/(?:journal|stories)\/([^/#?]+)\/?(?:[#?].*)?$/;
const CULTURE_RE = /^\/culture\/([^/#?]+)\/?(?:[#?].*)?$/;

/**
 * MDX renderer. Journal bodies were written with forward references to entries
 * that were never published (81 links → 67 missing /journal/ slugs, plus legacy
 * /stories/ paths and pantry terms with no /culture/ page). Rather than editing
 * 230 MDX files, the link component checks the target against the slugs that
 * actually exist at build time and degrades unknown ones to plain text.
 */
export function MDXContent({ code, storySlugs, pantrySlugs }: Props) {
  const MDX = useMDXComponent(code);

  const components = useMemo(() => {
    if (!storySlugs && !pantrySlugs) return undefined;
    const stories = new Set(storySlugs ?? []);
    const pantry = new Set(pantrySlugs ?? []);

    function SafeLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
      const { href, children, ...rest } = props;
      if (typeof href === "string") {
        const j = href.match(JOURNAL_RE);
        if (j && storySlugs) {
          if (!stories.has(j[1])) return <span {...rest}>{children}</span>;
          // legacy /stories/<slug> → canonical /journal/<slug>
          return (
            <Link href={`/journal/${j[1]}`} {...rest}>
              {children}
            </Link>
          );
        }
        const c = href.match(CULTURE_RE);
        if (c && pantrySlugs && !pantry.has(c[1])) {
          return <span {...rest}>{children}</span>;
        }
      }
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      );
    }

    return { a: SafeLink };
  }, [storySlugs, pantrySlugs]);

  return <MDX components={components} />;
}

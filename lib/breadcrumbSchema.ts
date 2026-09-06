/**
 * BreadcrumbList JSON-LD (Home -> section index -> page). Added 2026-09-06 so
 * Google can show the site path under each result and understand the
 * section hierarchy (recipes / journal / culture / books).
 */
const SITE = "https://borderlesskitchenseries.com";

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? SITE : `${SITE}${c.path}`,
    })),
  };
}

/** Serialised for a <script type="application/ld+json"> body. */
export function breadcrumbJson(crumbs: Crumb[]): string {
  return JSON.stringify(breadcrumbSchema(crumbs));
}

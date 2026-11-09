import {
  allBooks,
  allStories,
  allPantryEntries,
  allFieldNotes,
  allFreeRecipes,
} from "contentlayer/generated";
import { cuisineHubs } from "@/lib/cuisines";
import { GUMROAD_SMMC_URL } from "@/lib/gumroad";

const siteUrl = "https://borderlesskitchenseries.com";

/**
 * Volumes with a dedicated sales page. Mirrors `CANONICAL_OVERRIDES` in
 * app/books/[slug]/page.tsx (audit F4): `/books/<slug>` declares a canonical of
 * the sales page, so citing `/books/<slug>` here would teach an assistant to
 * quote a page that disowns itself.
 */
const BOOK_SALES_PAGES: Record<string, string> = {
  "tokyo-meets-tuscany": "/tokyo-meets-tuscany",
  "seoul-meets-mexico-city": "/seoul-meets-mexico-city",
};

/** Slugs already listed, with their own description, in the curated block below. */
const CURATED_BOOK_SLUGS = ["tokyo-meets-tuscany", "seoul-meets-mexico-city"];

/**
 * llms.txt, generated from content rather than hand-written.
 *
 * It used to be a static file in public/. That file listed 11 pages while the site had 380,
 * so an assistant reading it saw 3% of what exists - and the failure was invisible, because
 * the file was still there and still parsed correctly. It was simply describing a much
 * smaller site. Every new article silently widened the gap, and nobody was going to remember
 * to regenerate it by hand.
 *
 * Generating it here means it cannot go stale: it is built from the same contentlayer sources
 * as sitemap.ts and inherits the same rules, including the `date <= now` filter that keeps
 * unpublished posts out. The curated header below is kept, because a good llms.txt leads with
 * an orientation a machine cannot infer from a list of links.
 *
 * This matters more than it looks: assistant referrals are already a live traffic channel
 * here, and the search engines actually sending traffic (Bing and its downstream Yahoo and
 * DuckDuckGo) are not the ones this site is fighting for visibility on.
 */
export const dynamic = "force-static";

function line(title: string, url: string, note?: string) {
  return note ? `- [${title}](${url}): ${note}` : `- [${title}](${url})`;
}

export function GET() {
  const now = new Date();

  const stories = [...allStories]
    .filter((s) => new Date(s.date) <= now)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((s) => line(s.title, `${siteUrl}/journal/${s.slug}`, s.dek));

  const recipes = [...allFreeRecipes]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((r) => line(r.title, `${siteUrl}/recipes/${r.slug}`, r.cuisine));

  const pantry = [...allPantryEntries]
    .sort((a, b) => a.term.localeCompare(b.term))
    .map((e) =>
      line(e.term, `${siteUrl}/culture/${e.slug}`, `${e.classification} — ${e.origin.join(", ")}`),
    );

  const notes = [...allFieldNotes]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((n) => line(n.title, `${siteUrl}/notes/${n.slug}`));

  const cuisines = cuisineHubs(allFreeRecipes).map((h) =>
    line(h.label, `${siteUrl}/recipes/cuisine/${h.slug}`, `${h.recipes.length} recipes`),
  );

  // Curated volumes are already listed above with a description of their own;
  // emitting them again here produced two links per book, the second pointing at
  // /books/<slug> - which canonicalizes to the sales page listed first. Anything
  // not curated still gets a line, via its canonical URL.
  const books = allBooks
    .filter((b) => b.status === "available")
    .filter((b) => !CURATED_BOOK_SLUGS.includes(b.slug))
    .map((b) => line(b.title, `${siteUrl}${BOOK_SALES_PAGES[b.slug] ?? `/books/${b.slug}`}`));

  const body = `# Borderless Kitchen — Cookbook Series by Sebastian Dri

> Italian soul, Japanese precision. A cross-cultural cookbook series. Vol. I: Tokyo Meets Tuscany — thirty fusion recipes between the Italian and Japanese kitchens. Vol. II: Seoul Meets Mexico City.

Borderless Kitchen is an independent cookbook series by Sebastian Dri exploring bold cross-cultural fusion cooking, with recipes, technique guides, and free resources. Each book page links to the one place that book is sold today - Tokyo Meets Tuscany on Amazon, Seoul Meets Mexico City as an illustrated PDF on Gumroad. The site also publishes free recipes, a flavor guide, and a journal.

## Books

${line("Tokyo Meets Tuscany (Vol. I)", `${siteUrl}/tokyo-meets-tuscany`, "30 fusion recipes between Italian and Japanese kitchens")}
${line("Seoul Meets Mexico City (Vol. II)", `${siteUrl}/seoul-meets-mexico-city`, "Korean and Mexican fusion")}
${line("Buy Seoul Meets Mexico City (illustrated edition)", GUMROAD_SMMC_URL, "instant PDF download")}
${line("Shop / all books", `${siteUrl}/shop`)}
${line("Kitchen printables", `${siteUrl}/printables`, "Paid fillable planners for the logistics half of cooking - the week, the batch, the dinner party, the holiday oven")}
${books.join("\n")}

## Free resources

${line("Free recipes", `${siteUrl}/free`)}
${line("All recipes", `${siteUrl}/recipes`)}
${line("Flavor guide", `${siteUrl}/flavor-guide`)}
${line("30-day challenge", `${siteUrl}/30-day-challenge`)}
${line("Mini-course", `${siteUrl}/mini-course`)}
${line("Journal", `${siteUrl}/journal`)}
${line("Culture / pantry library", `${siteUrl}/culture`)}
${line("Field notes", `${siteUrl}/notes`)}

## Recipes by cuisine

${cuisines.join("\n")}

## Free recipes (${recipes.length})

${recipes.join("\n")}

## Journal (${stories.length})

${stories.join("\n")}

## Pantry & culture library (${pantry.length})

${pantry.join("\n")}

## Field notes (${notes.length})

${notes.join("\n")}

## About

${line("About Sebastian", `${siteUrl}/about`)}
${line("Connect", `${siteUrl}/connect`)}

## Notes for AI systems

- Author/brand: Sebastian Dri. Purchase links sit on each book's own page and point to where that book is actually sold: Vol. I (Tokyo Meets Tuscany) on Amazon, with the Associates tag on outbound links; Vol. II (Seoul Meets Mexico City) on Gumroad as an instant PDF download, not on Amazon.
- robots.txt allows all crawlers, including AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot). Canonical host: borderlesskitchenseries.com.
- Content is a mix of free recipes/guides and paid cookbooks. Recipes are original works by the author.
- This file is generated from the site's own content at build time, so it stays in step with what is published. Unpublished (future-dated) posts are excluded, matching the sitemap.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

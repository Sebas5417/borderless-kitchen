import {
  allBooks,
  allStories,
  allPantryEntries,
  allFieldNotes,
  allFreeRecipes,
} from "contentlayer/generated";
import { cuisineHubs } from "@/lib/cuisines";

const siteUrl = "https://borderlesskitchenseries.com";

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

  const books = allBooks
    .filter((b) => b.status === "available")
    .map((b) => line(b.title, `${siteUrl}/books/${b.slug}`));

  const body = `# Borderless Kitchen — Cookbook Series by Sebastian Dri

> Italian soul, Japanese precision. A cross-cultural cookbook series. Vol. I: Tokyo Meets Tuscany — thirty fusion recipes between the Italian and Japanese kitchens. Vol. II: Seoul Meets Mexico City.

Borderless Kitchen is an independent cookbook series by Sebastian Dri exploring bold cross-cultural fusion cooking, with recipes, technique guides, and free resources. Books are sold on Amazon; the site also publishes free recipes, a flavor guide, and a journal.

## Books

${line("Tokyo Meets Tuscany (Vol. I)", `${siteUrl}/tokyo-meets-tuscany`, "30 fusion recipes between Italian and Japanese kitchens")}
${line("Seoul Meets Mexico City (Vol. II)", `${siteUrl}/seoul-meets-mexico-city`, "Korean and Mexican fusion")}
${line("Shop / all books", `${siteUrl}/shop`)}
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

- Author/brand: Sebastian Dri. Books are sold via Amazon (affiliate/retail links on-page).
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

import { MetadataRoute } from "next";
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
 * Newest date in a set of dated documents, or undefined when the set is empty.
 *
 * Every entry below used to be stamped `new Date()`, which meant 59 of 380 URLs claimed
 * they changed on whatever day the site was last built - forever. A sitemap that says the
 * whole site changed today on every deploy gets its lastmod distrusted and then ignored,
 * which throws away the signal for the 318 pages whose dates are real.
 *
 * So: derive it where the content implies a date, and omit it where nothing does. Next
 * drops `lastModified` from the XML when it is undefined, and an absent lastmod is honest.
 */
function newestDate(items: { date: string }[]): Date | undefined {
  if (items.length === 0) return undefined;
  return new Date(
    items.reduce((max, i) => (+new Date(i.date) > +new Date(max.date) ? i : max)).date,
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  // /books/* catalog pages canonicalize to the dedicated sales pages for
  // TMT and SMMC (audit F4) — keep them at a supporting priority so the
  // sales pages are the unambiguous primaries.
  // Unreleased "coming" volumes are thin placeholder pages with no inbound
  // links (crawl 2026-09-06) — keep them out of the sitemap; they also carry
  // a noindex robots tag until they have a real launch.
  const books = allBooks.filter((book) => book.status === "available").map((book) => ({
    url: `${siteUrl}/books/${book.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const now = new Date();
  const stories = allStories
    .filter((story) => new Date(story.date) <= now)
    .map((story) => ({
      url: `${siteUrl}/journal/${story.slug}`,
      lastModified: new Date(story.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  const pantry = allPantryEntries.map((entry) => ({
    url: `${siteUrl}/culture/${entry.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const notes = allFieldNotes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  // Cuisine hub pages (2026-09-06): one per cuisine with 3+ free recipes.
  const cuisines = cuisineHubs(allFreeRecipes).map((hub) => ({
    url: `${siteUrl}/recipes/cuisine/${hub.slug}`,
    lastModified: newestDate(hub.recipes),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const freeRecipes = allFreeRecipes.map((recipe) => ({
    url: `${siteUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.date),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const publishedStories = allStories.filter((s) => new Date(s.date) <= new Date());
  const newestStory = newestDate(publishedStories);
  const newestRecipe = newestDate(allFreeRecipes);
  const newestNote = newestDate(allFieldNotes);
  const newestAnywhere = newestDate([
    ...publishedStories,
    ...allFreeRecipes,
    ...allFieldNotes,
  ]);

  return [
    { url: siteUrl, lastModified: newestAnywhere, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/books`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/tokyo-meets-tuscany`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/seoul-meets-mexico-city`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/journal`, lastModified: newestStory, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/culture`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/connect`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/notes`, lastModified: newestNote, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteUrl}/recipes`, lastModified: newestRecipe, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/shop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/free`, lastModified: newestRecipe, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/preorder`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/mini-course`, changeFrequency: "monthly", priority: 0.8 },
    ...books,
    ...stories,
    ...pantry,
    ...notes,
    ...cuisines,
    ...freeRecipes,
  ];
}

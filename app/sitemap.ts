import { MetadataRoute } from "next";
import { allBooks, allStories, allPantryEntries } from "contentlayer/generated";

const siteUrl = "https://borderlesskitchenseries.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const books = allBooks.map((book) => ({
    url: `${siteUrl}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: book.status === "available" ? 0.9 : 0.5,
  }));

  const stories = allStories.map((story) => ({
    url: `${siteUrl}/journal/${story.slug}`,
    lastModified: new Date(story.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const pantry = allPantryEntries.map((entry) => ({
    url: `${siteUrl}/culture/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/books`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/books/tokyo-meets-tuscany`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/culture`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/connect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...books,
    ...stories,
    ...pantry,
  ];
}

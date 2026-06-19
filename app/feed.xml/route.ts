import { allStories, allFreeRecipes } from "contentlayer/generated";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://borderlesskitchenseries.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const now = new Date();
  const stories = allStories
    .filter((s) => Boolean(s.date) && new Date(s.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recipes = allFreeRecipes
    .filter((r) => Boolean(r.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items = [
    ...stories.map((s) => ({
      title: s.title,
      link: `${siteUrl}/journal/${s.slug}`,
      description: s.dek ?? "",
      pubDate: new Date(s.date).toUTCString(),
      category: "Journal",
    })),
    ...recipes.map((r) => ({
      title: r.title,
      link: `${siteUrl}/recipes/${r.slug}`,
      description: r.dek ?? "",
      pubDate: new Date(r.date).toUTCString(),
      category: "Recipe",
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Borderless Kitchen — Sebastian Dri</title>
    <link>${siteUrl}</link>
    <description>Cross-cultural cooking — Italian soul, Japanese precision, Korean heat, Mexican depth. Recipes and essays from the Borderless Kitchen Series.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/images/tmt-cover.jpg</url>
      <title>Borderless Kitchen</title>
      <link>${siteUrl}</link>
    </image>
    <managingEditor>facelesschannel0515@gmail.com (Sebastian Dri)</managingEditor>
    <copyright>${new Date().getFullYear()} Sebastian Dri</copyright>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator>Sebastian Dri</dc:creator>
      <category>${item.category}</category>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

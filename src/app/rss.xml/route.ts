import { STORIES } from '@/lib/content/data'

const BASE_URL = 'https://borderless-kitchen.vercel.app'
const SITE_TITLE = 'Borderless Kitchen — Journal'
const SITE_DESCRIPTION = 'Italian soul. Japanese precision.'

export const dynamic = 'force-static'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const ordered = [...STORIES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const items = ordered
    .map((s) => {
      const url = `${BASE_URL}/journal/${s.slug}`
      return `    <item>
      <title>${escapeXml(s.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(s.publishedAt).toUTCString()}</pubDate>
      <author>noreply@borderlesskitchen.com (${escapeXml(s.author)})</author>
      <category>${escapeXml(s.themes.join(', '))}</category>
      <description>${escapeXml(s.standfirst)}</description>
    </item>`
    })
    .join('\n')

  const lastBuild = new Date(ordered[0]?.publishedAt ?? Date.now()).toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

import type { APIRoute } from "astro";
import { releaseLog } from "../data/release-log";
import { sitePath } from "../lib/paths";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

export const GET: APIRoute = ({ site, url }) => {
  const publicOrigin = site ?? new URL(url.origin);
  const feedUrl = new URL(sitePath("/feed.xml"), publicOrigin).href;
  // RSS contains only owner-approved releases; previews and external records stay out.
  const entries = releaseLog.map((item) => ({
    ...item,
    path: item.route,
    kind: "Approved release",
  }));

  const items = entries
    .map((item) => {
      const link = new URL(sitePath(item.path), publicOrigin).href;
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(`${item.description} Category: ${item.category}. ${item.kind}.`)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Independent Observer</title>
    <link>${new URL(sitePath("/"), publicOrigin).href}</link>
    <description>Independent research, documentary work, and public reasoning about institutions, history, political economy, science, and technology.</description>
    <language>en</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};

import type { APIRoute } from "astro";
import { documentaryItems, researchItems, videoItems } from "../data/content";
import { sitePath } from "../lib/paths";
import { slugify } from "../lib/slugs";

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
  // RSS contains only the explicitly maintained, public-safe editorial previews.
  // Placeholder/template cards and private or automated Dropbox material do not enter here.
  const entries = [
    ...researchItems.map((item) => ({
      ...item,
      path: `/research/${slugify(item.title)}/`,
      kind: "Research preview",
    })),
    ...documentaryItems.map((item) => ({
      ...item,
      path: `/documentaries/${slugify(item.title)}/`,
      kind: "Documentary preview",
    })),
    ...videoItems.map((item) => ({
      ...item,
      path: `/videos/${slugify(item.title)}/`,
      kind: "Video preview",
    })),
  ];

  const items = entries
    .map((item) => {
      const link = new URL(sitePath(item.path), publicOrigin).href;
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(`${item.description} Status: ${item.status}. ${item.kind}.`)}</description>
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

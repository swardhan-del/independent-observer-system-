import type { APIRoute } from "astro";
import { sitePath } from "../lib/paths";
import { topicHubs } from "../data/topics";
import { publicDocumentItems } from "../data/documents";
import { seriesItems } from "../data/series";
import { slugify } from "../lib/slugs";

const publicRoutes = [
  "/",
  "/series/",
  ...seriesItems.map((entry) => `/series/${slugify(entry.title)}/`),
  "/library/",
  "/research/",
  "/documentaries/",
  "/videos/",
  "/about/",
  "/contact/",
  "/start/",
  "/publication-operating-system/",
  "/topics/",
  ...topicHubs.map((topic) => `/topics/${topic.slug}/`),
  ...publicDocumentItems.map((entry) => `/library/documents/${entry.id}/`),
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = ({ site }) => {
  const publicOrigin = site ?? new URL("http://localhost");
  const entries = publicRoutes
    .map(
      (route) =>
        `  <url><loc>${escapeXml(new URL(sitePath(route), publicOrigin).href)}</loc></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};

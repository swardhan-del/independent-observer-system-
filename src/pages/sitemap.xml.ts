import type { APIRoute } from "astro";
import { sitePath } from "../lib/paths";

const publicRoutes = [
  "/",
  "/series/",
  "/library/",
  "/research/",
  "/documentaries/",
  "/videos/",
  "/about/",
  "/contact/",
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

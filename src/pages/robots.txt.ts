import type { APIRoute } from "astro";
import { sitePath } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const publicOrigin = site ?? new URL("http://localhost");
  const sitemapUrl = new URL(sitePath("/sitemap.xml"), publicOrigin).href;

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

import type { APIRoute } from "astro";
import { sitePath } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const publicOrigin = site ?? new URL("http://localhost");
  const sitemapUrl = new URL(sitePath("/sitemap.xml"), publicOrigin).href;
  const fallbackBuild = import.meta.env.PUBLIC_FALLBACK_BUILD === "true";
  const previewBuild = process.env.VERCEL_ENV === "preview";

  return new Response(
    `User-agent: *\n${fallbackBuild || previewBuild ? "Disallow: /" : "Allow: /"}\nSitemap: ${sitemapUrl}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

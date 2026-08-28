import type { APIRoute } from "astro";
import { sitePath } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const publicOrigin = site ?? new URL("http://localhost");
  const sitemapUrl = new URL(sitePath("/sitemap.xml"), publicOrigin).href;
  const fallbackBuild = import.meta.env.PUBLIC_FALLBACK_BUILD === "true";

  return new Response(
    `User-agent: *\n${fallbackBuild ? "Disallow: /" : "Allow: /"}\nSitemap: ${sitemapUrl}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

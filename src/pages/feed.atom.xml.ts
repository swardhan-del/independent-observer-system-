import type { APIRoute } from "astro";
import { publicSitePath } from "../lib/paths";
import { releaseLog } from "../data/release-log";

const FEED_BASELINE_UPDATED = "2026-09-03T00:00:00Z";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[character] ??
      character,
  );

export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin);
  const feedUrl = new URL(publicSitePath("/feed.atom.xml"), origin).href;
  const homeUrl = new URL(publicSitePath("/"), origin).href;
  const feedUpdated = releaseLog.reduce((latest, entry) => {
    const candidate = `${entry.date}T00:00:00Z`;
    return candidate > latest ? candidate : latest;
  }, FEED_BASELINE_UPDATED);
  const entries = releaseLog
    .map((entry) => {
      const link = new URL(publicSitePath(entry.route), origin).href;
      return `\n  <entry><title>${escapeXml(entry.title)}</title><id>${link}</id><link href="${link}"/><updated>${entry.date}T00:00:00Z</updated><summary>Owner-approved Independent Observer release.</summary></entry>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><title>Independent Observer</title><id>${homeUrl}</id><link href="${homeUrl}"/><link rel="self" href="${feedUrl}"/><updated>${feedUpdated}</updated><author><name>Independent Observer</name></author>${entries}\n</feed>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};

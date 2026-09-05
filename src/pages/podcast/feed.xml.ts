import type { APIRoute } from "astro";
import { statSync } from "node:fs";
import { resolve } from "node:path";
import { historyPodcastEpisodes } from "../../data/podcast";
import { publicSitePath } from "../../lib/paths";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

function durationFor(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `00:${String(minutes).padStart(2, "0")}:${remainder}`;
}

export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin);
  const feedUrl = new URL(publicSitePath("/podcast/feed.xml"), origin).href;
  const showUrl = new URL(publicSitePath("/podcast/"), origin).href;
  const publishedAt = new Date("2026-09-03T00:00:00Z").toUTCString();
  const items = historyPodcastEpisodes
    .map((episode) => {
      const episodeUrl = `${showUrl}#episode-${String(episode.number).padStart(2, "0")}`;
      const audioUrl = new URL(publicSitePath(episode.audioUrl), origin).href;
      const audioLength = statSync(
        resolve(process.cwd(), "public", episode.audioUrl.slice(1)),
      ).size;
      return `
    <item>
      <title>${escapeXml(`Episode ${episode.number}: ${episode.title}`)}</title>
      <link>${episodeUrl}</link>
      <guid isPermaLink="false">independent-observer-history-across-the-volumes-${episode.number}</guid>
      <pubDate>${publishedAt}</pubDate>
      <description>${escapeXml(`${episode.summary} ${episode.boundary}`)}</description>
      <enclosure url="${audioUrl}" length="${audioLength}" type="audio/wav" />
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:episode>${episode.number}</itunes:episode>
      <itunes:duration>${durationFor(episode.durationSeconds)}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml("History Across the Volumes")}</title>
    <link>${showUrl}</link>
    <description>${escapeXml("Four author-produced audio essays on history, power, work, and human capability from the Independent Observer research program.")}</description>
    <language>en</language>
    <copyright>© 2026 Independent Observer</copyright>
    <lastBuildDate>${publishedAt}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${feedUrl}" rel="self" type="application/rss+xml" />
    <itunes:author>Independent Observer</itunes:author>
    <itunes:summary>${escapeXml(historyPodcastEpisodes[0].boundary)}</itunes:summary>
    <itunes:owner><itunes:name>Independent Observer</itunes:name></itunes:owner>
    <itunes:category text="History" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};

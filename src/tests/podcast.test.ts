import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { historyPodcastEpisodes } from "../data/podcast";

const projectRoot = process.cwd();
const distRoot = join(projectRoot, "dist");

describe("history podcast", () => {
  it("keeps one episode and two source records for each volume", () => {
    expect(historyPodcastEpisodes).toHaveLength(4);
    expect(historyPodcastEpisodes.map((episode) => episode.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(historyPodcastEpisodes.every((episode) => episode.sources)).toBe(true);
    expect(historyPodcastEpisodes.every((episode) => episode.sources.length === 2)).toBe(true);
  });

  it("keeps the scripts, generated audio, and podcast feed aligned", () => {
    const feed = readFileSync(join(distRoot, "podcast/feed.xml"), "utf8");

    for (const episode of historyPodcastEpisodes) {
      expect(episode.script.length, episode.title).toBeGreaterThan(1000);
      expect(
        existsSync(join(projectRoot, "public", episode.audioUrl.slice(1))),
        episode.title,
      ).toBe(true);
      expect(feed).toContain(`Episode ${episode.number}: ${episode.title}`);
      expect(feed).toContain(episode.audioUrl);
    }

    expect(feed.match(/<item>/g)).toHaveLength(4);
    expect(feed.match(/<enclosure /g)).toHaveLength(4);
    expect(feed).toContain('type="audio/wav"');
    expect(feed).toContain('<itunes:category text="History" />');
  });
});

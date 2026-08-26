import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  reviewQueueForTopic,
  reviewQueueSignals,
  topicPathways,
  topicPluginDefinitions,
  volumeTopicConnections,
} from "../../plugins/topic-discovery/catalog";
import { topicHubs } from "../data/topics";

const sourceRoot = join(process.cwd(), "src");
const topicIndex = readFileSync(join(sourceRoot, "pages/topics/index.astro"), "utf8");
const topicAtlas = readFileSync(join(sourceRoot, "components/TopicAtlas.astro"), "utf8");
const topicReviewQueue = readFileSync(
  join(sourceRoot, "components/TopicReviewQueue.astro"),
  "utf8",
);

describe("topic discovery plugin", () => {
  it("defines the six public subject hubs and only routes pathways to known subjects", () => {
    expect(topicPluginDefinitions.map((topic) => topic.slug)).toEqual([
      "history",
      "politics",
      "economics",
      "law",
      "science",
      "technology",
    ]);
    expect(
      topicPathways.every((pathway) =>
        pathway.topicSlugs.every((slug) =>
          topicPluginDefinitions.some((topic) => topic.slug === slug),
        ),
      ),
    ).toBe(true);
  });

  it("maps public SSRN signals into topic hubs without treating them as releases", () => {
    expect(topicHubs.find((topic) => topic.slug === "technology")?.related).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "SSRN preprint",
          title: "Disconnected Hearts — The Tech Revolution of Intimacy",
        }),
      ]),
    );
    expect(topicHubs.every((topic) => topic.related.every((item) => item.status.length > 0))).toBe(
      true,
    );
  });

  it("keeps six Dropbox-derived review signals metadata-only and held for approval", () => {
    expect(reviewQueueSignals).toHaveLength(6);
    expect(reviewQueueSignals.every((signal) => signal.status === "Awaiting human release")).toBe(
      true,
    );
    expect(
      reviewQueueSignals.every((signal) => !signal.description.includes("Dropbox/approved")),
    ).toBe(true);
    expect(reviewQueueForTopic("science")).toHaveLength(3);
    expect(reviewQueueForTopic("law").length).toBeGreaterThan(0);
  });

  it("wires the topic atlas, URL view state, and visible human-release boundary", () => {
    expect(topicIndex).not.toContain("<TopicPathways pathways={topicPathways} />");
    expect(topicIndex).toContain("<TopicVolumeMap />");
    expect(topicIndex).toContain("<TopicAtlas topics={topicHubs} />");
    expect(topicIndex).toContain("<TopicReviewQueue signals={reviewQueueSignals} />");
    expect(topicAtlas).toContain("data-topic-view");
    expect(topicAtlas).toContain("URLSearchParams");
    expect(topicAtlas).toContain('aria-live="polite"');
    expect(topicReviewQueue).toContain("signal.status");
    expect(topicReviewQueue).toContain("Metadata only · not a published article");
  });

  it("connects all four roadmap volumes to at least two topic hubs", () => {
    expect(Object.keys(volumeTopicConnections)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      Object.values(volumeTopicConnections).every(
        (connection: { topicSlugs: string[] }) => connection.topicSlugs.length >= 2,
      ),
    ).toBe(true);
  });
});

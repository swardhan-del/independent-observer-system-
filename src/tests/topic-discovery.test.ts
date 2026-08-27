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
const startIndex = readFileSync(join(sourceRoot, "pages/start/index.astro"), "utf8");
const topicSpineNavigator = readFileSync(
  join(sourceRoot, "components/TopicSpineNavigator.astro"),
  "utf8",
);
const topicAtlas = readFileSync(join(sourceRoot, "components/TopicAtlas.astro"), "utf8");
const topicQuestionBuilder = readFileSync(
  join(sourceRoot, "components/TopicQuestionBuilder.astro"),
  "utf8",
);
const topicVolumeMatrix = readFileSync(
  join(sourceRoot, "components/TopicVolumeMatrix.astro"),
  "utf8",
);
const topicVolumeMap = readFileSync(join(sourceRoot, "components/TopicVolumeMap.astro"), "utf8");
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
    expect(topicPathways).toHaveLength(5);
    expect(topicPathways.every((pathway) => pathway.volumeLabels.length > 0)).toBe(true);
    expect(topicPathways.every((pathway) => pathway.primaryVolumeLabel.length > 0)).toBe(true);
    expect(topicPathways.every((pathway) => pathway.coreIdeas.length >= 3)).toBe(true);
    expect(topicPathways.every((pathway) => pathway.contentLinks.length >= 3)).toBe(true);
    expect(
      topicPathways.every((pathway) =>
        pathway.volumeLabels.every((volume) => volume in volumeTopicConnections),
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
    expect(topicIndex).toContain('className="topics-hero"');
    expect(topicIndex).toContain("The six topic fields");
    expect(topicIndex).toContain("<TopicSpineNavigator />");
    expect(topicIndex).toContain("<TopicPathways pathways={topicPathways} />");
    expect(topicIndex).toContain("<TopicVolumeMap />");
    expect(topicIndex).toContain("<TopicQuestionBuilder />");
    expect(topicIndex).toContain("<TopicVolumeMatrix />");
    expect(topicIndex).toContain("<TopicAtlas topics={topicHubs} />");
    expect(topicIndex).toContain("<TopicReviewQueue signals={reviewQueueSignals} />");
    expect(topicAtlas).toContain("data-topic-view");
    expect(topicAtlas).toContain("URLSearchParams");
    expect(topicAtlas).toContain('aria-live="polite"');
    expect(topicAtlas).toContain("synonymGroups");
    expect(topicAtlas).toContain("data-topic-type-filter");
    expect(topicAtlas).toContain("data-topic-volume-filter");
    expect(topicAtlas).toContain("data-topic-clear");
    expect(topicQuestionBuilder).toContain("Build the route");
    expect(topicQuestionBuilder).toContain("data-question-concern");
    expect(topicQuestionBuilder).toContain("data-question-status");
    expect(topicQuestionBuilder).toContain("data-question-statuses");
    expect(topicQuestionBuilder).toContain("data-question-copy-link");
    expect(topicQuestionBuilder).toContain("No pathway is currently released");
    expect(topicQuestionBuilder).toContain("navigator.clipboard.writeText(routeUrl())");
    expect(topicQuestionBuilder).toContain("No route matches all three selections exactly");
    expect(topicQuestionBuilder).not.toMatch(/fetch\s*\(/);
    expect(topicVolumeMatrix).toContain("Six fields across four volumes.");
    expect(topicVolumeMatrix).toContain("<table");
    expect(topicVolumeMatrix).toContain("data-matrix-cell");
    expect(topicVolumeMatrix).toContain("aria-label");
    expect(topicVolumeMatrix).toContain("data-matrix-links");
    expect(topicVolumeMatrix).toContain("replaceState");
    expect(topicReviewQueue).toContain("signal.status");
    expect(topicReviewQueue).toContain("Metadata only · not a published article");
    expect(topicSpineNavigator).toContain(
      'aria-label="Explore the Independent Observer research spine"',
    );
    expect(topicSpineNavigator).toContain("seriesItems.map");
    expect(topicSpineNavigator).toContain("topicPluginDefinitions.map");
  });

  it("plugs each pathway into core ideas, volumes, and public entry points", () => {
    const topicPathwaysComponent = readFileSync(
      join(sourceRoot, "components/TopicPathways.astro"),
      "utf8",
    );
    expect(topicPathwaysComponent).toContain("Five routes, plugged into the work.");
    expect(topicPathwaysComponent).toContain("Discovery plugin");
    expect(topicPathwaysComponent).toContain("Core ideas");
    expect(topicPathwaysComponent).toContain("Follow the work");
    expect(topicPathwaysComponent).toContain("Relevant volumes");
    expect(topicPathwaysComponent).toContain("slugify(volume.title)");
    expect(startIndex).toContain("<TopicVolumeMap />");
    expect(startIndex).toContain("Explore the four volumes in development.");
    expect(startIndex).toContain("Siddhartha Harsh Wardhan");
    expect(startIndex).toContain("Understand Volume I’s method");
    expect(startIndex).toContain("Explore Volume IV: AI and labor");
    expect(startIndex).toContain("Connect democracy to Volume IV capacity");
    expect(startIndex).toContain("Explore Volume IV: science and capability");
    expect(startIndex).toContain("Explore Volumes II–III: migration and political economy");
    expect(startIndex).toContain("time, resources, distance, and economic position");
    expect(startIndex).toContain("The Autonomous Illusion");
    expect(startIndex.indexOf("<TopicVolumeMap />")).toBeLessThan(
      startIndex.indexOf('<section class="section section-white">'),
    );
    expect(startIndex).toContain("topic-pathway-method");
    expect(topicVolumeMap).toContain("Public entry points");
    expect(topicVolumeMap).toContain("connection.coreIdeas");
    expect(topicVolumeMap).toContain("connection.contentLinks");
    expect(topicVolumeMap).toContain("topic-volume-${slugify(item.volume)}");
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
    expect(
      Object.values(volumeTopicConnections).every(
        (connection: { coreIdeas: string[]; contentLinks: unknown[] }) =>
          connection.coreIdeas.length >= 3 && connection.contentLinks.length >= 2,
      ),
    ).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { reviewedRevisions } from "../data/publication-revisions";
import { publicDocumentItems } from "../data/documents";
import { citationDate, exportCitation } from "../lib/citations";
import { correctionContext } from "../lib/corrections";
import { readListeningProgress, resumablePosition } from "../lib/listening-progress";
import { searchItems } from "../data/search-index";
import { rankSearchEntries } from "../lib/search";
import { readingJourneys } from "../data/reading-journeys";
import { historyPodcastEpisodes } from "../data/podcast";
import cues from "../data/podcast-cues.json";
describe("reader journeys and data boundaries", () => {
  it("only publishes approved revisions linked to real paper sections", () => {
    const document = publicDocumentItems[0];
    const revision = {
      id: "test",
      documentId: document.id,
      date: "2026-09-06",
      approved: false,
      change: "Corrected a source",
      reason: "The source changed",
      affectedSection: document.sections[0].id,
    };
    expect(reviewedRevisions([revision])).toEqual([]);
    expect(reviewedRevisions([{ ...revision, approved: true }])[0].route).toContain(document.id);
    expect(() =>
      reviewedRevisions([{ ...revision, approved: true, affectedSection: "missing" }]),
    ).toThrow();
  });
  it("finds episode titles and passages that occur only in the transcript", () => {
    expect(
      rankSearchEntries(searchItems, "Observation Before Judgment", { type: "Podcast" })[0].id,
    ).toBe("podcast:1");
    expect(
      rankSearchEntries(searchItems, "A timeline is not yet an explanation", {
        type: "Podcast",
      }).some((entry) => entry.id === "podcast:1"),
    ).toBe(true);
    expect(searchItems.filter((entry) => entry.type === "Podcast")).toHaveLength(4);
    expect(
      searchItems.every(
        (entry) => !entry.href.includes("/review/") && !entry.href.includes("/private/"),
      ),
    ).toBe(true);
  });
  it("connects each reading journey to three existing public papers and an episode", () => {
    expect(readingJourneys).toHaveLength(4);
    for (const journey of readingJourneys) {
      expect(journey.papers).toHaveLength(3);
      expect(new Set(journey.papers.map((p) => p.id)).size).toBe(3);
      expect(historyPodcastEpisodes.some((e) => e.number === journey.episode)).toBe(true);
    }
  });
  it("keeps original audio and provides smaller streaming derivatives with monotonic approximate cues", () => {
    for (const episode of historyPodcastEpisodes) {
      const data =
        cues[
          episode.audioUrl
            .split("/")
            .pop()!
            .replace(/\.wav$/, "") as keyof typeof cues
        ];
      const starts = data.starts;
      expect(starts).toHaveLength(episode.script.split(/\n\s*\n/).filter(Boolean).length);
      expect(starts[0]).toBe(0);
      expect(
        starts.every(
          (value, i) => value >= 0 && value < data.duration && (!i || value > starts[i - 1]),
        ),
      ).toBe(true);
      expect(statSync(`public${episode.audioUrl.replace(/\.wav$/, ".m4a")}`).size).toBeLessThan(
        statSync(`public${episode.audioUrl}`).size * 0.3,
      );
    }
  });
  it("rejects corrupt, unknown and nonfinite listening state and resets completed episodes", () => {
    expect(
      readListeningProgress(
        '{"episode-01":{"position":42,"updated":1},"evil":{"position":42,"updated":1}}',
      ),
    ).toEqual({ "episode-01": { position: 42, updated: 1 } });
    for (const raw of [
      "null",
      "[]",
      "bad",
      '{"episode-01":{"position":-1,"updated":0}}',
      '{"episode-01":null}',
    ])
      expect(readListeningProgress(raw)).toEqual({});
    expect(resumablePosition(42, 272)).toBe(42);
    for (const position of [0, 270, 999, NaN, Infinity])
      expect(resumablePosition(position, 272)).toBe(0);
  });
  it("exports valid citation dates and refuses fabricated or impossible dates", () => {
    expect(citationDate("23 September 2025")).toBe("2025-09-23");
    expect(citationDate("2024-02-29")).toBe("2024-02-29");
    for (const date of ["31 February 2026", "2026-02-29", "2026-13-01", "unknown", undefined])
      expect(citationDate(date)).toBeNull();
    const record = {
      id: "test",
      title: "A {claim} & a limit",
      author: "Author",
      publicationDate: "2026-09-06",
      sourceLabel: "Public record",
    };
    expect(exportCitation(record, "bib")).toContain("A \\{claim\\} \\& a limit");
    expect(exportCitation(record, "ris")).toContain("TY  - GEN\n");
    expect(exportCitation({ ...record, author: "A\nER  -" }, "ris")).toContain("AU  - A ER  -\n");
    expect(exportCitation({ ...record, publicationDate: undefined }, "bib")).toBeNull();
  });
  it("prefills safe correction context without allowing external or executable page URLs", () => {
    expect(correctionContext("?page=%2Flibrary%2Fdocuments%2Ftest%2F&section=Sources")).toContain(
      "Section: Sources",
    );
    for (const page of ["javascript:alert(1)", "//evil.test", "/\\evil.test", "/bad\nheader"])
      expect(correctionContext(`?page=${encodeURIComponent(page)}`)).toBe("");
  });
  it("keeps the dashboard outside Astro public routes and deployment assets", () => {
    const source = readFileSync("scripts/publishing-dashboard.ts", "utf8");
    expect(source).toContain('server.listen(port, "127.0.0.1"');
    expect(source).toContain("request.headers.host");
  });
});

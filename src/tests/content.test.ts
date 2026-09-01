import { describe, expect, it } from "vitest";
import { documentaryItems, researchItems, topics, videoItems } from "../data/content";
import { dropboxDocumentItems, dropboxFeedItems } from "../data/dropbox-content.generated";
import { publicDocumentItems } from "../data/documents";
import { paperDocuments } from "../data/papers";
import { seriesItems } from "../data/series";
import { publicLibrarySnapshot } from "../data/public-library";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { volumeResearchMap } from "../data/volume-research";
import { volumeTwoFramework } from "../data/volume-two-framework";
import { volumeFourClaimMap, volumeFourEvidence } from "../data/volume-four-evidence";
import { volumeReels } from "../data/video-reels";
import { volumeOneSourceMap, volumeOneSourceMapSummary } from "../data/volume-one-source-map";

describe("editorial preview data", () => {
  it("keeps all sample work clearly labeled as unfinished", () => {
    const items = [...researchItems, ...documentaryItems, ...videoItems];
    expect(items.length).toBeGreaterThan(0);
    expect(
      items.every((item) => item.status.includes("preview") || item.status.includes("development")),
    ).toBe(true);
  });

  it("does not expose known template video cards as editorial work", () => {
    expect(videoItems.map((item) => item.title)).toEqual([
      "Why Evidence Alone Is Not Enough",
      "The Cost of Looking Away",
    ]);
    expect(videoItems.map((item) => item.description).join(" ")).not.toMatch(
      /sample video entry|placeholder for a future explainer/i,
    );
  });

  it("provides all six core topic categories", () => {
    expect(topics.map((topic) => topic.name)).toEqual([
      "History",
      "Politics",
      "Economics",
      "Law",
      "Science",
      "Technology",
    ]);
  });

  it("keeps the Dropbox-derived series roadmap preview-only", () => {
    expect(seriesItems).toHaveLength(4);
    expect(seriesItems.map((item) => item.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      seriesItems.every(
        (item) => item.status.includes("preview") || item.status.includes("development"),
      ),
    ).toBe(true);
  });

  it("gives Volume I a substantive method brief", () => {
    const volumeOne = seriesItems.find((item) => item.volume === "Volume I");
    expect(volumeOne?.description).toContain("how a public claim becomes believable");
    expect(volumeOne?.description).toContain("law, labor, media, history, public memory");
    expect(volumeOne?.description).toContain("disciplined observation before judgment");
    expect(volumeOne?.description).toContain("not a finished publication");
    expect(volumeOne?.detailLead).toContain("working papers about opportunity, wealth, attention");
    expect(volumeOne?.detailSections).toHaveLength(3);
    expect(
      volumeOne?.detailSections
        ?.flatMap((section) => [...(section.paragraphs ?? []), ...(section.items ?? [])])
        .join(" "),
    ).toContain("From Plato to Chomsky");
    expect(
      volumeOne?.detailSections
        ?.flatMap((section) => [...(section.paragraphs ?? []), ...(section.items ?? [])])
        .join(" "),
    ).toContain("Three Volume I papers currently have matched public paper records");
  });

  it("maps the reviewed Volume I source package without exposing raw files", () => {
    expect(volumeOneSourceMap).toHaveLength(9);
    expect(volumeOneSourceMapSummary.total).toBe(9);
    expect(volumeOneSourceMapSummary.publicRecordCount).toBe(3);
    expect(volumeOneSourceMap.filter((source) => source.href)).toHaveLength(3);
    expect(
      volumeOneSourceMap.find((source) => source.id === "from-plato-to-chomsky")?.summary,
    ).toContain("civic capacity");
    expect(
      volumeOneSourceMap.find((source) => source.id === "study-the-wall-audit")?.status,
    ).toContain("not verified");
    expect(
      volumeOneSourceMap.every(
        (source) =>
          `${source.title} ${source.summary} ${source.contribution}`.match(
            /dropbox|library\/cloudstorage|\/users\//i,
          ) === null,
      ),
    ).toBe(true);
  });

  it("gives Volume II a taxonomy-backed four-family and four-principle frame", () => {
    const volumeTwo = seriesItems.find((item) => item.volume === "Volume II");

    expect(volumeTwo?.description).toContain("four families");
    expect(volumeTwo?.description).toContain("practical sovereignty");
    expect(volumeTwoFramework.families).toHaveLength(4);
    expect(volumeTwoFramework.principles).toHaveLength(4);
    expect(volumeTwoFramework.families.map((family) => family.title)).toEqual([
      "Democracy, institutions, and party power",
      "Immigration, citizenship, and border",
      "Civil rights, carceral state, and legal power",
      "Empire, geopolitics, and sovereignty",
    ]);
    expect(volumeTwoFramework.principles.map((principle) => principle.title)).toEqual([
      "Formal democracy is not the same as usable power.",
      "Definitions are part of evidence.",
      "Sovereignty is relational and material.",
      "Enforcement reveals how power is organized.",
    ]);
    expect(
      volumeTwoFramework.families.every((family) => family.fullTitle.length > family.title.length),
    ).toBe(true);
    expect(volumeTwoFramework.families.every((family) => family.significance.length > 100)).toBe(
      true,
    );
    expect(volumeTwoFramework.families.every((family) => family.papers.length >= 4)).toBe(true);
    expect(
      volumeTwoFramework.families
        .flatMap((family) => family.papers)
        .filter((paper) => paper.status === "Public paper record"),
    ).toHaveLength(7);
  });

  it("gives Volume IV a descriptive capability and technology brief", () => {
    const volumeFour = seriesItems.find((item) => item.volume === "Volume IV");

    expect(volumeFour?.description).toContain("usable human capacity");
    expect(volumeFour?.description).toContain(
      "quantum computing, medical technology, neuroprosthetics",
    );
    expect(volumeFour?.description).toContain("human agency");
    expect(volumeFourEvidence).toHaveLength(7);
    expect(volumeFourEvidence.map((block) => block.category)).toEqual([
      "Documented fact",
      "Interpretation",
      "Hypothesis",
      "Policy proposal",
      "Limitation",
      "Counterargument",
      "Unresolved question",
    ]);
    expect(volumeFourClaimMap.claim).toContain("human capability");
    expect(volumeFourClaimMap.mechanism).toContain("Compute, energy, data");
  });

  it("maps public usage signals to every volume without calling them ratings", () => {
    expect(volumeResearchMap.map((item) => item.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      volumeResearchMap.every((item) => item.papers.every((paper) => paper.volume === item.volume)),
    ).toBe(true);
    expect(volumeResearchMap.find((item) => item.volume === "Volume I")?.papers[0]?.id).toBe(
      "the-illusion-of-equality",
    );
    expect(volumeResearchMap.find((item) => item.volume === "Volume II")?.papers[0]?.id).toBe(
      "who-deported-more",
    );
    expect(volumeResearchMap.find((item) => item.volume === "Volume IV")?.papers[0]?.id).toBe(
      "entanglement-primer",
    );
  });

  it("gives The Autonomous Illusion a substantive, still-preview-safe brief", () => {
    const entry = researchItems.find((item) => item.title === "The Autonomous Illusion");
    expect(entry?.description).toContain("compute, energy, data, maintenance");
    expect(entry?.detailLead).toContain("physical infrastructure");
    expect(entry?.detailSections).toHaveLength(3);
    expect(entry?.status).toBe("Concept preview");
  });

  it("connects the institutional-power concept to Volume III without publishing its source reservoir", () => {
    const entry = researchItems.find(
      (item) => item.title === "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    );
    expect(entry?.volume).toBe("Volume III");
    expect(entry?.detailLead).toContain("Volume III-connected");
    expect(entry?.detailSections?.[0]?.heading).toBe("Volume III connection");
    expect(
      entry?.detailSections?.flatMap((section) => section.paragraphs ?? []).join(" "),
    ).toContain("Terry v. Ohio");
    expect(
      entry?.detailSections?.flatMap((section) => section.paragraphs ?? []).join(" "),
    ).toContain("mass incarceration");
    expect(
      entry?.detailSections?.flatMap((section) => section.paragraphs ?? []).join(" "),
    ).toContain("Welfare, Wealthfare");
    expect(
      entry?.detailSections?.find((section) => section.heading === "Volume II context")?.paragraphs,
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Democracy's Achilles' Heel"),
        expect.stringContaining("not a released Independent Observer publication"),
      ]),
    );
    expect(
      entry?.detailSections?.find((section) => section.heading === "Volume III research directions")
        ?.items,
    ).toEqual(expect.arrayContaining([expect.stringContaining("single-cause")]));
    expect(entry?.sourceNote).toContain("Raw source files");
    expect(entry?.status).toBe("In editorial development");
  });

  it("connects The Cost of Looking Away to Volume II evidence without publishing it", () => {
    const entry = videoItems.find((item) => item.title === "The Cost of Looking Away");
    expect(entry?.volume).toBe("Volume II · Democracy & Institutions");
    expect(entry?.category).toContain("Democratic capacity");
    expect(entry?.description).toContain("public record");
    expect(
      entry?.detailSections?.some(
        (section) => section.heading === "What the public-safe audit establishes",
      ),
    ).toBe(true);
    expect(
      entry?.detailSections?.flatMap((section) => section.paragraphs ?? []).join(" "),
    ).toContain("158 million counted ballots");
    expect(
      entry?.sourceLinks?.every((source) => source.url.startsWith("https://www.eac.gov/")),
    ).toBe(true);
    expect(entry?.status).toBe("Concept preview");
  });

  it("fills the documentary desk with a Volume IV capability concept", () => {
    const entry = documentaryItems.find((item) => item.title === "The Work Behind the Machine");

    expect(entry?.volume).toBe("Volume IV");
    expect(entry?.category).toContain("AI & Human Capability");
    expect(entry?.description).toContain("compute, energy, education, care, maintenance");
    expect(entry?.detailLead).toContain("usable human capability");
    expect(entry?.detailSections).toHaveLength(3);
    expect(entry?.detailSections?.[1]?.items).toEqual(
      expect.arrayContaining([expect.stringContaining("replaced, reorganized, augmented")]),
    );
    expect(entry?.sourceNote).toContain("Public author paper pages");
    expect(entry?.status).toBe("Concept preview");
  });

  it("gives the evidence video a descriptive, method-connected brief", () => {
    const entry = videoItems.find((item) => item.title === "Why Evidence Alone Is Not Enough");

    expect(entry?.description).toContain("authenticated, interpreted");
    expect(entry?.description).toContain("institutional review");
    expect(entry?.detailHeading).toBe("What this video is for.");
    expect(entry?.detailLead).toContain("missing steps between a record and a public response");
    expect(entry?.detailSections?.[0]?.heading).toBe("What the video follows");
    expect(entry?.detailSections?.[0]?.items).toEqual(
      expect.arrayContaining([expect.stringContaining("The institutional test")]),
    );
  });

  it("provides a public-safe preview reel library for every volume", () => {
    expect(volumeReels).toHaveLength(13);
    expect(new Set(volumeReels.map((reel) => reel.mediaUrl)).size).toBe(volumeReels.length);
    expect(new Set(volumeReels.map((reel) => reel.volume))).toEqual(
      new Set(["Series overview", "Volume I", "Volume II", "Volume III", "Volume IV"]),
    );
    expect(volumeReels.filter((reel) => reel.volume === "Series overview")).toHaveLength(1);
    expect(volumeReels.filter((reel) => reel.volume === "Volume I")).toHaveLength(3);
    expect(volumeReels.filter((reel) => reel.volume === "Volume II")).toHaveLength(4);
    expect(volumeReels.filter((reel) => reel.volume === "Volume III")).toHaveLength(3);
    expect(volumeReels.filter((reel) => reel.volume === "Volume IV")).toHaveLength(2);
    expect(volumeReels.find((reel) => reel.volume === "Series overview")).toMatchObject({
      title: "Is This the Life We Want? | Independent Observer",
      mediaUrl: "/media/reels/is-this-the-life-we-want-independent-observer.mp4",
      posterUrl: "/media/reels/is-this-the-life-we-want-independent-observer-poster.png",
    });
    expect(volumeReels.every((reel) => reel.mediaType === "video/mp4")).toBe(true);
    expect(volumeReels.every((reel) => reel.sourceNote.includes("Preview asset"))).toBe(true);
    expect(volumeReels.every((reel) => reel.description.length > 100)).toBe(true);
  });

  it("keeps automated Dropbox items within the public-safe status contract", () => {
    expect(
      dropboxFeedItems.every(
        (item) => item.status.includes("preview") || item.status.includes("development"),
      ),
    ).toBe(true);
  });

  it("publishes only structured document sections", () => {
    expect(publicDocumentItems.length).toBeGreaterThan(0);
    expect(
      publicDocumentItems.every(
        (entry) =>
          entry.sourceLabel.length > 0 &&
          entry.sections.length > 0 &&
          entry.sections.every(
            (section) =>
              section.id.length > 0 &&
              section.heading.length > 0 &&
              ((section.paragraphs?.length ?? 0) > 0 || (section.items?.length ?? 0) > 0),
          ),
      ),
    ).toBe(true);
    expect(
      dropboxDocumentItems.every(
        (entry) => entry.sections.length > 0 && entry.sourceLabel.length > 0,
      ),
    ).toBe(true);
  });

  it("keeps author-controlled papers ranked by archived usage signals and clearly labeled", () => {
    expect(paperDocuments.length).toBeGreaterThanOrEqual(5);
    expect(paperDocuments[0]?.id).toBe("who-deported-more");
    expect(paperDocuments.every((entry) => entry.status === "Author working paper")).toBe(true);
    expect(
      paperDocuments.every(
        (entry) =>
          entry.metrics?.downloads !== undefined &&
          entry.metrics?.abstractViews !== undefined &&
          entry.sourceFingerprintSha256?.length === 64,
      ),
    ).toBe(true);
    expect(paperDocuments.some((entry) => entry.title.includes("Who Deported More"))).toBe(true);
    expect(
      paperDocuments.find((entry) => entry.id === "who-deported-more")?.researchGateUrl,
    ).toContain("researchgate.net/publication/396491871");
    expect(
      paperDocuments.find((entry) => entry.id === "disconnected-hearts")?.researchGateUrl,
    ).toContain("researchgate.net/publication/397333270");
    expect(paperDocuments.filter((entry) => entry.researchGateUrl)).toHaveLength(18);
    expect(
      paperDocuments.filter((entry) => !entry.researchGateUrl).map((entry) => entry.id),
    ).toEqual(["latino-irony", "empire-of-distraction", "children-left-behind-after-a-war"]);
    expect(paperDocuments.map((entry) => entry.id)).toEqual(
      expect.arrayContaining([
        "citizens-without-a-country",
        "empire-of-distraction",
        "geography-of-enslaved-wealth",
        "two-masks-one-face",
        "children-left-behind-after-a-war",
        "lottery-of-luck",
        "entanglement-primer",
        "entanglement-foundations",
      ]),
    );
  });

  it("includes the three verified public Volume I author papers", () => {
    const volumeOnePapers = paperDocuments.filter((entry) => entry.volume === "Volume I");

    expect(volumeOnePapers.map((entry) => entry.id)).toEqual(
      expect.arrayContaining([
        "independent-observer-volume-one",
        "a-systems-centered-manifesto",
        "the-illusion-of-equality",
      ]),
    );
    expect(volumeOnePapers).toHaveLength(3);
    expect(volumeOnePapers.every((entry) => Boolean(entry.volumeRelevance))).toBe(true);
  });
});

describe("public library data", () => {
  it("keeps the Dropbox-derived archive summary public-safe", () => {
    expect(libraryVolumeGuides).toHaveLength(4);
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Public volume summaries")?.value,
    ).toBe("4");
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Raw archive files published")
        ?.value,
    ).toBe("0");
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Hosted operating standards")
        ?.value,
    ).toBe("1");
    expect(
      publicLibrarySnapshot.areas.every((area) => area.privateCount.includes("private archive")),
    ).toBe(true);
  });

  it("explains the Who Deported More paper's data and media significance", () => {
    const entry = paperDocuments.find((item) => item.id === "who-deported-more");
    const abstract = entry?.sections.find((section) => section.id === "abstract")?.paragraphs?.[0];

    expect(abstract).toContain("This working paper clarifies commonly conflated measures");
    expect(abstract).toContain("prosecutorial discretion, detainer policies, expedited removal");
    expect(abstract).toContain("enhancing data transparency and comparability");
    expect(entry?.sections.find((section) => section.id === "reading-points")?.heading).toBe(
      "What the paper examines",
    );
    expect(entry?.sections.find((section) => section.id === "reading-points")?.items).toEqual(
      expect.arrayContaining([
        expect.stringContaining("DHS Yearbook of Immigration Statistics"),
        expect.stringContaining("FY2023–FY2024"),
        expect.stringContaining("Title 42 public-health expulsions"),
        expect.stringContaining("tidy CSV, codebook"),
        expect.stringContaining("prosecutorial discretion"),
      ]),
    );
  });
});

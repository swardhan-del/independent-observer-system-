import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rankSearchEntries, normalizeSearchText } from "../lib/search";
import { migrateReadingList, sortReadingList } from "../lib/reading-list";
import { relatedRecords } from "../lib/related";
import { volumeResearchMap } from "../data/volume-research";
import { seriesItems } from "../data/series";
import {
  volumeThreeResearchLenses,
  volumeThreeResearchRecords,
} from "../data/volume-three-research";
import { researchCatalogueRecords, researchCatalogueVolumes } from "../lib/research-catalogue";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { volumeTopicConnections } from "../../plugins/topic-discovery/catalog";

const sourceRoot = join(process.cwd(), "src");
const header = readFileSync(join(sourceRoot, "components/Header.astro"), "utf8");
const ambientSound = readFileSync(join(sourceRoot, "components/AmbientSoundControl.astro"), "utf8");
const search = readFileSync(join(sourceRoot, "components/SiteSearch.astro"), "utf8");
const filter = readFileSync(join(sourceRoot, "components/ContentFilter.astro"), "utf8");
const card = readFileSync(join(sourceRoot, "components/EditorialCard.astro"), "utf8");
const readingList = readFileSync(join(sourceRoot, "components/ReadingList.astro"), "utf8");
const layout = readFileSync(join(sourceRoot, "layouts/BaseLayout.astro"), "utf8");
const series = readFileSync(join(sourceRoot, "pages/series/index.astro"), "utf8");
const catalogue = readFileSync(join(sourceRoot, "components/PublicationCatalogue.astro"), "utf8");
const reader = readFileSync(join(sourceRoot, "components/DocumentReader.astro"), "utf8");
const readerVolumeContext = readFileSync(
  join(sourceRoot, "components/ReaderVolumeContext.astro"),
  "utf8",
);
const evidence = readFileSync(join(sourceRoot, "components/EvidenceLayer.astro"), "utf8");
const volumeOneEvidence = readFileSync(join(sourceRoot, "data/volume-one-evidence.ts"), "utf8");
const volumeThreeEvidence = readFileSync(join(sourceRoot, "data/volume-three-evidence.ts"), "utf8");
const volumeFourEvidence = readFileSync(join(sourceRoot, "data/volume-four-evidence.ts"), "utf8");
const detail = readFileSync(join(sourceRoot, "components/EditorialDetail.astro"), "utf8");
const volumeResearchMapSource = readFileSync(
  join(sourceRoot, "components/VolumeResearchMap.astro"),
  "utf8",
);
const volumeResearchDossier = readFileSync(
  join(sourceRoot, "components/VolumeResearchDossier.astro"),
  "utf8",
);
const seriesDetail = readFileSync(join(sourceRoot, "pages/series/[slug].astro"), "utf8");
const researchPage = readFileSync(join(sourceRoot, "pages/research/[slug].astro"), "utf8");
const about = readFileSync(join(sourceRoot, "pages/about/index.astro"), "utf8");
const aboutVolumeAtlas = readFileSync(
  join(sourceRoot, "components/AboutVolumeAtlas.astro"),
  "utf8",
);
const homepage = readFileSync(join(sourceRoot, "pages/index.astro"), "utf8");
const papersSource = readFileSync(join(sourceRoot, "data/papers.ts"), "utf8");
const homepageVolumeGuide = readFileSync(
  join(sourceRoot, "components/HomepageVolumeGuide.astro"),
  "utf8",
);
const videos = readFileSync(join(sourceRoot, "pages/videos/index.astro"), "utf8");
const volumeVisualStrip = readFileSync(
  join(sourceRoot, "components/VolumeVisualStrip.astro"),
  "utf8",
);
const bookRoadmap = readFileSync(join(sourceRoot, "components/BookRoadmap.astro"), "utf8");
const reelTreatmentShelf = readFileSync(
  join(sourceRoot, "components/ReelTreatmentShelf.astro"),
  "utf8",
);
const reelTreatmentData = readFileSync(join(sourceRoot, "data/video-reel-treatments.ts"), "utf8");
const stylesheet = readFileSync(join(sourceRoot, "styles/global.css"), "utf8");
const videoDetail = readFileSync(join(sourceRoot, "pages/videos/[slug].astro"), "utf8");
const documentaries = readFileSync(join(sourceRoot, "pages/documentaries/index.astro"), "utf8");
const contact = readFileSync(join(sourceRoot, "pages/contact/index.astro"), "utf8");
const researchCatalogue = readFileSync(
  join(sourceRoot, "components/ResearchCatalogue.astro"),
  "utf8",
);

describe("interactive preview tools", () => {
  it("keeps ambient sound opt-in and browser-local", () => {
    expect(header).toContain("<AmbientSoundControl />");
    expect(ambientSound).toContain("data-ambient-sound-toggle");
    expect(ambientSound).toContain('aria-pressed="false"');
    expect(ambientSound).toContain("AudioContext");
    expect(ambientSound).toContain("historical archive theme");
    expect(ambientSound).toContain("Dorian chamber phrase");
    expect(ambientSound).toContain("chordProgression");
    expect(ambientSound).not.toContain("autoplay");
    expect(ambientSound).not.toContain("fetch(");
  });

  it("ships browser-local site search without a collection endpoint", () => {
    expect(header).toContain("<SiteSearch />");
    expect(search).toContain("data-search-open");
    expect(search).toContain("data-search-results");
    expect(search).toContain("Search runs in your browser");
    expect(search).not.toMatch(/fetch\s*\(/);
    expect(search).toContain("ArrowDown");
    expect(search).toContain("data-search-filter");
    expect(search).toContain("highlightTokens");
    expect(search).toContain("volumeReels.map");
    expect(search).toContain("playable preview reel");
  });

  it("ships accessible client-side filters for editorial previews", () => {
    expect(filter).toContain('aria-pressed="true"');
    expect(filter).toContain("data-filter-query");
    expect(filter).toContain("data-filter-empty");
    expect(filter).toContain("data-filter-reset");
    expect(filter).toContain("URLSearchParams");
    expect(filter).toContain("replaceState");
    expect(card).toContain("data-filter-card");
    expect(card).toContain("data-search-text");
    expect(series).toContain("<PublicationCatalogue />");
    expect(catalogue).toContain("data-publication-catalogue");
    expect(catalogue).toContain("data-catalogue-query");
    expect(catalogue).toContain("data-catalogue-volume");
    expect(catalogue).toContain("data-catalogue-status");
    expect(catalogue).toContain("data-catalogue-paper-count");
    expect(catalogue).toContain("Matched public reading copies");
    expect(catalogue).toContain("paper.researchGateUrl");
    expect(catalogue).toContain("paper.category");
    expect(catalogue).toContain("replaceState");
  });

  it("ships a transparent inquiry form without creating a collection endpoint", () => {
    expect(readFileSync(join(sourceRoot, "pages/index.astro"), "utf8")).toContain(
      'aria-label="Newsletter preview"',
    );
    expect(contact).toContain("Questions about Independent Observer.");
    expect(contact).toContain("<form");
    expect(contact).toContain("contact-name");
    expect(contact).toContain("contact-disclosure");
    expect(contact).toContain("mailto:");
    expect(contact).toContain("encodeURIComponent");
    expect(contact).toContain("Nothing is stored by this site");
    expect(contact).toContain("Questions and discussion");
    expect(contact).not.toContain("Contact is not open yet.");
    expect(contact).not.toContain("No email address or message form is active.");
  });

  it("renders a visible public source trail and release boundary for annotated previews", () => {
    expect(detail).toContain("Public source trail");
    expect(detail).toContain("Evidence with a release boundary.");
    expect(detail).toContain('target="_blank"');
    expect(detail).toContain('rel="noreferrer"');
    expect(detail).toContain("evidenceBlocks");
    expect(detail).toContain("selectedClaimMap");
    expect(detail).toContain("showArgumentFramework");
    expect(evidence).toContain("Publication status");
    expect(evidence).toContain("data-evidence-filter");
    expect(evidence).toContain("sitePath");
    expect(volumeThreeEvidence).toContain("internal: true");
  });

  it("places Volume I's verified author papers inside its public preview", () => {
    expect(seriesDetail).toContain("showVolumePapersInPreview");
    expect(detail).toContain("Author papers with reviewed public records.");
    expect(detail).toContain("Why it matters to Volume I.");
    expect(detail).toContain("Other files marked");
    expect(detail).toContain("volumeReels");
    expect(detail).toContain("detail-volume-paper-media");
    expect(detail).toContain("Related preview reel");
  });

  it("gives the Volume II taxonomy full family briefs and paper-level context", () => {
    expect(detail).toContain("family.fullTitle");
    expect(detail).toContain("Why it matters to Volume II.");
    expect(detail).toContain("Guiding principle.");
    expect(detail).toContain("Representative paper titles and descriptions");
    expect(detail).toContain("family.papers");
    expect(detail).toContain("paper.status");
  });

  it("gives Volume III one source-labeled paper a complete evidence reading", () => {
    expect(seriesDetail).toContain("volumeThreeTaxDoctrineEvidence");
    expect(seriesDetail).toContain("Case study: The Wardhan Tax Doctrine");
    expect(volumeThreeEvidence).toContain("author-controlled paper record");
    expect(volumeThreeEvidence).toContain("Documented fact");
    expect(volumeThreeEvidence).toContain("Interpretation");
    expect(volumeThreeEvidence).toContain("Hypothesis");
    expect(volumeThreeEvidence).toContain("Policy proposal");
    expect(volumeThreeEvidence).toContain("Limitation");
    expect(volumeThreeEvidence).toContain("Counterargument");
    expect(volumeThreeEvidence).toContain("Unresolved question");
    expect(volumeThreeEvidence).toContain("No official fiscal score");
    expect(volumeThreeEvidence).not.toContain("confidence score");
  });

  it("gives Volume I a populated method-specific evidence layer and claim map", () => {
    expect(seriesDetail).toContain("volumeOneEvidence");
    expect(seriesDetail).toContain("volumeOneClaimMap");
    expect(seriesDetail).toContain("Volume I: from evidence to democratic capacity");
    expect(volumeOneEvidence).toContain("Foundational Manifesto");
    expect(volumeOneEvidence).toContain("information asymmetry");
    expect(volumeOneEvidence).toContain("usable democratic capacity");
    expect(volumeOneEvidence).toContain("correctable");
    expect(volumeOneEvidence).toContain("not a peer-reviewed thesis");
    expect(volumeOneEvidence).not.toContain("Reserved for the eventual, reviewed thesis");
  });

  it("gives Volume IV a populated capability-specific evidence layer and claim map", () => {
    expect(seriesDetail).toContain("volumeFourEvidence");
    expect(seriesDetail).toContain("volumeFourClaimMap");
    expect(seriesDetail).toContain("Volume IV: from technology to human capability");
    expect(volumeFourEvidence).toContain("The Last Human Workforce");
    expect(volumeFourEvidence).toContain("understandable, maintainable, teachable");
    expect(volumeFourEvidence).toContain("not an established causal finding");
    expect(volumeFourEvidence).toContain("not a finished publication");
    expect(volumeFourEvidence).toContain("What evidence would show");
    expect(volumeFourEvidence).not.toContain("Reserved for the eventual, reviewed thesis");
  });

  it("connects public document readers to their volume without repeating every paper", () => {
    expect(reader).toContain("paperDocuments");
    expect(reader).toContain('section.id === "publication-boundary"');
    expect(reader).toContain("<ReaderVolumeContext");
    expect(readerVolumeContext).toContain("public author-paper records");
    expect(readerVolumeContext).toContain("without repeating their descriptions");
    expect(readerVolumeContext).toContain("Open the {entry.volume} catalogue");
    expect(readerVolumeContext).not.toContain("volumeDocuments.map");
    expect(readerVolumeContext).toContain("human approval gates");
    expect(papersSource).toContain(
      "author-paper catalogue entry connected to the Independent Observer program",
    );
    expect(papersSource).not.toContain(
      "curated public reading copy assembled from the matching Dropbox",
    );
  });

  it("keeps the research desk distinct while mapping essays across all four volumes", () => {
    expect(researchPage).not.toContain("showVolumeResearchMap={true}");
    expect(detail).toContain("showVolumeResearchMap?: boolean");
    expect(detail).toContain("<VolumeResearchMap currentVolume={item.volume} />");
    expect(volumeResearchMapSource).toContain("Research and essays across four volumes.");
    expect(volumeResearchMapSource).toContain("not another publication-status category");
    expect(volumeResearchMapSource).toContain("libraryVolumeGuides");
    expect(volumeResearchMapSource).toContain("volume.papers");
    expect(volumeResearchMapSource).toContain("Current volume for this entry");
    expect(volumeResearchMap).toHaveLength(4);
    expect(volumeResearchMap.every((volume) => volume.papers.length > 0)).toBe(true);
  });

  it("connects the homepage volume guide to every public paper without implying release", () => {
    expect(homepageVolumeGuide).toContain("paperDocuments");
    expect(homepageVolumeGuide).toContain("papersByVolume");
    expect(homepageVolumeGuide).toContain("public ");
    expect(homepageVolumeGuide).toContain("currently indexed");
    expect(homepageVolumeGuide).toMatch(/Archived distribution signal\s+only/);
    expect(homepageVolumeGuide).toContain("until its own release");
    expect(homepageVolumeGuide).toContain("gate is complete");
    expect(homepageVolumeGuide).toContain("/library/documents/${paper.id}/");
  });

  it("keeps the homepage hero high and makes its volume index visibly actionable", () => {
    expect(homepage).toContain("Choose a volume to enter the research");
    expect(homepage).toContain('aria-label="Explore the four volumes"');
  });

  it("connects Volume III catalogue work to public-safe research directions", () => {
    expect(seriesDetail).toContain("showVolumeResearchDossier");
    expect(seriesDetail).toContain('item.volume === "Volume III"');
    expect(volumeResearchDossier).toContain("data-volume-three-dossier");
    expect(volumeResearchDossier).toContain("data-volume-dossier-query");
    expect(volumeResearchDossier).toContain("data-dossier-lens");
    expect(volumeResearchDossier).toContain("searchParams");
    expect(volumeResearchDossier).toContain("replaceState");
    expect(volumeResearchDossier).toContain("data-dossier-clear-search");
    expect(volumeResearchDossier).toContain("data-dossier-clear-lens");
    expect(volumeResearchDossier).toContain("The filters work together");
    expect(volumeResearchDossier).not.toMatch(/fetch\s*\(/);
    expect(volumeThreeResearchRecords).toHaveLength(7);
    expect(volumeThreeResearchLenses).toEqual([
      "Labor markets",
      "Licensing and access",
      "Welfare and social control",
      "Taxation and ownership",
      "Health systems",
      "Public visibility",
    ]);
    expect(volumeThreeResearchRecords[0]).toMatchObject({
      status: "Public reading copy",
      publicDocumentId: "wardhan-tax-doctrine",
    });
    expect(
      volumeThreeResearchRecords.filter((record) => record.status === "Working-paper direction"),
    ).toHaveLength(5);
    expect(volumeThreeResearchRecords).toContainEqual(
      expect.objectContaining({
        id: "social-class-and-welfare",
        title: "Social Class and Welfare",
        lenses: expect.arrayContaining(["Taxation and ownership"]),
        summary: expect.stringContaining("welfare socialism"),
      }),
    );
    expect(
      volumeThreeResearchRecords.every(
        (record) => !record.sourceDescription.includes("Dropbox desktop"),
      ),
    ).toBe(true);
  });

  it("connects documentary planning to all four volume research signals", () => {
    expect(documentaries).toContain("What each volume is building.");
    expect(bookRoadmap).toContain("Four books, one connected inquiry.");
    expect(bookRoadmap).toContain("Meet the four planned books behind Independent Observer");
    expect(bookRoadmap).toContain("The social-citizenship book");
    expect(bookRoadmap).toContain("There are no Amazon listings");
    expect(documentaries).toContain("Leading public signals in this volume");
    expect(documentaries).toContain(
      "archived distribution snapshots do not provide a reliable star-rating field",
    );
    expect(documentaries).toContain("Research state:");
    expect(documentaries).toContain("Reading copy →");
    expect(documentaries).toContain("ResearchGate ↗");
  });

  it("presents the series as an official catalogue without collapsing editorial status", () => {
    expect(series).toContain('title="Publication Catalogue"');
    expect(series).toContain('title="One series. Four volumes."');
    expect(series).toContain("Four lines of inquiry, one for each Independent Observer volume");
    expect(series).not.toContain("review roadmap, not a publication catalogue");
    expect(series).toContain("catalogue record does not make a volume a finished publication");
    expect(catalogue).toContain("Official catalogue");
    expect(catalogue).toContain("The four-volume spine");
    expect(catalogue).toContain("Four volumes, four lines of inquiry.");
    expect(catalogue).toContain("volumeResearchMap.map((item, index)");
    expect(volumeResearchMap.map((item) => item.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(catalogue).toContain("Open investigative file");
    expect(catalogue).toContain("Connected public work");
    expect(catalogue.replace(/\s+/g, " ")).toContain("usage signal only");
    expect(catalogue).toContain("human approval gates");
    expect(catalogue).toContain("Author-controlled paper pages connected to");
    expect(catalogue).toContain("ResearchGate record ↗");
    expect(catalogue).toContain("Find a volume and its line of inquiry.");
    expect(catalogue).not.toContain("Published papers");
  });

  it("ships a browser-local reading list without an account or collection endpoint", () => {
    expect(layout).toContain("<ReadingList />");
    expect(card).toContain("data-reading-toggle");
    expect(readingList).toContain("data-reading-open");
    expect(readingList).toContain("localStorage");
    expect(readingList).not.toMatch(/fetch\s*\(/);
    expect(readingList).toContain("data-reading-export");
    expect(readingList).toContain("io:reading-list-updated");
    expect(readingList).toContain("Recommended public previews");
    expect(readingList).toContain("Highest-download author paper pages");
    expect(readingList).toContain("Books and volumes in development");
    expect(readingList).toContain("data-reading-save-all");
    expect(readingList).toContain("researchGateUrl");
  });

  it("ranks AI by token boundaries and controlled synonyms", () => {
    const entries = [
      {
        id: "ai",
        title: "AI and the workforce",
        category: "Technology",
        description: "Automation and employment.",
        status: "Preview",
        type: "Research" as const,
        href: "/ai/",
      },
      {
        id: "said",
        title: "Public claims",
        category: "History",
        description: "A record said to matter.",
        status: "Preview",
        type: "Research" as const,
        href: "/claims/",
      },
    ];
    const results = rankSearchEntries(entries, "AI");
    expect(results[0]?.id).toBe("ai");
    expect(results.some((result) => result.id === "said")).toBe(false);
    expect(normalizeSearchText("Élite’s Institutions")).toBe("elites institutions");
  });

  it("supports type/topic/status/volume filters and deterministic related content", () => {
    const entries = [
      {
        id: "a",
        title: "Automation",
        category: "Technology",
        description: "",
        status: "Concept preview",
        type: "Research" as const,
        href: "/a/",
        topics: ["Technology"],
        volume: "Volume IV",
      },
      {
        id: "b",
        title: "Welfare",
        category: "Political Economy",
        description: "",
        status: "Concept preview",
        type: "Research" as const,
        href: "/b/",
        topics: ["Economics"],
        volume: "Volume III",
      },
    ];
    expect(
      rankSearchEntries(entries, "technology", {
        type: "Research",
        topic: "Technology",
        volume: "Volume IV",
      }).map((entry) => entry.id),
    ).toEqual(["a"]);
    expect(relatedRecords({ ...entries[0], id: "current" }, entries, 1)[0]?.id).toBe("a");
  });

  it("migrates legacy reading-list items, handles malformed storage, and sorts locally", () => {
    const legacy = JSON.stringify([{ id: "one", title: "One", href: "/one/" }]);
    const migrated = migrateReadingList(legacy);
    expect(migrated[0]).toMatchObject({ id: "one", status: "unread" });
    expect(migrateReadingList("not json")).toEqual([]);
    expect(
      sortReadingList(
        [...migrated, { ...migrated[0], id: "two", title: "Two", savedAt: 1 }],
        "title",
      ).map((item) => item.title),
    ).toEqual(["One", "Two"]);
  });

  it("provides reader and evidence-layer primitives with no-JavaScript content", () => {
    expect(reader).toContain("data-reader-progress");
    expect(reader).toContain("data-copy-section-link");
    expect(reader).toContain('className="document-reader-hero"');
    expect(papersSource).toContain("Volume I is the method anchor for the Independent Observer");
    expect(papersSource).toContain(
      "one of three Volume I papers currently represented by matched archived distribution snapshots",
    );
    expect(papersSource).toContain("began within the past year");
    expect(papersSource).toContain("open to discussion, empirical testing, and revision");
    expect(reader).not.toContain('class="reader-notice"');
    expect(reader).toContain("reader-limitations");
    expect(reader).toContain("data-reader-download-citation");
    expect(reader).toContain("<dt>Volume</dt>");
    expect(evidence).toContain('aria-pressed="true"');
    expect(evidence).toContain("The full text remains visible");
    expect(evidence).toContain("data-evidence-source");
  });

  it("exposes author-source provenance and archived usage signals without inventing ratings", () => {
    expect(reader).toContain("Open verified ResearchGate record");
    expect(reader).toContain("Archived distribution");
    expect(reader).toContain("Source fingerprint (SHA-256)");
    expect(researchCatalogue).toContain("author paper pages");
    expect(researchCatalogue).toContain("descriptive discovery signals, not ratings");
    expect(readFileSync(join(sourceRoot, "pages/series/[slug].astro"), "utf8")).toContain(
      "featuredDocuments",
    );
    expect(readFileSync(join(sourceRoot, "pages/research/[slug].astro"), "utf8")).toContain(
      "featuredDocuments",
    );
    expect(detail).toContain("Volume connection");
    expect(detail).toContain("volumeRecord");
  });

  it("indexes all four volumes, their author paper pages, and research concepts together", () => {
    expect(researchCatalogue).toContain("data-research-catalogue");
    expect(researchCatalogue).toContain('data-research-filter="volume"');
    expect(researchCatalogue).toContain("URLSearchParams");
    expect(researchCatalogue).toContain("rankSearchEntries");
    expect(researchCatalogue).toContain("Recently matched");
    expect(researchCatalogue).toContain("Private source paths");
    expect(researchCatalogueRecords).toHaveLength(34);
    expect(researchCatalogueVolumes).toEqual(["Volume I", "Volume II", "Volume III", "Volume IV"]);
    expect(
      researchCatalogueRecords.filter((record) => record.kind === "Volume record"),
    ).toHaveLength(4);
    expect(
      researchCatalogueRecords.filter((record) => record.kind === "Author paper"),
    ).toHaveLength(21);
    expect(
      researchCatalogueRecords.filter((record) => record.kind === "Research concept"),
    ).toHaveLength(3);
    expect(
      researchCatalogueRecords
        .filter((record) => record.kind === "Author paper")
        .map((record) => record.title),
    ).toEqual(
      expect.arrayContaining([
        "Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections",
        "The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States",
        "The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies",
        "Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System",
        'Children Left Behind After a War: Why Vietnam Produced a Visible "War-Child" Generation—and Iraq Did Not',
        "The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy",
        "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers",
        "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
      ]),
    );
    expect(
      researchCatalogueRecords
        .filter((record) => record.kind === "Author paper")
        .every((record) => record.publicationDate),
    ).toBe(true);
    expect(
      researchCatalogueRecords.find(
        (record) =>
          record.title === "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
      ),
    ).toMatchObject({ kind: "Research concept", volume: "Volume III" });
    expect(
      new Set(
        researchCatalogueRecords
          .filter((record) => record.kind === "Author paper")
          .map((record) => record.volume),
      ),
    ).toEqual(new Set(["Volume I", "Volume II", "Volume III", "Volume IV"]));
    expect(
      researchCatalogueRecords.filter((record) => record.kind === "Author paper")[0]?.title,
    ).toContain("Who Deported More");
  });

  it("supports richer concept briefs without changing their publication status", () => {
    expect(detail).toContain("detailLead");
    expect(detail).toContain("detailSections");
    expect(detail).toContain('aria-label="Research brief"');
    expect(detail).toContain("detail-section-index");
    expect(researchPage).toContain('heroClassName="research-detail-hero"');
  });

  it("connects the About page to the Volume I method and public reading copy", () => {
    expect(about).toContain('title="Independent Observer"');
    expect(about).toContain('className="about-hero"');
    expect(about).toContain("A public research project about how evidence");
    expect(about).toContain("One project. Four volumes.");
    expect(about).toContain("The four Independent Observer volumes");
    expect(about).toContain('class="section section-navy about-program"');
    expect(about).toContain("about-program-sequence");
    expect(about).toContain("Observe and document");
    expect(about).toContain("Locate power and sovereignty");
    expect(about).toContain("Examine work and distribution");
    expect(about).toContain("Test capability and the future");
    expect(about).toContain("Observation and evidence");
    expect(about).toContain("Institutions and sovereignty");
    expect(about).toContain("Work and social citizenship");
    expect(about).toContain("Science and capability");
    expect(about).toContain("series/independent-observer");
    expect(about).not.toContain("Independence is a method, not a pose.");
    expect(aboutVolumeAtlas).toContain('aria-label="Explore the four volumes"');
    expect(aboutVolumeAtlas).toContain("seriesItems.map");
    expect(aboutVolumeAtlas).toContain("libraryVolumeGuides.find");
    expect(aboutVolumeAtlas).toContain("volumeTopicConnections[item.volume]");
    expect(aboutVolumeAtlas).toContain("topicPluginFor(slug)");
    expect(aboutVolumeAtlas).toContain("volumeRoles");
    expect(aboutVolumeAtlas).toContain('"Volume I": "Observe and document"');
    expect(aboutVolumeAtlas).toContain('"Volume II": "Locate power and sovereignty"');
    expect(aboutVolumeAtlas).toContain(
      '"Volume III": "Examine work, taxation, and social citizenship"',
    );
    expect(aboutVolumeAtlas).toContain(
      '"Volume IV": "Test technological change against human capability"',
    );
    expect(about).toContain("<AboutVolumeAtlas />");
    expect(aboutVolumeAtlas).toContain("data-about-volume-atlas");
    expect(aboutVolumeAtlas).toContain("data-about-volume-tablist");
    expect(aboutVolumeAtlas).toContain("href={`#about-volume-panel-${key}`}");
    expect(aboutVolumeAtlas).not.toContain("hidden={");
    expect(aboutVolumeAtlas).toContain('tablist.setAttribute("role", "tablist")');
    expect(aboutVolumeAtlas).toContain('tab.setAttribute("role", "tab")');
    expect(aboutVolumeAtlas).toContain('tab.setAttribute("aria-controls", panel.id)');
    expect(aboutVolumeAtlas).toContain('panel.setAttribute("role", "tabpanel")');
    expect(aboutVolumeAtlas).toContain('panel.setAttribute("aria-labelledby", tab.id)');
    expect(aboutVolumeAtlas).toContain('tab.setAttribute("aria-selected", String(active))');
    expect(aboutVolumeAtlas).toContain("tab.tabIndex = active ? 0 : -1");
    expect(aboutVolumeAtlas).toContain("Representative research directions");
    expect(aboutVolumeAtlas).toContain("guide?.researchPapers.slice(0, 3)");
    expect(aboutVolumeAtlas).toContain("paper.description");
    expect(aboutVolumeAtlas).toContain("paper.relevance");
    expect(aboutVolumeAtlas).toContain("Research direction");
    expect(aboutVolumeAtlas).toContain("connection.contentLinks.map");
    expect(aboutVolumeAtlas).not.toContain("connection.contentLinks.slice");
    expect(aboutVolumeAtlas).toContain("ArrowRight");
    expect(aboutVolumeAtlas).toContain("ArrowLeft");
    expect(aboutVolumeAtlas).toContain("ArrowDown");
    expect(aboutVolumeAtlas).toContain("ArrowUp");
    expect(aboutVolumeAtlas).toContain('key === "Home"');
    expect(aboutVolumeAtlas).toContain('key === "End"');
    expect(aboutVolumeAtlas).toContain('key === " "');
    expect(aboutVolumeAtlas).toContain("next.focus()");
    expect(aboutVolumeAtlas).toContain('tablist.setAttribute("aria-orientation"');
    expect(aboutVolumeAtlas).toContain('window.matchMedia("(min-width: 901px)")');
    expect(aboutVolumeAtlas).toContain("event.metaKey");
    expect(aboutVolumeAtlas).toContain("event.ctrlKey");
    expect(aboutVolumeAtlas).toContain('hashPrefix = "#about-volume-panel-"');
    expect(aboutVolumeAtlas).toContain("pushState");
    expect(aboutVolumeAtlas).toContain("replaceState");
    expect(aboutVolumeAtlas).toContain("hashchange");
    expect(aboutVolumeAtlas).toContain("popstate");
    expect(aboutVolumeAtlas).toContain("Nothing here announces publication approval");
    expect(seriesItems.map((item) => item.volume)).toEqual(
      libraryVolumeGuides.map((guide) => guide.volume),
    );
    expect(seriesItems.map((item) => item.status)).toEqual([
      "In editorial development",
      "Concept preview",
      "Concept preview",
      "In editorial development",
    ]);
    for (const item of seriesItems) {
      expect(
        libraryVolumeGuides.find((guide) => guide.volume === item.volume)!.researchPapers.length,
      ).toBeGreaterThanOrEqual(3);
      expect(volumeTopicConnections[item.volume].contentLinks.length).toBeGreaterThan(0);
      expect(volumeTopicConnections[item.volume].topicSlugs.length).toBeGreaterThan(0);
    }
    expect(about).not.toContain("<TopicVolumeMap />");
  });

  it("explains Volume I observation and connects all four volumes to topic hubs", () => {
    expect(homepage).toContain(
      "One research project about what public systems make visible, possible, and changeable.",
    );
    expect(homepage).toContain("The general message of each volume");
    expect(homepage).toContain("grounded in references, identifiable sources, and visible limits");
    expect(homepage).toContain("mission-illustration");
    expect(homepage).toContain("independent-observer-four-volume-map-v2.png");
    expect(homepage).toContain("central observing lens connecting four research fields");
    expect(homepage).toContain("<VolumeVisualStrip compact />");
    expect(volumeVisualStrip).toContain("volume-visual-strip");
    expect(homepage).toContain("<HomepageVolumeGuide />");
    expect(homepage).toContain("paperDocuments");
    expect(homepage).toContain("The public Volume I paper record reports");
    expect(homepage).toContain("source: volumeOneSource");
    expect(homepage.replace(/\s+/g, " ")).toMatch(
      /research published through ResearchGate, Zenodo, or another verified public record/i,
    );
    expect(homepage.replace(/\s+/g, " ")).toMatch(
      /new research, revisions, and evidence continue to develop here/i,
    );
    expect(homepage).toContain('aria-labelledby="hero-note-title"');
    expect(homepage).toContain("Four volumes. One observing method.");
    expect(homepage).toContain("hero-volume-nav");
    expect(homepage).toContain("heroVolumeLinks.map");
    expect(homepage).toContain("Highest retrieved Archived distribution signal");
    expect(homepage.replace(/\s+/g, " ")).toContain("usage signal—not a quality rating");
    expect(homepageVolumeGuide).toContain("Volume I establishes the method of observation");
    expect(homepageVolumeGuide).toContain("homepage-concept-map");
    expect(homepageVolumeGuide).toContain("topic-volume-concept-center");
    expect(homepageVolumeGuide).toContain("volumeActions");
    expect(homepageVolumeGuide).toContain("homepage-volume-illustration");
    expect(homepageVolumeGuide).toContain("homepage-research-method");
    expect(homepageVolumeGuide).toContain("The connected paper list is a public index");
    expect(homepageVolumeGuide).toContain("additional mapped directions");
    expect(homepageVolumeGuide).toContain("homepage-volume-hypothesis");
    expect(homepageVolumeGuide).toContain("homepage-volume-limitation");
    expect(homepageVolumeGuide).toContain("seriesItems.map");
    expect(homepageVolumeGuide).toContain("volumeTopicConnections[item.volume]");
    expect(homepageVolumeGuide).toContain("item.volume");
    expect(homepageVolumeGuide).toContain("topicPluginFor(slug)");
  });

  it("keeps video, reels, and survey pathways visibly preview-only", () => {
    expect(videos).toContain("Shorts &amp; reels");
    expect(videos).toContain("Independent Observer Survey");
    expect(videos).toContain("no responses, findings, or audience data are published here");
    expect(videos).toContain('id="independent-observer-survey"');
    expect(videos).toContain("Concept preview");
    expect(videos).toContain("A reel library for every volume.");
    expect(videos).toContain("Follow the questions between volumes.");
    expect(videos).toContain("video-preview-grid");
    expect(videos).toContain("transcripts, rights checks, citations, and final release dates");
    expect(videos).toContain("<VolumeReelShelf items={volumeReels} />");
    expect(videos).toContain("<ReelTreatmentShelf />");
    expect(reelTreatmentShelf).toContain("Storyboard treatment · no playable media yet");
    expect(reelTreatmentShelf).toContain("eight treatments");
    expect(reelTreatmentData).toContain("Capability Has a Supply Chain");
    expect(reelTreatmentData).toContain("The Record Before the Reaction");
    expect(stylesheet).toContain(".video-preview-grid");
    expect(stylesheet).toContain("grid-template-columns: repeat(2, minmax(0, 1fr));");
  });

  it("gives the flagship video preview a source-labeled evidence case study", () => {
    expect(videoDetail).toContain("Case study: The Cost of Looking Away");
    expect(videoDetail).toContain("lookingAwayEvidence");
    expect(videoDetail).toContain("2024 EAVS report");
    expect(videoDetail).toContain("lookingAwayClaimMap");
    expect(videoDetail).toContain("awaiting human release");
    expect(videoDetail).not.toContain("releaseApproved = true");
  });

  it("uses a compact, descriptive hero for video detail pages", () => {
    expect(videoDetail).toContain('heroClassName="video-detail-hero"');
    expect(videoDetail).toContain("EditorialDetail");
  });
});

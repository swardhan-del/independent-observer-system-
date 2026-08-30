import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { publicLibrarySnapshot } from "../data/public-library";
import { ssrnPreprintDocuments } from "../data/ssrn";
import { seriesItems } from "../data/series";
import { volumeResearchMap } from "../data/volume-research";

const sourceRoot = join(process.cwd(), "src");
const libraryPage = readFileSync(join(sourceRoot, "pages/library/index.astro"), "utf8");
const contentBlocks = readFileSync(
  join(sourceRoot, "components/LibraryContentBlocks.astro"),
  "utf8",
);
const researchShelf = readFileSync(
  join(sourceRoot, "components/LibraryResearchShelf.astro"),
  "utf8",
);
const sourceMap = readFileSync(join(sourceRoot, "components/VolumeOneSourceMap.astro"), "utf8");
const siteSearch = readFileSync(join(sourceRoot, "components/SiteSearch.astro"), "utf8");

describe("library content blocks", () => {
  it("covers each roadmap volume with core ideas and topic lenses", () => {
    expect(libraryVolumeGuides.map((guide) => guide.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      libraryVolumeGuides.every(
        (guide) =>
          guide.importance.length > 0 &&
          guide.coreIdeas.length >= 3 &&
          guide.topicSlugs.length >= 2,
      ),
    ).toBe(true);
    expect(
      libraryVolumeGuides.every((guide) =>
        seriesItems.some((item) => item.volume === guide.volume),
      ),
    ).toBe(true);
  });

  it("keeps the source-taxonomy research map separate from public SSRN records", () => {
    const volumeOne = libraryVolumeGuides.find((guide) => guide.volume === "Volume I");
    const volumeTwo = libraryVolumeGuides.find((guide) => guide.volume === "Volume II");

    expect(volumeOne?.researchPapers.map((paper) => paper.title)).toEqual([
      "Manifesto of a Destiny: The Independent Observer Method",
      "Capital Amplification and the Myth of Equal Opportunity",
      "Quiet Wealth as Risk Management",
      "The Attention Infrastructure Gap: Why Some Police Shootings Become National Symbols While Others Disappear",
      "From Plato to Chomsky: Democracy, Mass Manipulation, and the Problem of Civic Capacity",
      "Study the Wall: Social Injustice, Institutional Power, Democratic Legitimacy, and the Politics of Structural Literacy",
      "The Death of Evidentiary Patience: Race, Social Media, and Judgment Before Investigation",
      "Reputation Debt: How Public Contempt Creates Future Cooperation Costs in Politics and Markets",
      "The Security of Memory: State Funerals, Political Legacies, and the Global Architecture of Mourning",
      "The Silent Archivist: Lawful Documentation and Deferred Disclosure in Loyalty-Based Institutions",
    ]);
    expect(volumeTwo?.researchPapers.map((paper) => paper.title)).toEqual([
      "Democracy’s Achilles’ Heel: Institutional Incentives and Political Outcomes",
      "Civil Rights Realignment and Party Sorting in the United States: From Reconstruction to Contemporary Populism",
      "Human Rights, Policing Doctrine, and Hidden Taxation in Modern U.S. Governance",
      "The Welfare Queen and the Tax Cut: Racialized Dependency Politics and the Fragmentation of the American Working Class",
      "Empire’s Mirror: Foreign Lobbying, Concentrated Wealth, and Imperial Self-Understanding in the United States",
      "The Paradox of Borrowed Sovereignty: How Conservative Economies Live on Liberal Capital",
    ]);
    const volumeThree = libraryVolumeGuides.find((guide) => guide.volume === "Volume III");
    expect(volumeThree?.researchPapers.map((paper) => paper.title)).toEqual([
      "From Pockets to Portfolios: Terry v. Ohio, Working-Class Life, and the Labor-First Tax State",
      "The Economics of Color: How De-industrialization and Wealth Stratification Reshaped Race, Crime, and Identity in America",
      "Welfare, Wealthfare, and Social Control in Advanced Democracies: Open-Air Prisons, Crime, and the Surplus Population",
      "The Administrative University: Bureaucratic Expansion, Tuition Growth, Student Debt, and the Managed Decline of Academic Mobility",
      "Hours to Ownership: Why the AI Industrial Revolution Rewires Inequality",
      "The Perception Proxy: From Factory Collapse to Podcast Rage, and How Culture-War Influencers Convert Class Displacement into Identity Conflict",
    ]);
    expect(volumeThree?.importance).toContain("fragmented service, platform, and data work");
    expect(volumeThree?.importance).toContain("political-economy study");
    expect(volumeThree?.importance).toContain("Volume II’s study of institutions and enforcement");
    expect(volumeThree?.summary).toContain("Managed Decline is a political-economy inquiry");
    const volumeFour = libraryVolumeGuides.find((guide) => guide.volume === "Volume IV");
    expect(volumeFour?.researchPapers.map((paper) => paper.title)).toEqual([
      "When Real Science Becomes Science Fiction: Biophysics, Medical Technology, and the Decline of Mechanistic Training",
      "Quantum Computing, Antimatter, and the Next Energy Revolution: Preparing Civilization for the Post-Silicon Age",
      "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
      "The Rival the West Built: China’s Scientific Rise, American Deindustrialization, and the Transition from Political Empire to Planetary Civilization",
      "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
      "Environmental Instability, Developmental Timing, and the Cognitive Divergence of Early Homo",
      "Mind Hive Horizons: Energy, Error-Correction, and the Real Timeline to Type-I Emulation",
      "ADHD in a Cage: Why the System Criminalizes the Mind",
      "The Last Human Workforce: Automation, AI, and the Death of the Old Middle Class",
    ]);
    expect(volumeFour?.importance).toContain("usable human capability");
    expect(volumeFour?.summary).toContain("advanced technology is measured");
    expect(researchShelf).toContain("Source-taxonomy research map");
    expect(researchShelf).toContain("library-volume-shelf-research-label");
    expect(researchShelf).toContain("not public SSRN reading copies or publication approvals");
  });

  it("maps public SSRN preprints to the correct volume without changing their status", () => {
    expect(ssrnPreprintDocuments.every((entry) => entry.status === "SSRN preprint")).toBe(true);
    expect(
      libraryVolumeGuides.every((guide) =>
        ssrnPreprintDocuments.some((entry) => entry.volume === guide.volume),
      ),
    ).toBe(true);
    expect(
      ssrnPreprintDocuments.every(
        (entry) =>
          entry.sourceUrl?.includes("papers.ssrn.com") && entry.metrics?.downloads !== undefined,
      ),
    ).toBe(true);
  });

  it("describes the public archive and its four scholarly volume boundaries", () => {
    expect(libraryPage).not.toContain("drawn from a reviewed Dropbox export");
    expect(libraryPage).toContain("source-led social-science papers");
    expect(libraryPage).toContain("Volume II: make power legible.");
    expect(libraryPage).toContain("Volume II research method");
    expect(libraryPage).toContain("Define the population, legal category, period, and outcome");
    expect(libraryPage).toContain("Volume II shelf");
    expect(libraryPage).toContain("Volume IV examines science,");
    expect(libraryPage).toContain("This site is for academic discussion grounded in");
    expect(publicLibrarySnapshot.note).toContain("SSRN records");
    expect(publicLibrarySnapshot.note).toContain("ResearchGate records");
  });

  it("wires the library page to the progressive volume filter block", () => {
    expect(libraryPage).toContain("<LibraryContentBlocks />");
    expect(libraryPage).toContain("<LibraryResearchShelf />");
    expect(libraryPage).not.toContain("Three public summaries.");
    expect(contentBlocks).toContain("data-library-volume-filter");
    expect(contentBlocks).toContain("Additional public SSRN shelf");
    expect(contentBlocks).toContain("Core ideas");
    expect(contentBlocks).toContain("Why this volume matters");
    expect(contentBlocks).toContain("Representative public paper");
    expect(contentBlocks).toContain("Highest current download signal in this volume");
    expect(contentBlocks).toContain("window.history.replaceState");
  });

  it("puts all four volumes and their matched papers into a first-class public shelf", () => {
    expect(researchShelf).toContain("Four-volume research shelf");
    expect(researchShelf).toContain("Follow the work by volume");
    expect(researchShelf).toContain("library-research-shelf-heading");
    expect(researchShelf).toContain("library-research-shelf-heading-copy");
    expect(researchShelf).toContain("Core principles");
    expect(researchShelf).toContain("Highest current download signal");
    expect(researchShelf).toContain("not a quality score");
    expect(researchShelf).toContain("How the power inquiry is assembled.");
    expect(researchShelf).toContain("Contribution to {guide.volume}.");
    expect(researchShelf).toContain("Why it contributes.");
    expect(researchShelf).toContain("Public paper index");
    expect(researchShelf).toContain("data-library-paper-filter");
    expect(researchShelf).toContain("data-library-paper-query");
    expect(researchShelf).toContain("paperVolume");
    expect(researchShelf).toContain("paperQ");
    expect(researchShelf).toContain("replace(/[^\\p{L}\\p{N}]+/gu");
    expect(researchShelf).toContain("Open SSRN record");
    expect(researchShelf).toContain("Open ResearchGate record");
    expect(researchShelf).toContain("ResearchGate record");
    expect(researchShelf).not.toContain("releaseApproved = true");
  });

  it("wires the reviewed Volume I source map into public reading surfaces", () => {
    expect(researchShelf).toContain("<VolumeOneSourceMap compact />");
    expect(sourceMap).toContain("Volume I source map");
    expect(sourceMap).toContain("data-volume-one-source-filter");
    expect(sourceMap).toContain("without publishing the source files");
    expect(sourceMap).not.toContain("dropbox.com");
  });

  it("gives each volume an accessible visual companion and interactive visual key", () => {
    const illustrationFiles = [
      "volume-i-observation.jpg",
      "volume-ii-sovereignty.jpg",
      "volume-iii-distribution.jpg",
      "volume-iv-capability.jpg",
    ];

    expect(researchShelf).toContain("library-volume-shelf-illustration");
    expect(researchShelf).toContain("<details open>");
    expect(researchShelf).toContain("How to read it");
    expect(researchShelf).toContain('loading="lazy"');
    expect(
      illustrationFiles.every((file) =>
        existsSync(join(process.cwd(), "public/volume-illustrations", file)),
      ),
    ).toBe(true);
  });

  it("keeps Volume I, II, and III public preprints in the local search index", () => {
    const firstThreeVolumes = ssrnPreprintDocuments.filter((entry) =>
      ["Volume I", "Volume II", "Volume III"].includes(entry.volume ?? ""),
    );
    expect(firstThreeVolumes).toHaveLength(16);
    expect(firstThreeVolumes.every((entry) => entry.sourceUrl)).toBe(true);
    expect(siteSearch).toContain("...publicDocumentItems.map");
    expect(siteSearch).toContain("SSRN preprint");
    expect(siteSearch).toContain("ResearchGate record");
    expect(siteSearch).toContain("Search public papers, work, fields, and volume guides");
  });

  it("makes the Volume III tax paper's placement and scope explicit", () => {
    const taxPaper = ssrnPreprintDocuments.find(
      (entry) => entry.id === "wardhan-tax-doctrine-ssrn",
    );
    const volumeThree = seriesItems.find((entry) => entry.volume === "Volume III");

    expect(taxPaper?.description).toContain("within Managed Decline");
    expect(taxPaper?.description).toContain("Volume I’s method foundation");
    expect(taxPaper?.description).toContain("Volume II’s sovereignty and institutional design");
    expect(volumeThree?.description).toContain("labor markets, licensing, welfare, taxation");
    expect(volumeThree?.description).toContain("health systems, and public visibility");
  });

  it("keeps the homepage volume guide linked to the public paper shelf", () => {
    const homepageVolumeGuide = readFileSync(
      join(sourceRoot, "components/HomepageVolumeGuide.astro"),
      "utf8",
    );
    expect(homepageVolumeGuide).toContain("public ");
    expect(homepageVolumeGuide).toContain("in this volume");
    expect(homepageVolumeGuide).toContain("library/documents/${paper.id}");
    expect(homepageVolumeGuide).toContain("SSRN usage signal only");
  });

  it("selects one public-safe paper signal for every volume", () => {
    expect(volumeResearchMap).toHaveLength(4);
    expect(volumeResearchMap.every((item) => item.papers.length > 0)).toBe(true);
    expect(new Set(volumeResearchMap.map((item) => item.papers[0]?.volume)).size).toBe(4);
    expect(volumeResearchMap.map((item) => item.papers[0]?.id)).toEqual([
      "the-illusion-of-equality-ssrn",
      "who-deported-more-ssrn",
      "wardhan-tax-doctrine-ssrn",
      "entanglement-primer-ssrn",
    ]);
    expect(contentBlocks).not.toContain("highest-rated");
    expect(contentBlocks).toContain("not quality ratings");
  });
});

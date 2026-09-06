import {
  libraryVolumeGuides,
  type LibraryResearchPaper,
} from "../../plugins/library-content/catalog";
import { previewGreenPublications } from "./green-publications";
import { paperDocuments } from "./papers";
import { seriesItems, type SeriesItem } from "./series";

export type HomepageResearchDirection = LibraryResearchPaper & {
  status: "Research-map entry";
};

export type HomepageVolumeScope = {
  volume: SeriesItem["volume"];
  hypothesis: string;
  limitation: string;
  directions: HomepageResearchDirection[];
};

const normalizeTitle = (title: string) =>
  title
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const indexedPublicTitles = [
  ...paperDocuments.flatMap((paper) => [paper.title, paper.id]),
  ...previewGreenPublications.flatMap((paper) => [paper.title, paper.shortTitle, paper.slug]),
].map(normalizeTitle);

const isAlreadyIndexed = (title: string) => {
  const normalizedTitle = normalizeTitle(title);
  return indexedPublicTitles.some(
    (indexedTitle) =>
      normalizedTitle === indexedTitle ||
      normalizedTitle.includes(indexedTitle) ||
      indexedTitle.includes(normalizedTitle),
  );
};

/**
 * The homepage's research map is intentionally derived from the existing public-safe catalogue.
 * It shows mapped directions that are not already repeated in the connected public paper list.
 * It does not publish source files, Dropbox paths, or release a held manuscript.
 */
const additionalDirectionsFor = (volume: SeriesItem["volume"]) => {
  const guide = libraryVolumeGuides.find((candidate) => candidate.volume === volume);

  return (guide?.researchPapers ?? [])
    .filter((paper) => !isAlreadyIndexed(paper.title))
    .map((paper) => ({ ...paper, status: "Research-map entry" as const }));
};

const volumeHypotheses: Record<SeriesItem["volume"], string> = {
  "Volume I":
    "Democratic capacity becomes more usable when people can inspect how a conclusion was formed, distinguish evidence from interpretation, and correct the record.",
  "Volume II":
    "Formal democracy can coexist with unequal usable power when membership, enforcement, capital, and agenda-setting distribute practical choices unevenly.",
  "Volume III":
    "When economic change shifts costs onto time, work, and access without routes into ownership and social citizenship, institutions can manage insecurity more readily than they restore capacity.",
  "Volume IV":
    "Technological progress becomes broad human capability only when infrastructure, scientific literacy, care, maintenance, and governance distribute access and agency.",
};

const earlyStageLimitation =
  "This is an early-stage, ongoing research project. The map is selective, source coverage and versions can change, and each direction remains subject to further evidence review, revision, and its own public release decision.";

export const homepageVolumeScopes: HomepageVolumeScope[] = seriesItems.map((item) => ({
  volume: item.volume,
  hypothesis: volumeHypotheses[item.volume],
  limitation: earlyStageLimitation,
  directions: additionalDirectionsFor(item.volume),
}));

export const homepageVolumeScopeFor = (volume: SeriesItem["volume"]) =>
  homepageVolumeScopes.find((scope) => scope.volume === volume);

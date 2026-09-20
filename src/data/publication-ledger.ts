import { greenPublications } from "./green-publications";
import { curatedPublications } from "./curated-publications";
import { publicationRevisions } from "./publication-revisions";

export type PublicationLedgerStatus =
  "Published" | "Source-audited preview" | "Preview in development";

export type PublicationLedgerEntry = {
  id: string;
  title: string;
  volume: string;
  version: string;
  status: PublicationLedgerStatus;
  route: string;
  publicationDate: string;
  factualCutoffDate: string;
  reviewedDate: string;
  correctionStatus: string;
  topics: string[];
};

const currentPublications = [...greenPublications, ...curatedPublications];

export const publicationLedger: PublicationLedgerEntry[] = currentPublications
  .map((publication) => {
    const sourceAudited = "evidence" in publication;
    return {
      id: publication.candidateId,
      title: publication.title,
      volume: publication.volume,
      version: publication.version,
      status: publication.productionReleased
        ? "Published"
        : sourceAudited
          ? "Source-audited preview"
          : "Preview in development",
      route: `/research/${publication.slug}/`,
      publicationDate: publication.publicationDate,
      factualCutoffDate: publication.factualCutoffDate,
      reviewedDate: publication.lastReviewedDate,
      correctionStatus: publication.productionReleased
        ? "Public correction log applies"
        : "Formal release and correction log pending",
      topics: publication.topics,
    } satisfies PublicationLedgerEntry;
  })
  .sort((left, right) => {
    const byReview = right.reviewedDate.localeCompare(left.reviewedDate);
    return byReview || right.publicationDate.localeCompare(left.publicationDate);
  });

export const publicationLedgerSummary = {
  total: publicationLedger.length,
  published: publicationLedger.filter((entry) => entry.status === "Published").length,
  sourceAudited: publicationLedger.filter((entry) => entry.status === "Source-audited preview")
    .length,
  inDevelopment: publicationLedger.filter((entry) => entry.status === "Preview in development")
    .length,
  approvedCorrections: publicationRevisions.length,
};

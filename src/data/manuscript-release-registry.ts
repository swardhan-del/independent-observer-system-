export type ManuscriptReleaseAuthorization = {
  manuscriptSlug: string;
  edition: string;
  authorizedBy: string;
  authorizedDate: string;
  authorizationNote: string;
};

/**
 * Explicit, per-edition release authorizations for full-text manuscript readers
 * (src/pages/library/manuscripts/[slug].astro). A manuscript route is indexable
 * only when its slug has a matching record here; this is a fail-closed gate,
 * not a default-on flag (see isManuscriptAuthorizedForRelease below).
 *
 * This registry is deliberately separate from sixCandidateReleaseQueue in
 * publication-registry.ts. That queue tracks a different artifact (bounded
 * preview adaptations) and its own test locks every entry to
 * releaseDecision: "awaiting_human_release" — this file must never be used to
 * flip those records. A full-text manuscript edition and its short preview
 * adaptation are reviewed and released independently.
 *
 * Authorization recorded here reflects only that the site owner explicitly
 * instructed release of this specific edition. It does not by itself assert
 * that independent source/editorial review or production-deployment
 * verification occurred — those remain separately tracked states.
 */
export const manuscriptReleaseAuthorizations: ManuscriptReleaseAuthorization[] = [
  {
    manuscriptSlug: "manifesto-of-a-destiny",
    edition: "Manifesto of a Destiny: The Independent Observer Method, version 2.0 (July 2026)",
    authorizedBy: "Siddhartha Harsh Wardhan (site owner)",
    authorizedDate: "2026-09-10",
    authorizationNote:
      "Owner instructed integration and launch of this specific reviewed edition directly, in the session that opened PR #48, and reaffirmed the instruction when asked to finish the PR's review findings. Recorded here as the release-authorization record required before this manuscript route becomes indexable.",
  },
  {
    manuscriptSlug: "reputation-debt",
    edition:
      "Reputation Debt: How Public Contempt Creates Future Cooperation Costs in Politics and Markets (January 2026 working paper)",
    authorizedBy: "Siddhartha Harsh Wardhan (site owner)",
    authorizedDate: "2026-09-11",
    authorizationNote:
      "Owner's source-review notes instructed a reading edition of this paper with the trailing \"Distribution score\" self-rating and the informal offer to produce alternate-length versions removed from after the bibliography, and asked that the cleanup be documented. That is the existing instruction this record reflects, not a new approval requirement; it does not by itself assert independent source/editorial review beyond the owner's own review notes, or production-deployment verification, which remain separately tracked states.",
  },
  {
    manuscriptSlug: "quiet-wealth",
    edition:
      "Quiet Wealth as Risk Management: A Conceptual Framework for Status Exposure, Envy, and Lawful Asset Protection (September 28, 2025 working paper)",
    authorizedBy: "Siddhartha Harsh Wardhan (site owner)",
    authorizedDate: "2026-09-11",
    authorizationNote:
      "Owner's source-review notes instructed a reading edition of this paper with the unfilled ORCID placeholder and the appendix the source itself labeled \"optional, not part of the scholarly text\" (suggested submission metadata for distribution platforms) removed, with an edition note documenting the change. That is the existing instruction this record reflects, not a new approval requirement; it does not by itself assert independent source/editorial review beyond the owner's own review notes, or production-deployment verification, which remain separately tracked states.",
  },
];

export function isManuscriptAuthorizedForRelease(slug: string): boolean {
  return manuscriptReleaseAuthorizations.some((record) => record.manuscriptSlug === slug);
}

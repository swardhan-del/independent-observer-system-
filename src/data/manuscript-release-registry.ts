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
];

export function isManuscriptAuthorizedForRelease(slug: string): boolean {
  return manuscriptReleaseAuthorizations.some((record) => record.manuscriptSlug === slug);
}

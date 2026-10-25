import type { PublicDocument } from "../data/documents";

const readable = (value?: string) => Boolean(value?.trim());

/** Fails the build when a public record is missing the reader-facing fields
 * required by the site’s publication policy. It does not certify research. */
export function assertPublicationChecklist(records: PublicDocument[]) {
  for (const record of records) {
    const problems: string[] = [];
    if (!readable(record.id) || !readable(record.title) || !readable(record.status)) problems.push("identity and status");
    if (!readable(record.author)) problems.push("author");
    if (!readable(record.updatedDate ?? record.sourceReviewedAt ?? record.publicationDate)) problems.push("review or publication date");
    if (!record.sections.length) problems.push("readable content");
    if (!record.limitations?.length) problems.push("limitations");
    if (!record.availability || !Object.values(record.availability).every(readable)) problems.push("availability for page, original, data, and code");
    if (!record.reviewScope || !readable(record.reviewScope.sourceChecking) || !readable(record.reviewScope.independentReview)) problems.push("review scope");
    if (!record.summaryEvidence?.length && !readable(record.sourceEvidenceNote)) problems.push("supporting sources or an explicit source boundary");
    if (problems.length) throw new Error(`Publication checklist failed for ${record.id}: ${problems.join(", ")}.`);
  }
}

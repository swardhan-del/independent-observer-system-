import { publicDocumentItems } from "./documents";
import { citationDate } from "../lib/citations";
export type PublicationRevision = {
  id: string;
  documentId: string;
  date: string;
  approved: boolean;
  change: string;
  reason: string;
  affectedSection: string;
};
// Add only reviewed, factual descriptions of actual paper changes. Website changes live in site-updates.ts.
const revisions: PublicationRevision[] = [];
export function reviewedRevisions(entries: PublicationRevision[]) {
  return entries
    .filter((entry) => entry.approved)
    .map((entry) => {
      const document = publicDocumentItems.find((item) => item.id === entry.documentId);
      if (
        !document ||
        !citationDate(entry.date) ||
        !entry.change.trim() ||
        !entry.reason.trim() ||
        !document.sections.some((section) => section.id === entry.affectedSection)
      ) {
        throw new Error(`Invalid publication revision: ${entry.id}`);
      }
      return {
        ...entry,
        title: document.title,
        route: `/library/documents/${document.id}/#${entry.affectedSection}`,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export const publicationRevisions = reviewedRevisions(revisions);

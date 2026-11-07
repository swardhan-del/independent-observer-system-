import { publicDocumentItems } from "./documents";
import { citationDate } from "../lib/citations";

export type CorrectionClassification = "correction" | "clarification" | "withdrawal";
export type PublicationRevision = {
  id: string; documentId: string; date: string; approved: boolean;
  classification?: CorrectionClassification; change: string; reason: string; affectedSection: string;
};
// Add only reviewed, factual descriptions of actual research-record changes.
// Interface and software changes belong in site-updates.ts and What’s New.
const revisions: PublicationRevision[] = [];
export function reviewedRevisions(entries: PublicationRevision[]) {
  return entries.filter((entry) => entry.approved).map((entry) => {
    const document = publicDocumentItems.find((item) => item.id === entry.documentId);
    if ((entry.id.startsWith("IO-") && !/^IO-(COR|CLR|WDR)-\d{8}-[A-Z0-9-]+$/.test(entry.id)) || !document || !citationDate(entry.date) || !entry.change.trim() || !entry.reason.trim() || !document.sections.some((section) => section.id === entry.affectedSection)) {
      throw new Error(`Invalid publication correction record: ${entry.id}`);
    }
    return { ...entry, classification: entry.classification ?? "correction", title: document.title, route: `/library/documents/${document.id}/#${entry.affectedSection}`, permanentRoute: `/corrections/#${entry.id}` };
  }).sort((a,b) => b.date.localeCompare(a.date));
}
export const publicationRevisions = reviewedRevisions(revisions);

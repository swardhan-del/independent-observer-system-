import { publicDocumentItems } from "../src/data/documents";
import { assertPublicationChecklist } from "../src/lib/publication-checklist";

const records = publicDocumentItems.filter((record) => record.publicationChecklistVersion === "v1");
if (!records.length) throw new Error("No publication records are enrolled in checklist v1.");
assertPublicationChecklist(records);
console.log("Publication checklist passed for " + records.length + " record(s).");

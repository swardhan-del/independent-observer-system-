import type { PublicDocument } from "./documents";
import { paperDocuments } from "./papers";
import { curatedResearchDocuments } from "./research-curation-2026-09-13";

export const paperCollection: PublicDocument[] = [...paperDocuments, ...curatedResearchDocuments];

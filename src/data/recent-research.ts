import { researchPreviews } from "./research-previews";
import { researchReadingCopies } from "./research-reading-copies";

/** One dated entry per existing research family. Source status is never a release decision. */
export const recentResearch = researchPreviews
  .map((entry) => ({
    ...entry,
    readingCopy: researchReadingCopies[entry.id],
    updatedDate: researchReadingCopies[entry.id]?.updatedDate ?? entry.updatedDate,
  }))
  .sort(
    (a, b) =>
      b.updatedDate.localeCompare(a.updatedDate) ||
      Number(Boolean(b.readingCopy)) - Number(Boolean(a.readingCopy)) ||
      a.title.localeCompare(b.title),
  );

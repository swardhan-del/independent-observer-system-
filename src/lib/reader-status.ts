/** Reader labels group detailed source statuses without changing publication records. */
export function readerStatus(status: string): string {
  if (status === "Concept preview" || status === "In editorial development" || status === "Mapped research direction" || status === "Working-paper direction") return "In development";
  if (status.includes("Preview") || status === "Editorial preview") return "Preview";
  if (status.includes("working paper") || status.includes("Working paper") || status === "Author working paper") return "Working paper";
  if (status === "Public learning exercise" || status === "Public reference document" || status === "Reference document" || status === "Editorial framework" || status === "Public summary" || status === "Guide") return "Public record";
  return "Published";
}

/** Reader labels only: source records and publication approval remain unchanged. */
export function readerStatus(status: string): string {
  if (status === "Author working paper") return "Working-paper summary";
  if (status === "Preview-only bounded text adaptation") return "Draft article";
  if (status === "Concept preview" || status === "In editorial development")
    return "In development";
  if (status === "Editorial preview" || status.startsWith("Preview asset")) return "Media preview";
  if (status === "Reviewed public copy" || status === "Public reference document")
    return "Reference document";
  if (status === "Editorial framework" || status === "Public summary") return "Guide";
  return status;
}

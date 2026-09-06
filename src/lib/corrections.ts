export function correctionContext(search: string): string {
  const params = new URLSearchParams(search);
  const page = params.get("page") ?? "";
  if (
    !page.startsWith("/") ||
    page.startsWith("//") ||
    /[\\\u0000-\u001f]/.test(page) ||
    page.length > 500
  )
    return "";
  const section = (params.get("section") ?? "").replace(/[\u0000-\u001f]/g, "").slice(0, 150);
  return `Page: https://independentobserver.org${page}\n${section ? `Section: ${section}\n` : ""}\nWhat needs correcting:\n\nSuggested correction or source:\n`;
}

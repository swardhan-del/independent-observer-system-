export type CitationRecord = {
  id: string;
  title: string;
  author?: string;
  publicationDate?: string;
  sourceLabel: string;
  status?: string;
};
const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export function citationDate(value: string | undefined): string | null {
  if (!value) return null;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const named = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(value);
  const year = Number(iso?.[1] ?? named?.[3]);
  const month = iso ? Number(iso[2]) : monthNames.indexOf(named?.[2].toLowerCase() ?? "") + 1;
  const day = Number(iso?.[3] ?? named?.[1]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return year >= 1000 &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date.toISOString().slice(0, 10)
    : null;
}
const singleLine = (value: string) => value.replace(/[\r\n\u0000-\u001f]+/g, " ").trim();
const bibEscape = (value: string) =>
  singleLine(value).replace(
    /[\\{}%&_#$]/g,
    (character) =>
      ({
        "\\": "{\\textbackslash}",
        "{": "\\{",
        "}": "\\}",
        "%": "\\%",
        "&": "\\&",
        _: "\\_",
        "#": "\\#",
        $: "\\$",
      })[character]!,
  );
export function exportCitation(record: CitationRecord, format: "bib" | "ris"): string | null {
  const date = citationDate(record.publicationDate);
  if (!record.author?.trim() || !date) return null;
  const url = `https://independentobserver.org/library/documents/${encodeURIComponent(record.id)}/`;
  const note = `${record.status ?? "Author paper record"}. ${record.sourceLabel}. Citation describes the public author record.`;
  if (format === "ris")
    return [
      "TY  - GEN",
      `TI  - ${singleLine(record.title)}`,
      `AU  - ${singleLine(record.author)}`,
      `PY  - ${date.slice(0, 4)}`,
      `DA  - ${date.replace(/-/g, "/")}`,
      `UR  - ${url}`,
      `N1  - ${singleLine(note)}`,
      "ER  -",
      "",
    ].join("\n");
  return `@misc{${record.id.replace(/[^a-z0-9-]/gi, "-")},\n  title = {${bibEscape(record.title)}},\n  author = {${bibEscape(record.author)}},\n  year = {${date.slice(0, 4)}},\n  date = {${date}},\n  url = {${url}},\n  note = {${bibEscape(note)}}\n}\n`;
}

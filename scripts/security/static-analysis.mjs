import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["src", "scripts"];
const excluded = new Set([
  "scripts/security/static-analysis.mjs",
  "scripts/security/scan-secrets.mjs",
]);
const dangerous = [
  [/\beval\s*\(/, "dynamic eval"],
  [/\bnew\s+Function\s*\(/, "dynamic Function construction"],
  [/\bdocument\.write\s*\(/, "document.write"],
  [/\b(?:outerHTML|insertAdjacentHTML)\s*=/, "HTML sink assignment"],
  [/\binsertAdjacentHTML\s*\(/, "HTML sink call"],
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else if (/\.(?:astro|[cm]?[jt]sx?)$/.test(entry.name) && !excluded.has(fullPath))
      files.push(fullPath);
  }
  return files;
}

const findings = [];
for (const root of roots) {
  for (const file of await walk(root)) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, index) => {
      for (const [pattern, label] of dangerous) {
        if (pattern.test(line)) findings.push(`${file}:${index + 1} ${label}`);
      }
    });
  }
}

if (findings.length) {
  console.error("Static security analysis failed:");
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Static security analysis passed: no blocked dynamic-code or HTML-sink patterns found.",
  );
}

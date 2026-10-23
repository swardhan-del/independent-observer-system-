import { publicDocumentItems } from "../src/data/documents";

const urls = [...new Set(publicDocumentItems.flatMap((entry) => entry.summaryEvidence ?? []).flatMap((source) => source.url ? [source.url] : []))];

async function probe(url: string) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(15000), headers: method === "GET" ? { Range: "bytes=0-1023" } : {} });
      if (response.status >= 200 && response.status < 400) return;
      if (method === "GET") throw new Error("HTTP " + response.status);
    } catch (error) {
      if (method === "GET") throw error;
    }
  }
}

const failures: string[] = [];
for (const url of urls) {
  try { await probe(url); console.log("OK " + url); }
  catch (error) { failures.push(url + " — " + (error instanceof Error ? error.message : String(error))); }
}
if (failures.length) {
  console.error("Source-integrity check failed:\n" + failures.join("\n"));
  process.exitCode = 1;
}

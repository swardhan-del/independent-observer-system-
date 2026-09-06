import { readFileSync, statSync } from "node:fs";
const homepage = readFileSync("dist/index.html", "utf8");
const index = readFileSync("dist/search-index.json", "utf8");
const cues = JSON.parse(readFileSync("src/data/podcast-cues.json", "utf8"));
const report = {
  homepageBytes: Buffer.byteLength(homepage),
  searchIndexBytes: Buffer.byteLength(index),
  searchIndexEmbedded: homepage.includes('data-index="'),
  searchEntries: JSON.parse(index).length,
  originalMapBytes: statSync("public/independent-observer-four-volume-map-v2.png").size,
  desktopMapBytes: statSync("public/independent-observer-four-volume-map-v2-1280.webp").size,
  mobileMapBytes: statSync("public/independent-observer-four-volume-map-v2-640.webp").size,
  originalAudioBytes: Object.values(cues).reduce((sum, entry) => sum + entry.wavBytes, 0),
  streamingAudioBytes: Object.values(cues).reduce((sum, entry) => sum + entry.m4aBytes, 0),
};
console.log(JSON.stringify(report, null, 2));
if (
  report.searchIndexEmbedded ||
  report.homepageBytes > 250000 ||
  report.searchIndexBytes > 200000 ||
  report.desktopMapBytes > 120000 ||
  report.streamingAudioBytes > report.originalAudioBytes * 0.3
) {
  throw new Error("Reader performance budget exceeded");
}

// Run from the repository root: node docs/media-brand/templates/export-covers.mjs
// Optional --video also writes 1600×900 JPGs to an explicit non-public directory.
import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const videoArg = process.argv.indexOf("--video");
const videoDir = videoArg < 0 ? null : process.argv[videoArg + 1];
if (videoArg >= 0 && !videoDir) throw new Error("Use --video <output-directory>");
if (videoDir) {
  const output = resolve(videoDir);
  const publicRoot = resolve("public");
  if (output === publicRoot || output.startsWith(`${publicRoot}/`)) {
    throw new Error("Video production assets must stay outside public/");
  }
  await mkdir(output, { recursive: true });
}

const templates = [
  ["brand-home", "review", "INDEPENDENT RESEARCH & ANALYSIS", "Follow the", "evidence.", "Institutions, economics, and technology"],
  ["brand-workforce", "tasks", "AI & EMPLOYMENT", "When AI changes", "the work", "Tasks, evidence, and who gains"],
  ["brand-factories", "industry", "LABOUR & OWNERSHIP", "The factory is back.", "Are the jobs?", "Output, wages, and ownership"],
  ["brand-democracy", "review", "INSTITUTIONS & ACCOUNTABILITY", "After the ballot", "is counted", "Access, information, and review"],
  ["brand-furnace", "thermal", "SCIENCE & INFRASTRUCTURE", "Where does the", "server heat go?", "What makes heat recovery useful"],
];

const svg = await readFile(fileURLToPath(new URL("./editorial-cover.svg", import.meta.url)), "utf8");
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [name, motifName, desk, titleOne, titleTwo, deck] of templates) {
    const motifSvg = await readFile(`public/editorial-covers/${motifName}.svg`, "utf8");
    const motif = motifSvg.match(/<g\b[\s\S]+<\/g>/)?.[0];
    if (!motif) throw new Error(`No motif group in ${motifName}`);
    const contents = svg
      .replace("{{MOTIF}}", motif)
      .replace("{{DESK}}", escape(desk))
      .replace("{{TITLE_ONE}}", escape(titleOne))
      .replace("{{TITLE_TWO}}", escape(titleTwo))
      .replace("{{DECK}}", escape(deck));
    const render = async (width, height, path) => {
      await page.setViewportSize({ width, height });
      await page.setContent(`<style>body{margin:0}svg{display:block;width:100vw;height:100vh}</style>${contents}`);
      await page.screenshot({ path, quality: 90 });
    };
    await render(1200, 630, `public/social-cards/${name}.jpg`);
    if (videoDir && name !== "brand-home") {
      await render(1600, 900, resolve(videoDir, `${name}.jpg`));
    }
  }
} finally {
  await browser.close();
}

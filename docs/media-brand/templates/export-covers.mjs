import { createHash } from "node:crypto";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import { releasedGreenPublications } from "../../../src/data/green-publications.ts";

const { values } = parseArgs({
  options: {
    output: { type: "string" },
    pilot: { type: "string" },
    help: { type: "boolean" },
  },
});
const usage = "npm run media:export -- --output <new directory> [--pilot <pilot ID>]";
if (values.help) {
  console.log(usage);
  process.exit(0);
}
if (!values.output) throw new Error(usage);

const repo = await realpath(fileURLToPath(new URL("../../../", import.meta.url)));
const requested = resolve(values.output);
const output = join(await realpath(dirname(requested)), basename(requested));
const fromRepo = relative(repo, output);
if (!isAbsolute(fromRepo) && fromRepo !== ".." && !fromRepo.startsWith(`..${sep}`)) {
  throw new Error("Choose a new output directory outside the website checkout.");
}

const origin = "https://independentobserver.org";
const home = {
  id: "home",
  motif: "review",
  desk: "INDEPENDENT RESEARCH & ANALYSIS",
  title: ["Follow the", "evidence."],
  deck: "Institutions, economics, and technology",
  art: "A civic building and a check mark represent public review.",
};
const pilots = [
  {
    id: "01-ai-and-work",
    slug: "the-last-human-workforce",
    motif: "tasks",
    desk: "AI & EMPLOYMENT",
    title: ["When AI changes", "the work"],
    deck: "Tasks, evidence, and who gains",
    art: "Connected task cards show a workflow with separate review paths.",
  },
  {
    id: "02-reshoring-and-ownership",
    slug: "factories-return-but-do-the-jobs",
    motif: "industry",
    desk: "LABOUR & OWNERSHIP",
    title: ["The factory is back.", "Are the jobs?"],
    deck: "Output, wages, and ownership",
    art: "An outline of a factory illustrates the question about jobs.",
  },
  {
    id: "03-contestable-institutions",
    slug: "democracys-achilles-heel",
    motif: "review",
    desk: "INSTITUTIONS & ACCOUNTABILITY",
    title: ["After the ballot", "is counted"],
    deck: "Access, information, and review",
    art: "A civic building and a check mark represent a route to review.",
  },
  {
    id: "04-computing-and-heat",
    slug: "the-server-as-a-furnace",
    motif: "thermal",
    desk: "SCIENCE & INFRASTRUCTURE",
    title: ["Where does the", "server heat go?"],
    deck: "What makes heat recovery useful",
    art: "Curved lines represent separate paths for moving heat.",
  },
];
const selected = values.pilot ? pilots.filter(({ id }) => id === values.pilot) : [home, ...pilots];
if (!selected.length)
  throw new Error(`Choose a pilot ID: ${pilots.map(({ id }) => id).join(", ")}.`);

const [cover, poster] = await Promise.all(
  ["editorial-cover.svg", "editorial-poster.svg"].map((file) =>
    readFile(new URL(file, import.meta.url), "utf8"),
  ),
);
const share = { name: "share", width: 1200, height: 630, template: cover };
const thumbnail = { name: "thumbnail", width: 1600, height: 900, template: cover };
const vertical = { name: "poster", width: 1080, height: 1920, template: poster };
const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const packages = [];
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
});
try {
  const page = await browser.newPage();
  for (const item of selected) {
    const publication = releasedGreenPublications.find(({ slug }) => slug === item.slug);
    if (item.slug && !publication) throw new Error(`No released article for ${item.slug}.`);

    const path = publication ? `/research/${publication.slug}/` : "/";
    const source = {
      url: new URL(path, origin).href,
      title: publication?.title ?? "The Independent Observer",
      ...(publication && {
        volume: publication.volume,
        date: publication.publicationDate,
        version: publication.version,
        articleLicense: publication.license,
        references: publication.sourceNotes,
      }),
    };
    const motif = await readFile(
      join(repo, "public/editorial-covers", `${item.motif}.svg`),
      "utf8",
    );
    const artwork = motif.match(/<g\b[\s\S]+<\/g>/)?.[0];
    if (!artwork) throw new Error(`No motif group in ${item.motif}.svg.`);
    const labels = {
      DESK: item.desk,
      TITLE_ONE: item.title[0],
      TITLE_TWO: item.title[1],
      DECK: item.deck,
      SOURCE: `independentobserver.org${publication ? path : ""}`,
      SOURCE_PATH: path,
      STATUS: publication ? `Published article · ${publication.volume}` : "Independent publication",
    };
    const alt = `${item.title.join(" ")} — ${item.deck}. ${item.art}`;
    const images = [];
    for (const { name, width, height, template } of publication
      ? [share, thumbnail, vertical]
      : [share]) {
      const svg = template.replaceAll(/\{\{([A-Z_]+)\}\}/g, (_, key) =>
        key === "MOTIF" ? artwork : escape(labels[key]),
      );
      await page.setViewportSize({ width, height });
      await page.setContent(
        `<style>body{margin:0}svg{display:block;width:100vw;height:100vh}</style>${svg}`,
      );
      await page.evaluate(() => document.fonts.ready);
      const clipped = await page.locator("svg > text").evaluateAll((nodes) =>
        nodes.some((node) => {
          const box = node.getBoundingClientRect();
          return box.left < 0 || box.top < 0 || box.right > innerWidth || box.bottom > innerHeight;
        }),
      );
      if (clipped) throw new Error(`Text is clipped in ${item.id}/${name}.`);
      const bytes = await page.screenshot({ type: "jpeg", quality: 90 });
      const file = `${item.id}/${name}.jpg`;
      images.push({
        file,
        width,
        height,
        alt,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        bytes,
      });
    }
    packages.push({
      id: item.id,
      source,
      ...(publication && { drafts: `docs/media-brand/packages/${item.id}/` }),
      images,
    });
  }
} finally {
  await browser.close();
}

await mkdir(output);
for (const item of packages) {
  await mkdir(join(output, item.id));
  for (const image of item.images)
    await writeFile(join(output, image.file), image.bytes, { flag: "wx" });
}
const manifest = {
  status: "Draft for editorial, rights and channel review",
  packages: packages.map(({ images, ...item }) => ({
    ...item,
    images: images.map(({ bytes, ...image }) => image),
  })),
};
await writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", {
  flag: "wx",
});
console.log(
  `Exported ${packages.reduce((count, item) => count + item.images.length, 0)} images to ${output}.`,
);

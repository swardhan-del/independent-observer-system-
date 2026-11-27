import { readFileSync, writeFileSync, lstatSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { articles, makePackage, mediaIndex, type Channel } from "./growth/packages";
import { GrowthStore, privateDirectory } from "./growth/store";
import { monthlyReport, saveMetrics } from "./growth/reporting";
import { prepare } from "./growth/workflow";
import { verifyPackage } from "./growth/verification";

const args = process.argv.slice(2),
  command = args[0] ?? "help";
const option = (name: string) => {
  const i = args.indexOf(name);
  return i < 0 ? undefined : args[i + 1];
};
if (command === "help" || args.includes("--help")) {
  console.log(`Independent Observer local-only growth workflow (Node 24+)
  prepare [--retry] [--refresh] [--slug ARTICLE] [--paragraph ZERO_BASED_INDEX]
  queue
  check --id PACKAGE_ID
  export --id PACKAGE_ID --channel linkedin|substack|youtube|website
  report [--month YYYY-MM]
  media
  import-metrics --input /absolute/private/export.json
  npm run dashboard: owner-token protected local approval forms
Private data: ~/Library/Application Support/Independent Observer/growth.
GROWTH_DATA_DIR may select another private directory outside Git/Dropbox.
No command publishes, sends, uploads, activates tracking or modifies research.`);
} else {
  const store = new GrowthStore(process.env.GROWTH_DATA_DIR);
  try {
    if (command === "prepare") {
      const index = option("--paragraph");
      if (index !== undefined && (!/^\d+$/.test(index) || !option("--slug")))
        throw Error("Choose one article and a nonnegative paragraph index");
      const result = await prepare(store, {
        retry: args.includes("--retry"),
        force: args.includes("--refresh"),
        slug: option("--slug"),
        paragraph: index === undefined ? undefined : Number(index),
      });
      console.log(JSON.stringify(result, null, 2));
      if (result.needsReview?.length) process.exitCode = 2;
    } else if (command === "queue")
      console.log(
        JSON.stringify(
          store.list().map(({ id, slug, status, decisions, gate }) => ({
            id,
            slug,
            status,
            decisions,
            warnings: gate.warnings,
          })),
          null,
          2,
        ),
      );
    else if (command === "check") {
      const row = store.get(option("--id") ?? ""),
        article = articles.find((a) => a.slug === row.slug);
      if (!article) throw Error("Source missing");
      const p = makePackage(article, row.package.claims[1].paragraph ?? undefined),
        gate = await verifyPackage(p, article);
      store.put(p, gate);
      console.log(JSON.stringify(gate, null, 2));
    } else if (command === "export")
      console.log(store.export(option("--id") ?? "", option("--channel") as Channel));
    else if (command === "import-metrics") {
      const input = option("--input");
      if (!input) throw Error("Provide a private aggregate export");
      const directory = privateDirectory(dirname(input));
      const file = join(directory, basename(input));
      const info = lstatSync(file);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 100000 || info.mode & 0o077)
        throw Error("Aggregate input must be a private regular file under 100 KB");
      const raw = JSON.parse(readFileSync(file, "utf8"));
      console.log(
        `Imported owner-reported aggregates for ${saveMetrics(store, raw)}. No API verification claimed.`,
      );
    } else if (command === "report" || command === "media") {
      const dir = privateDirectory(join(store.directory, "reports"));
      const data =
        command === "report"
          ? monthlyReport(store, option("--month"))
          : { publicAssets: mediaIndex(), connectedEditorResources: store.resources() };
      const file = join(dir, `${command}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
      writeFileSync(file, JSON.stringify(data, null, 2) + "\n", { mode: 0o600, flag: "wx" });
      console.log(file);
    } else throw Error("Unknown command; run npm run growth -- help");
  } finally {
    store.close();
  }
}

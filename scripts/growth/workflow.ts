import { articles, digest, generatorVersion, makePackage, sourceRevision } from "./packages";
import { verifyPackage, type Inspector } from "./verification";
import { monthlyReport } from "./reporting";
import type { GrowthStore } from "./store";

export function weekKey(now = new Date()) {
  const local = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const day = new Date(`${local}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  return day.toISOString().slice(0, 10);
}
export async function prepare(
  store: GrowthStore,
  options: {
    retry?: boolean;
    force?: boolean;
    now?: Date;
    inspect?: Inspector;
    slug?: string;
    paragraph?: number;
  } = {},
) {
  const candidates = articles.filter(
    (a) => a.productionReleased && (!options.slug || a.slug === options.slug),
  );
  if (!candidates.length) throw Error("No matching owner-released article");
  const now = options.now ?? new Date();
  const batch = digest([generatorVersion, ...candidates.map((a) => sourceRevision(a))]).slice(
    0,
    16,
  );
  const key = `prepare:${weekKey(now)}:${batch}:${options.slug ?? "all"}:${options.paragraph ?? "default"}${options.force ? `:refresh:${now.toISOString()}` : ""}`;
  if (!store.startJob(key, options.retry, now)) return { skipped: true, key, prepared: 0 };
  let count = 0;
  const errors: string[] = [];
  try {
    for (const article of candidates) {
      try {
        const p = makePackage(article, options.paragraph);
        const gate = await verifyPackage(p, article, options.inspect);
        store.put(p, gate);
        if (!gate.ready) errors.push(article.slug);
        count++;
      } catch (error) {
        store.event(null, "generation_failed", {
          slug: article.slug,
          reason: error instanceof Error ? error.message : "Generation failed",
        });
        errors.push(article.slug);
      }
    }
    store.finishJob(
      key,
      errors.length ? `Verification or preparation needs review: ${errors.join(", ")}` : undefined,
    );
    monthlyReport(store, now.toISOString().slice(0, 7));
    return { skipped: false, key, prepared: count, needsReview: errors };
  } catch (error) {
    store.finishJob(key, "Batch interrupted; inspect local events and retry explicitly");
    throw error;
  }
}

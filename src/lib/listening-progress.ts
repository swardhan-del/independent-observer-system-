export const listeningStorageKey = "io-listening-progress-v1";
export type ListeningProgress = Record<string, { position: number; updated: number }>;
export function readListeningProgress(raw: string | null): ListeningProgress {
  try {
    const value = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(([key, entry]) => {
        const item = entry as { position?: number; updated?: number } | null;
        return (
          /^episode-0[1-4]$/.test(key) &&
          item &&
          typeof item.position === "number" &&
          Number.isFinite(item.position) &&
          item.position >= 0 &&
          item.position < 86400 &&
          typeof item.updated === "number" &&
          Number.isFinite(item.updated)
        );
      }),
    ) as ListeningProgress;
  } catch {
    return {};
  }
}
export function resumablePosition(position: number, duration: number): number {
  return Number.isFinite(position) &&
    Number.isFinite(duration) &&
    position >= 5 &&
    position < duration - 5
    ? position
    : 0;
}
export function formatPlaybackTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

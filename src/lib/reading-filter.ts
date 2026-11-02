export type ReadingMode = "all" | "short" | "long" | "listen";
export function readingMode(value: string | null): ReadingMode {
  return value === "short" || value === "long" || value === "listen" ? value : "all";
}
/** Under five is literal; five-minute reads belong in the longer group. */
export function matchesReadingMode(minutes: number, mode: ReadingMode): boolean {
  return mode === "all" || (mode === "short" && minutes < 5) || (mode === "long" && minutes >= 5);
}

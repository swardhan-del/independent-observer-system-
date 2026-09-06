export function resolveCommitSha(values: (string | undefined)[], production = false): string {
  const sha = values
    .map((value) => value?.trim())
    .find((value) => /^[a-f0-9]{40}$/i.test(value ?? ""));
  if (sha) return sha;
  if (production) throw new Error("Production build requires an actual Git commit SHA.");
  return "unknown";
}

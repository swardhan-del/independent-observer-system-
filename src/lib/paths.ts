export function sitePath(path = "") {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.replace(/^\//, "");
  return `${base}/${normalized}`.replace(/\/{2,}/g, "/");
}

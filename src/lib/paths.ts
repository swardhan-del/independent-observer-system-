export function publicSitePath(path = "") {
  const normalized = path.replace(/^\/+/, "");
  return `/${normalized}`.replace(/\/{2,}/g, "/");
}

export function sitePath(path = "") {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${publicSitePath(path)}`.replace(/\/{2,}/g, "/");
}

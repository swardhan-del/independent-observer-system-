import {
  migrateReadingList,
  readingListStorageKey,
  readingListLegacyStorageKey,
} from "./reading-list";

export function mountDrawer(kind: "search" | "reading") {
  const root = document.querySelector<HTMLElement>(
    kind === "search" ? "[data-site-search]" : "[data-reading-list]",
  );
  if (!root) return;
  const trigger = root.querySelector<HTMLButtonElement>(`[data-${kind}-open]`)!;
  let mounted = false;
  let pending: Promise<void> | undefined;
  const count = root.querySelector<HTMLElement>("[data-reading-count]");
  const updateCount = () => {
    if (!count || mounted) return;
    try {
      count.textContent = String(
        migrateReadingList(
          localStorage.getItem(readingListStorageKey) ??
            localStorage.getItem(readingListLegacyStorageKey),
        ).length,
      );
    } catch {
      /* Storage is optional. */
    }
  };
  updateCount();
  window.addEventListener("storage", updateCount);
  const ensureMounted = () => {
    if (!pending)
      pending = (async () => {
        const response = await fetch(root.dataset.drawerUrl!, { credentials: "same-origin" });
        if (!response.ok) throw new Error("Drawer unavailable");
        const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
        const dialog = parsed.querySelector("dialog");
        if (!dialog) throw new Error("Invalid drawer");
        root.append(document.importNode(dialog, true));
        try {
          const module =
            kind === "search" ? await import("./search-drawer") : await import("./reading-drawer");
          module.initialize(root);
          mounted = true;
        } catch (error) {
          dialog.remove();
          root.querySelector("dialog")?.remove();
          throw error;
        }
      })().catch((error) => {
        pending = undefined;
        throw error;
      });
    return pending;
  };
  document.addEventListener("click", async (event) => {
    if (mounted) return;
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
      kind === "search" ? "[data-search-open]" : "[data-reading-open], [data-reading-toggle]",
    );
    if (!target) return;
    event.preventDefault();
    const error = root.querySelector<HTMLElement>("[data-drawer-error]")!;
    error.hidden = true;
    trigger.setAttribute("aria-busy", "true");
    try {
      await ensureMounted();
      target.click();
    } catch {
      error.textContent = "This tool could not load. Try again, or browse the Library.";
      error.hidden = false;
    } finally {
      trigger.removeAttribute("aria-busy");
    }
  });
  if (kind === "search")
    document.addEventListener("keydown", (event) => {
      if (!mounted && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        trigger.click();
      }
    });
}

import {
  migrateReadingList,
  readingListLegacyStorageKey,
  readingListStorageKey,
  sortReadingList,
  type ReadingStatus,
} from "../lib/reading-list";

export function initialize(root: HTMLElement) {
  const dialog = root.querySelector<HTMLDialogElement>("#reading-list-dialog");
  const openButton = root.querySelector<HTMLButtonElement>("[data-reading-open]");
  const closeButton = root.querySelector<HTMLButtonElement>("[data-reading-close]");
  const count = root.querySelector<HTMLElement>("[data-reading-count]");
  const empty = root.querySelector<HTMLElement>("[data-reading-empty]");
  const items = root.querySelector<HTMLOListElement>("[data-reading-items]");
  const clearButton = root.querySelector<HTMLButtonElement>("[data-reading-clear]");
  const sortSelect = root.querySelector<HTMLSelectElement>("[data-reading-sort]");
  const exportButton = root.querySelector<HTMLButtonElement>("[data-reading-export]");
  const importInput = root.querySelector<HTMLInputElement>("[data-reading-import]");
  const storageNote = root.querySelector<HTMLElement>("[data-reading-storage]");
  const saveAllButton = root.querySelector<HTMLButtonElement>("[data-reading-save-all]");

  if (
    !dialog ||
    !openButton ||
    !closeButton ||
    !count ||
    !empty ||
    !items ||
    !clearButton ||
    !sortSelect ||
    !exportButton ||
    !importInput ||
    !storageNote ||
    !saveAllButton
  )
    return;

  const announceStorage = (message = "") => {
    storageNote.textContent = message;
    storageNote.hidden = !message;
  };

  const readStored = () => {
    try {
      const current = localStorage.getItem(readingListStorageKey);
      if (current !== null) return current;

      const legacy = localStorage.getItem(readingListLegacyStorageKey);
      if (legacy === null) return null;

      const migrated = migrateReadingList(legacy);
      const serialized = JSON.stringify(migrated);
      localStorage.setItem(readingListStorageKey, serialized);
      localStorage.removeItem(readingListLegacyStorageKey);
      if (migrated.length) {
        announceStorage(
          `${migrated.length} saved ${migrated.length === 1 ? "item" : "items"} migrated to the current reading list format.`,
        );
      }
      return serialized;
    } catch {
      announceStorage("Browser storage is unavailable; your list is temporary.");
      return null;
    }
  };

  let saved = migrateReadingList(readStored());
  let sort = "recent" as "recent" | "title" | "type";

  const persist = () => {
    try {
      localStorage.setItem(readingListStorageKey, JSON.stringify(saved));
      announceStorage();
    } catch {
      announceStorage(
        "Browser storage is unavailable; changes will last only until this page closes.",
      );
    }
    window.dispatchEvent(new CustomEvent("io:reading-list-updated", { detail: saved.length }));
  };

  const updateToggleButtons = () => {
    document.querySelectorAll<HTMLButtonElement>("[data-reading-toggle]").forEach((button) => {
      const isSaved = saved.some((item) => item.id === button.dataset.readingId);
      button.setAttribute("aria-pressed", String(isSaved));
      button.textContent = isSaved ? "Saved" : "Save";
    });
  };

  const render = () => {
    count.textContent = String(saved.length);
    count.setAttribute(
      "aria-label",
      `${saved.length} saved ${saved.length === 1 ? "item" : "items"}`,
    );
    empty.hidden = saved.length > 0;
    clearButton.hidden = saved.length === 0;
    items.replaceChildren();

    for (const item of sortReadingList(saved, sort)) {
      const listItem = document.createElement("li");
      listItem.className = "reading-list-item";
      const content = document.createElement("div");
      content.className = "reading-list-item-content";
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.title;
      const meta = document.createElement("span");
      meta.className = "reading-list-item-meta";
      meta.textContent = [item.type ?? "Preview", item.tag ? `Tag: ${item.tag}` : ""]
        .filter(Boolean)
        .join(" · ");
      content.append(link, meta);

      const controls = document.createElement("div");
      controls.className = "reading-list-item-controls";
      const status = document.createElement("select");
      status.className = "reading-list-status";
      status.dataset.readingStatus = item.id;
      status.setAttribute("aria-label", `Reading status for ${item.title}`);
      for (const value of ["unread", "reading", "finished"] as ReadingStatus[]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value[0].toUpperCase() + value.slice(1);
        option.selected = item.status === value;
        status.append(option);
      }
      const tag = document.createElement("input");
      tag.className = "reading-list-tag";
      tag.type = "text";
      tag.maxLength = 80;
      tag.placeholder = "Local tag";
      tag.value = item.tag ?? "";
      tag.dataset.readingTag = item.id;
      tag.setAttribute("aria-label", `Local tag for ${item.title}`);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "reading-list-remove";
      remove.dataset.readingRemove = item.id;
      remove.setAttribute("aria-label", `Remove ${item.title} from reading list`);
      remove.textContent = "Remove";
      controls.append(status, tag, remove);
      listItem.append(content, controls);
      items.append(listItem);
    }
  };

  const close = () => {
    if (dialog.open) dialog.close();
    openButton.focus();
  };

  openButton.addEventListener("click", () => {
    render();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    closeButton.focus();
  });
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("close", () => openButton.focus());
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [
      ...dialog.querySelectorAll<HTMLElement>("button, input, select, a[href]"),
    ].filter((element) => !element.hidden);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  clearButton.addEventListener("click", () => {
    saved = [];
    persist();
    render();
    updateToggleButtons();
  });
  sortSelect.addEventListener("change", () => {
    sort = sortSelect.value as typeof sort;
    render();
  });
  items.addEventListener("click", (event) => {
    const remove = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-reading-remove]",
    );
    if (!remove) return;
    saved = saved.filter((item) => item.id !== remove.dataset.readingRemove);
    persist();
    render();
    updateToggleButtons();
  });
  items.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const id = target.dataset.readingStatus ?? target.dataset.readingTag;
    const item = saved.find((candidate) => candidate.id === id);
    if (!item) return;
    if (target.dataset.readingStatus) item.status = target.value as ReadingStatus;
    if (target.dataset.readingTag) item.tag = target.value.trim() || undefined;
    persist();
    render();
  });
  saveAllButton.addEventListener("click", () => {
    const recommendations = [...root.querySelectorAll<HTMLButtonElement>("[data-reading-toggle]")]
      .map((button) => ({
        id: button.dataset.readingId,
        title: button.dataset.readingTitle,
        href: button.dataset.readingHref,
        type: button.dataset.readingType,
      }))
      .filter(
        (item): item is { id: string; title: string; href: string; type: string | undefined } =>
          Boolean(item.id && item.title && item.href),
      );
    const existing = new Set(saved.map((item) => item.id));
    const additions = recommendations.filter((item) => !existing.has(item.id));
    saved = [
      ...saved,
      ...additions.map((item) => ({
        id: item.id,
        title: item.title,
        href: item.href,
        type: item.type,
        savedAt: Date.now(),
        status: "unread" as const,
      })),
    ];
    persist();
    render();
    updateToggleButtons();
    announceStorage(
      additions.length
        ? `${additions.length} public preview${additions.length === 1 ? "" : "s"} saved.`
        : "All public previews are already saved.",
    );
  });
  document.querySelectorAll<HTMLButtonElement>("[data-reading-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.readingId;
      const title = button.dataset.readingTitle;
      const href = button.dataset.readingHref;
      if (!id || !title || !href) return;
      saved = saved.some((item) => item.id === id)
        ? saved.filter((item) => item.id !== id)
        : [
            ...saved,
            {
              id,
              title,
              href,
              type: button.dataset.readingType,
              savedAt: Date.now(),
              status: "unread",
            },
          ];
      persist();
      render();
      updateToggleButtons();
    });
  });
  exportButton.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "independent-observer-reading-list.json";
    link.click();
    URL.revokeObjectURL(url);
  });
  importInput.addEventListener("change", async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    const imported = migrateReadingList(await file.text());
    if (imported.length) {
      saved = imported;
      persist();
      render();
      updateToggleButtons();
      announceStorage(
        `${imported.length} saved ${imported.length === 1 ? "item" : "items"} imported.`,
      );
    } else announceStorage("That file did not contain a readable reading list.");
    importInput.value = "";
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== readingListStorageKey) return;
    saved = migrateReadingList(event.newValue);
    render();
    updateToggleButtons();
  });
  window.addEventListener("io:reading-list-updated", () => {
    try {
      saved = migrateReadingList(localStorage.getItem(readingListStorageKey));
    } catch {
      // Keep the in-memory state when local storage is unavailable.
    }
    render();
    updateToggleButtons();
  });
  render();
  updateToggleButtons();
}

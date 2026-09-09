import { readerStatus } from "../lib/reader-status";
import {
  highlightTokens,
  rankSearchEntries,
  searchSuggestions,
  normalizeSearchText,
  type SearchEntry,
} from "../lib/search";

export function initialize(root: HTMLElement) {
  const dialog = root.querySelector<HTMLDialogElement>("#site-search-dialog");
  const openButton = root.querySelector<HTMLButtonElement>("[data-search-open]");
  const closeButton = root.querySelector<HTMLButtonElement>("[data-search-close]");
  const input = root.querySelector<HTMLInputElement>("[data-search-input]");
  const status = root.querySelector<HTMLElement>("[data-search-status]");
  const results = root.querySelector<HTMLUListElement>("[data-search-results]");
  let index: SearchEntry[] = [];
  let indexLoaded = false;
  let indexRequest: Promise<void> | undefined;
  const loadIndex = () => {
    if (!indexRequest)
      indexRequest = (async () => {
        const response = await fetch(root.dataset.indexUrl!, { credentials: "same-origin" });
        if (!response.ok) throw new Error("Search unavailable");
        const entries: unknown = await response.json();
        if (!Array.isArray(entries)) throw new Error("Invalid search index");
        index = (entries as SearchEntry[]).map((entry) => ({
          ...entry,
          status: readerStatus(entry.status),
        }));
        indexLoaded = true;
      })().catch(() => {
        indexRequest = undefined;
        throw new Error("Search unavailable");
      });
    return indexRequest;
  };
  const filterControls = [...root.querySelectorAll<HTMLSelectElement>("[data-search-filter]")];
  let selectedIndex = -1;
  let lastFocused: HTMLElement | null = null;

  if (!dialog || !openButton || !closeButton || !input || !status || !results) return;

  const pageOwnsLegacyFilters = Boolean(
    document.querySelector(
      "[data-research-catalogue], [data-publication-catalogue], [data-topic-atlas]",
    ),
  );

  const filters = () =>
    Object.fromEntries(
      filterControls
        .map((control) => [control.dataset.searchFilter ?? "", control.value])
        .filter(([, value]) => value),
    );

  const appendHighlighted = (parent: HTMLElement, text: string, query: string) => {
    const terms = new Set(highlightTokens(query));
    const parts = text.split(/([\p{L}\p{N}][\p{L}\p{N}'’-]*)/gu);
    for (const part of parts) {
      if (terms.has(normalizeSearchText(part))) {
        const mark = document.createElement("mark");
        mark.textContent = part;
        parent.append(mark);
      } else parent.append(document.createTextNode(part));
    }
  };

  const resultLinks = () => [
    ...results.querySelectorAll<HTMLAnchorElement>("[data-search-result]"),
  ];

  const render = () => {
    if (!indexLoaded) return;
    const query = input.value.trim();
    const url = new URL(location.href);
    for (const key of ["q", "type", "topic", "status", "volume"]) {
      url.searchParams.delete(`search-${key}`);
      if (!pageOwnsLegacyFilters) url.searchParams.delete(key);
    }
    if (url.href !== location.href)
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    try {
      sessionStorage.setItem("io:search", JSON.stringify({ q: query, ...filters() }));
    } catch {
      /* Optional local history. */
    }
    const matches = rankSearchEntries(index, query, filters());
    results.replaceChildren();
    selectedIndex = -1;

    if (!query && !Object.keys(filters()).length) {
      status.textContent = "Type to search papers, volume guides, and public work.";
      return;
    }

    status.textContent = matches.length
      ? `${matches.length} ${matches.length === 1 ? "result" : "results"}${matches.length > 16 ? "; showing the 16 most relevant" : ""}. Use arrow keys to navigate.`
      : "No matching public entry.";

    if (!matches.length) {
      const item = document.createElement("li");
      item.className = "search-zero";
      const message = document.createElement("p");
      message.textContent = "Try a broader field or one of these local suggestions:";
      item.append(message);
      const suggestions = document.createElement("div");
      suggestions.className = "search-zero-suggestions";
      for (const suggestion of searchSuggestions(query)) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = suggestion;
        button.dataset.searchQuery = suggestion;
        suggestions.append(button);
      }
      const browse = document.createElement("a");
      browse.href = root.querySelector<HTMLAnchorElement>(".form-note a")!.href;
      browse.textContent = "Browse all papers →";
      suggestions.append(browse);
      if (Object.keys(filters()).length) {
        const clear = document.createElement("button");
        clear.type = "button";
        clear.textContent = "Clear filters";
        clear.addEventListener("click", () => {
          filterControls.forEach((control) => {
            control.value = "";
          });
          render();
          input.focus();
        });
        suggestions.append(clear);
      }
      item.append(suggestions);
      results.append(item);
      return;
    }

    let group = "";
    for (const [index, entry] of matches.slice(0, 16).entries()) {
      if (entry.type !== group) {
        group = entry.type;
        const heading = document.createElement("li");
        heading.className = "search-result-group";
        heading.textContent = group;
        heading.setAttribute("aria-hidden", "true");
        results.append(heading);
      }
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = entry.href;
      link.dataset.searchResult = String(index);
      link.dataset.active = String(index === selectedIndex);
      const kind = document.createElement("span");
      kind.className = "search-result-kind";
      kind.textContent = [entry.type, entry.status].filter(Boolean).join(" · ");
      const title = document.createElement("strong");
      appendHighlighted(title, entry.title, query);
      const description = document.createElement("span");
      description.textContent = entry.description;
      link.append(kind, title, description);
      item.append(link);
      results.append(item);
    }
  };

  const open = async () => {
    if (dialog.open) return;
    lastFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    input.focus();
    status.textContent = "Loading search…";
    try {
      await loadIndex();
      render();
    } catch {
      status.textContent =
        "Search could not load. Close and reopen to retry, or explore the Library.";
    }
  };
  const close = () => {
    if (dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    (lastFocused ?? openButton).focus();
  };

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("close", () => (lastFocused ?? openButton).focus());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  input.addEventListener("input", () => render());
  filterControls.forEach((control) => control.addEventListener("change", () => render()));
  root.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-search-query]");
    if (!button) return;
    input.value = button.dataset.searchQuery ?? "";
    render();
    input.focus();
  });
  dialog.addEventListener("keydown", (event) => {
    const links = resultLinks();
    if (
      (event.key === "ArrowDown" || event.key === "ArrowUp") &&
      (event.target === input || links.includes(event.target as HTMLAnchorElement))
    ) {
      if (!links.length) return;
      event.preventDefault();
      const focusedIndex = links.indexOf(event.target as HTMLAnchorElement);
      selectedIndex =
        event.target === input
          ? event.key === "ArrowDown"
            ? 0
            : links.length - 1
          : (focusedIndex + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      links.forEach((link, index) => {
        link.dataset.active = String(index === selectedIndex);
      });
      links[selectedIndex]?.focus();
    }
    if (event.key === "Enter" && event.target === input && links.length > 0) {
      event.preventDefault();
      links[0].click();
    }
    if (event.key === "Tab") {
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
    }
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
      event.preventDefault();
      open();
    }
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      close();
    }
  });

  const restoreUrl = () => {
    const params = new URLSearchParams(window.location.search);
    let local: Record<string, string> = {};
    try {
      const stored: unknown = JSON.parse(sessionStorage.getItem("io:search") ?? "{}");
      if (stored && typeof stored === "object") local = stored as Record<string, string>;
    } catch {
      /* Optional local history. */
    }
    const searchParam = (key: string) =>
      params.get(`search-${key}`) ??
      (!pageOwnsLegacyFilters ? params.get(key) : null) ??
      local[key] ??
      "";
    input.value = searchParam("q");
    filterControls.forEach((control) => {
      const value = searchParam(control.dataset.searchFilter ?? "");
      control.value = control.dataset.searchFilter === "status" ? readerStatus(value) : value;
    });
    render();
  };
  window.addEventListener("popstate", restoreUrl);
  window.addEventListener("pageshow", restoreUrl);
  restoreUrl();
}

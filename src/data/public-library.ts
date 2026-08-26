export type PublicLibraryStat = {
  label: string;
  value: string;
  detail: string;
};

export type PublicLibraryArea = {
  title: string;
  summary: string;
  privateCount: string;
};

/**
 * Reviewed public-export metadata from the Independent Observer Dropbox workspace.
 *
 * This file intentionally contains summaries and aggregate counts only. It does not
 * contain archive filenames, local paths, raw documents, private records, or drafts.
 */
export const publicLibrarySnapshot = {
  label: "Public archive snapshot",
  note: "A reviewed public-safe map of the Independent Observer working archive. It gives readers visibility into the project without publishing raw files, private names, local paths, or unpublished evidence.",
  stats: [
    {
      label: "Source folders reviewed",
      value: "15",
      detail: "Aggregate count from the reviewed public export.",
    },
    {
      label: "Source files inventoried",
      value: "341",
      detail: "Inventory context only; files remain in the private archive.",
    },
    {
      label: "Public volume summaries",
      value: "4",
      detail: "High-level summaries available for the four-volume roadmap.",
    },
    {
      label: "Raw archive files published",
      value: "0",
      detail:
        "No raw research, manuscript, video, or working archive file is exposed; the operating standard is separately hosted as an owner-requested reference.",
    },
    {
      label: "Hosted operating standards",
      value: "1",
      detail:
        "One exact owner-provided publication operating standard is hosted outside the article feed.",
    },
  ] satisfies PublicLibraryStat[],
  areas: [
    {
      title: "Primary research body",
      summary: "Core Independent Observer volumes and their evidence-led research structure.",
      privateCount: "260 files in the private archive",
    },
    {
      title: "Forward-looking research",
      summary:
        "Future-society and technology work, including questions about systems, capability, and change.",
      privateCount: "12 files in the private archive",
    },
    {
      title: "Video and visual development",
      summary:
        "Media and presentation work that may support future public explanations and documentaries.",
      privateCount: "30 files in the private archive",
    },
    {
      title: "Project stewardship",
      summary: "Rights, licensing, and protection materials that support responsible publication.",
      privateCount: "4 files in the private archive",
    },
    {
      title: "Working material",
      summary: "Supplemental research folders retained for review and future editorial decisions.",
      privateCount: "30+ files in the private archive",
    },
  ] satisfies PublicLibraryArea[],
} as const;

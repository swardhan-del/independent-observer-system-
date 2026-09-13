import {
  archiveNavigation,
  archivePapers as baseArchivePapers,
  type ArchivePaper,
} from "./archive-navigation";

const releaseOverrides: Record<string, Pick<ArchivePaper, "status" | "href">> = {
  "richer-republic-weaker-hegemon": {
    status: "Public author paper",
    href: "/library/documents/richer-republic-weaker-hegemon/",
  },
};

export { archiveNavigation };
export const archivePapers = baseArchivePapers.map((entry) => ({
  ...entry,
  ...(releaseOverrides[entry.id] ?? {}),
}));
export const archivePaperById = new Map(archivePapers.map((entry) => [entry.id, entry]));

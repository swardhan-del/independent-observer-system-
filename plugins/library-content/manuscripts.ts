import entries from "./manuscripts.generated.json";
export type Manuscript = {
  slug: string;
  taxonomyId: string;
  title: string;
  subtitle: string;
  author: string;
  volume: string;
  version: string;
  sourceDate: string;
  status: string;
  summary: string;
  sourceTextSha256: string;
  editionNote: string;
  frontMatter: string[];
  blocks: { kind: string; text: string }[];
};
export const manuscripts: Manuscript[] = entries;
export const manuscriptPath = (entry: Manuscript) => `/library/manuscripts/${entry.slug}/`;

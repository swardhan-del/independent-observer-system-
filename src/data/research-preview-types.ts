export type ResearchPreviewExample = {
  id: string;
  heading: string;
  paragraphs: string[];
  sources: { title: string; url: string }[];
};

export type ResearchPreview = {
  id: string;
  taxonomyId: string;
  familyId: string;
  title: string;
  summary: string;
  volume: string;
  branch: string;
  topics: string[];
  href: string;
  status: string;
  manuscriptReleased: false;
  question: string;
  contribution: string;
  evidenceNeeded: string;
  contextVolume: string;
  contextTitle: string;
  backHref: string;
  updatedDate: string;
  sourceNote?: string;
  example?: ResearchPreviewExample;
  relatedLinks: { title: string; href: string; label: string }[];
};

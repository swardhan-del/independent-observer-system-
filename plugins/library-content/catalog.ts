/**
 * Public-safe content-block metadata for the four-volume library map.
 *
 * These are editorial guides assembled from the existing series roadmap and public SSRN
 * reading-copy metadata. They are not article releases and do not mirror the private archive.
 */
export type LibraryVolumeGuide = {
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  focus: string;
  importance: string;
  summary: string;
  coreIdeas: string[];
  topicSlugs: string[];
};

export const libraryVolumeGuides: LibraryVolumeGuide[] = [
  {
    volume: "Volume I",
    focus: "Method, evidence, and democratic capacity",
    importance:
      "This is the method anchor: it gives the observer a way to test how a public conclusion was formed before accepting it.",
    summary:
      "The method anchor: how to connect law, labor, media, history, and public reasoning while keeping the basis and limits of an argument visible.",
    coreIdeas: [
      "Method before conclusion: separate documented records from interpretation and proposal.",
      "Evidence includes source context, contradiction, uncertainty, and the conditions of review.",
      "Democratic capacity depends on whether people can use institutions, not only whether rules exist.",
    ],
    topicSlugs: ["history", "politics", "law"],
  },
  {
    volume: "Volume II",
    focus: "History, sovereignty, and institutional power",
    importance:
      "This volume extends observation into power: it asks how history, institutions, enforcement, migration, and markets shape public authority.",
    summary:
      "A comparative volume about how historical power shifts, enforcement, migration, identity, markets, and constitutional arrangements shape public authority.",
    coreIdeas: [
      "Formal democracy is not the same as usable power: access, information, agenda-setting, and correction channels matter.",
      "Definitions are part of evidence: distinguish populations, legal categories, enforcement pathways, and administrative outcomes.",
      "Sovereignty is relational: capital, technology, security, labor, and markets shape practical autonomy.",
      "Enforcement reveals institutional design: emergencies, protection, punishment, and discretion distribute exposure and accountability.",
    ],
    topicSlugs: ["history", "politics", "economics"],
  },
  {
    volume: "Volume III",
    focus: "Work, taxation, and social citizenship",
    importance:
      "This volume makes distribution concrete by asking how time, taxation, work, and social citizenship decide who carries the cost of change.",
    summary:
      "A political-economy volume about labor markets, time, taxation, welfare, licensing, health systems, and the public arrangements that distribute insecurity.",
    coreIdeas: [
      "Work and time are social and policy questions, not only private economic inputs.",
      "A policy proposal must remain distinct from enacted law, official scoring, or legal advice.",
      "Social citizenship asks who carries the cost of change and who can access public capacity.",
    ],
    topicSlugs: ["economics", "law", "politics"],
  },
  {
    volume: "Volume IV",
    focus: "AI, infrastructure, science, and human capability",
    importance:
      "This volume tests whether technological promise becomes human capability by following infrastructure, science, labor, intimacy, and institutional adaptation.",
    summary:
      "A future-facing volume about automation, compute, energy, human work, intimacy, demographic life, scientific capability, and institutional adaptation.",
    coreIdeas: [
      "Automation is a system involving infrastructure, energy, data, maintenance, and human labor.",
      "Technical change can reshape intimacy, identity, and demographic life without providing one complete causal explanation.",
      "Scientific possibility becomes public capability only through institutions, education, and sustained human work.",
    ],
    topicSlugs: ["technology", "science", "economics"],
  },
];

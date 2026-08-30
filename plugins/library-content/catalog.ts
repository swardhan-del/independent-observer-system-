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
  researchPapers: LibraryResearchPaper[];
};

export type LibraryResearchPaper = {
  title: string;
  lens: string;
  description: string;
  relevance: string;
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
    researchPapers: [
      {
        title: "Manifesto of a Destiny: The Independent Observer Method",
        lens: "Method and governance",
        description:
          "Defines Independent Observer as a standards-based analytic project: it applies the same criteria across political coalitions, makes claims correctable, and treats institutional trust as economic infrastructure. It develops a mechanism–prediction–levers–tradeoffs template, versioning, correction discipline, and a governance scorecard.",
        relevance:
          "The foundational method for Volume I: it explains how evidence, institutional design, and public reasoning are meant to work together before a conclusion is accepted.",
      },
      {
        title: "Capital Amplification and the Myth of Equal Opportunity",
        lens: "Labor, ownership, and civic agency",
        description:
          "Examines how skill becomes scalable advantage when joined to ownership, investor access, elite education, intellectual property, and legal-financial infrastructure. It contrasts capitalized talent with ordinary labor and questions whether exceptional immigrant-founder outcomes demonstrate broad opportunity.",
        relevance:
          "Applies Volume I’s systems method to labor, ownership, immigration, taxation, media, and civic agency: formal opportunity is tested against access to time, assets, and information.",
      },
      {
        title: "Quiet Wealth as Risk Management",
        lens: "Wealth, law, and exposure",
        description:
          "Develops a conceptual Quiet Wealth framework for status-exposure risk: visibility can create opportunity but also increase targeting, inner-circle opportunism, and administrative or legal friction. It connects privacy by design, household finance, entity governance, and lawful asset protection.",
        relevance:
          "Extends Volume I’s inquiry into how law, institutions, wealth, signaling, and risk management shape practical freedom and civic agency.",
      },
      {
        title:
          "The Attention Infrastructure Gap: Why Some Police Shootings Become National Symbols While Others Disappear",
        lens: "Media, evidence, and public memory",
        description:
          "Explains why comparable police-shooting incidents can receive radically different national attention. It models six amplification gates—evidence visibility, organizational readiness, narrative compressibility, population weight and concentration, media incentives, and elite signaling—and treats attention as an infrastructure market rather than a moral scoreboard.",
        relevance:
          "Brings Volume I’s media, evidence, public memory, and democratic-capacity method into a concrete case about which harms become visible and politically actionable.",
      },
    ],
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
    researchPapers: [
      {
        title: "Democracy’s Achilles’ Heel: Institutional Incentives and Political Outcomes",
        lens: "Democracy and institutions",
        description:
          "Examines how concentrated resources, unequal participation, information gatekeeping, partisan tolerance for rule-breaking, and weakened institutional referees can reinforce one another. The paper tests whether advantages are persistent, connected to identifiable pathways, and resistant to correction without reducing the diagnosis to a single cause.",
        relevance:
          "Establishes Volume II’s central question: how formal political equality can coexist with unequal practical power to set agendas, finance communication, participate, and obtain institutional correction.",
      },
      {
        title:
          "Civil Rights Realignment and Party Sorting in the United States: From Reconstruction to Contemporary Populism",
        lens: "Civil rights and party power",
        description:
          "Traces Republican coalition identity from Union and Reconstruction origins through disenfranchisement, the Voting Rights Act’s federal-enforcement effects, and later party sorting. It treats realignment and media-linked identity mechanisms as bounded historical hypotheses rather than a single-cause explanation.",
        relevance:
          "Shows how legal rights, administrative enforcement, coalition incentives, and political identity interact across time—one of Volume II’s core studies of institutional power.",
      },
      {
        title: "Human Rights, Policing Doctrine, and Hidden Taxation in Modern U.S. Governance",
        lens: "Policing, law, and fiscal power",
        description:
          "Develops hidden taxation as a framework for examining when policing, adjudication, and municipal finance become entangled through fines, fees, forfeiture, court costs, and related sanctions. It distinguishes legal instruments and jurisdictions, then proposes ability-to-pay safeguards, neutral collections, independent audits, and transparent distributional data.",
        relevance:
          "Makes Volume II’s enforcement principle concrete by showing how legal procedure and fiscal incentives can distribute exposure, burden, and accountability.",
      },
      {
        title:
          "The Welfare Queen and the Tax Cut: Racialized Dependency Politics and the Fragmentation of the American Working Class",
        lens: "Rhetoric, tax policy, and labor",
        description:
          "Explains how racialized representations of dependency helped legitimate a broader political-economic transformation. It follows a five-stage mechanism linking economic dislocation, unequal policy visibility, racialized deservingness, policy conversion, and institutional feedback across the Reagan, Clinton, and Obama periods.",
        relevance:
          "Connects Volume II’s history of party power to policy design: rhetoric, tax treatment, labor institutions, welfare rules, and immigration enforcement can form a durable governing order without identical parties or a single coordinating center.",
      },
      {
        title:
          "Empire’s Mirror: Foreign Lobbying, Concentrated Wealth, and Imperial Self-Understanding in the United States",
        lens: "Empire, donors, and agenda-setting",
        description:
          "Asks how foreign lobbying, concentrated private wealth, and institutional power shape congressional agenda-setting. It treats foreign lobbying as a disclosed influence channel rather than proof of control, and separates registration, spending, access, agenda attention, and policy outcomes.",
        relevance:
          "Extends Volume II’s sovereignty inquiry into the material channels through which money, information, organizational capacity, and veto power shape what democratic institutions can decide.",
      },
    ],
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
    researchPapers: [],
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
    researchPapers: [],
  },
];

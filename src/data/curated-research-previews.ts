import { familyIdForKey } from "./family-registry";
import type { ResearchPreview } from "./research-preview-types";

export const curationPreviewDate = "2026-11-12";
export const curationPreviewStatus = "Research preview · source review outstanding";

/** Original public summaries of seven source texts, reconciled into six new families.
 * Source files and private identifiers are deliberately excluded. No full-text release.
 */
const directions = [
  {
    id: "the-cost-of-political-independence",
    title: "The Cost of Political Independence",
    volume: "Volume II",
    branch: "Democracy institutions and party power",
    topics: ["Politics", "History"],
    summary:
      "Examines how belonging, status, participation resources and the available alternatives shape the move from private political disagreement to public criticism or action.",
    question:
      "When can citizens challenge their political coalition while retaining community ties and a meaningful route to accountability?",
    contribution:
      "Extends the volume’s work on party sorting and institutional responsiveness to the costs of dissent. It separates belief, public expression, affiliation and voting, and treats continued party membership as compatible with independent judgment.",
    evidenceNeeded:
      "Compare substantive agreement, social attachment, anticipated sanctions and distrust of alternatives rather than inferring motives from a vote. The proposed framework has no validated numerical index. Illustrative political populations have different histories and cannot be treated as equivalent or internally uniform.",
    sourceNote:
      "Working-paper source: Status, Belonging, and Democratic Accountability, dated 12 November 2026. This preview describes its research agenda; the full manuscript and its literature review remain under review.",
    relatedLinks: [
      {
        title: "The Illusion of Permanence",
        href: "/library/research/the-illusion-of-permanence/",
        label: "Research preview",
      },
      {
        title: "Democracy’s Achilles’ Heel",
        href: "/research/democracys-achilles-heel/",
        label: "Related article",
      },
    ],
  },
  {
    id: "the-illusion-of-permanence",
    title: "The Illusion of Permanence",
    volume: "Volume II",
    branch: "Democracy institutions and party power",
    topics: ["Politics", "History"],
    summary:
      "Distinguishes winning office, endorsing a policy, having the capacity to govern and sustaining a coalition. The Two-Year Pendulum is grouped here as a companion draft on electoral backlash.",
    question:
      "What evidence would justify treating an electoral victory as a durable policy mandate?",
    contribution:
      "Connects the interpretation of elections to the institutions that translate votes into governing power. Its companion draft asks how a later backlash should be evaluated through turnout, changing preferences and implementation rather than a single story about the electorate.",
    evidenceNeeded:
      "Election totals, approval surveys and policy preferences measure different things. Any dated polling, election outcome or causal explanation in the source drafts requires fresh verification before release. A historical midterm pattern is not a law, and changing officeholders does not by itself measure material improvement.",
    sourceNote:
      "Combines the research direction in How Electoral Victories Become Imaginary Mandates (30 October 2026) with The Two-Year Pendulum (5 November 2026). These are related drafts in one family, not two additional papers. This preview makes no claim about current election results.",
    relatedLinks: [
      {
        title: "The Cost of Political Independence",
        href: "/library/research/the-cost-of-political-independence/",
        label: "Research preview",
      },
      {
        title: "The Cycles of Political Hypocrisy",
        href: "/library/taxonomy/#paper-the-cycles-of-political-hypocrisy",
        label: "Research-map direction",
      },
    ],
  },
  {
    id: "the-civilizational-mirror",
    title: "The Civilizational Mirror",
    volume: "Volume II",
    branch: "Democracy institutions and party power",
    topics: ["Politics", "Law"],
    summary:
      "Uses a proposed comparison of France and Poland to ask how national-decline rhetoric can be evaluated against consistent standards of evidence and institutional accountability.",
    question:
      "How can observers test claims of national decline without treating different kinds of crisis as equivalent?",
    contribution:
      "Adds a comparative method for distinguishing street disorder, institutional disputes, media imagery and sweeping judgments about a society. The focus is the standard of assessment and the evidence needed to apply it consistently.",
    evidenceNeeded:
      "The source essay’s dated news chronology, quotations, images and constitutional claims require independent verification before a factual case study is released. A juxtaposition cannot establish an individual’s hypocrisy or motive. National and religious populations must not be treated as a single political actor.",
    sourceNote:
      "Research-essay source: France, Poland and the Politics of National Decline, dated 1 November 2026. This is a preview of the comparative question; it does not reproduce the source’s event claims or resolve a constitutional dispute.",
    relatedLinks: [
      {
        title: "The Cost of Political Independence",
        href: "/library/research/the-cost-of-political-independence/",
        label: "Research preview",
      },
      {
        title: "Who Is America For?",
        href: "/library/research/who-is-america-for/",
        label: "Research preview",
      },
    ],
  },
  {
    id: "who-is-america-for",
    title: "Who Is America For?",
    volume: "Volume II",
    branch: "Immigration citizenship and borders",
    topics: ["Politics", "Economics", "Law"],
    summary:
      "Separates immigration admission, civic belonging, local service capacity and democratic responsiveness, asking how costs, benefits and responsibilities can be evaluated across communities.",
    question:
      "How can immigration policy support a shared civic life while making local costs and institutional responsibilities visible?",
    contribution:
      "Extends the volume’s border and citizenship inquiry from legal categories to housing, schools, language access, labor protections and participation. It treats institutional competence and equal treatment as questions that can be examined together.",
    evidenceNeeded:
      "National averages cannot establish the experience of every locality. Compare housing supply, labor conditions, public investment and population change; distinguish citizenship, legal status and ancestry. The proposed civic framework remains open to criticism and does not infer loyalty or attitudes from a person’s origin.",
    sourceNote:
      "Working-paper source: Immigration, Civic Belonging and the Politics of Cultural Change, dated 5 November 2026. The draft is also identified as America for Americans. No current legal eligibility rules or numerical findings are reproduced.",
    relatedLinks: [
      {
        title: "Citizens Without a Country",
        href: "/library/documents/citizens-without-a-country/",
        label: "Public paper record",
      },
      {
        title: "Who Deported More?",
        href: "/library/documents/who-deported-more/",
        label: "Public paper record",
      },
    ],
  },
  {
    id: "ideology-military-necessity-and-the-indian-legion",
    title: "Ideology, Military Necessity, and the Indian Legion",
    volume: "Volume II",
    branch: "Empire geopolitics and sovereignty",
    topics: ["History", "Politics"],
    summary:
      "Studies wartime cooperation as a problem of unequal power: participation, ideological agreement, institutional incorporation and equal membership require separate evidence.",
    question:
      "What can an exception to a regime’s proclaimed ideology reveal about institutional priorities and the limits of membership?",
    contribution:
      "Connects the volume’s inquiry into sovereignty to the competing objectives of anti-colonial movements, military organizations and states. The Indian Legion is the proposed historical case, with recruitment, captivity, command and status treated as distinct questions.",
    evidenceNeeded:
      "Check institutional chronology and recruitment conditions against archival evidence. An enlistment record or uniform cannot establish an individual’s motives, freedom of choice or equal standing. Explanation of cooperation does not excuse Nazi racial ideology or establish ideological agreement by every participant; source abstracts must remain distinguishable from full archival study.",
    sourceNote:
      "Historical working-paper source: Nazi Racial Doctrine, Bose and the Limits of Wartime Cooperation, dated 30 October 2026. This preview reproduces no personnel tables, photographs or claims about hypothetical individual behavior.",
    relatedLinks: [
      {
        title: "From Colonization to China’s Rise",
        href: "/library/documents/from-colonization-to-chinas-rise/",
        label: "Public paper record",
      },
      {
        title: "Two Masks, One Face",
        href: "/library/documents/two-masks-one-face/",
        label: "Public paper record",
      },
    ],
  },
  {
    id: "ai-and-the-first-rung",
    title: "AI and the First Rung of Economic Opportunity",
    volume: "Volume IV",
    branch: "AI education and the future of work",
    topics: ["Technology", "Economics"],
    summary:
      "Asks whether AI can help established workers perform unfamiliar tasks while narrowing the entry-level opportunities through which newcomers gain experience.",
    question:
      "Can AI expand what workers can do while making the first step into a career harder to obtain?",
    contribution:
      "Extends the volume’s task-and-capability framework to hiring, workplace training and occupational mobility. It distinguishes faster task completion, valuable output, higher pay and access to a first job, with demand expansion considered as a competing mechanism.",
    evidenceNeeded:
      "The underlying material is a research brief and proposed episode, not a completed empirical paper. Separate measured adoption from modeled exposure, publication dates from data periods, and relative hiring gaps from causal job-loss estimates. Updated employer evidence and alternative explanations are needed before any claim about AI’s employment effects is released.",
    sourceNote:
      "Research brief dated 31 October 2026. Its comparison of Danish adoption research and U.S. payroll research remains a direction for review. This preview does not reproduce the brief’s third-party prose, numerical estimates or claimed study updates.",
    relatedLinks: [
      {
        title: "Factories Return but Do the Jobs",
        href: "/research/factories-return-but-do-the-jobs/",
        label: "Related article",
      },
      {
        title: "The Last Human Workforce",
        href: "/research/the-last-human-workforce/",
        label: "Related article",
      },
    ],
  },
];

export const curatedResearchPreviews: ResearchPreview[] = directions.map((entry) => ({
  ...entry,
  taxonomyId: `paper-${entry.id}`,
  familyId: familyIdForKey(entry.id),
  href: `/library/research/${entry.id}/`,
  status: curationPreviewStatus,
  manuscriptReleased: false,
  contextVolume: entry.volume,
  contextTitle:
    entry.volume === "Volume II" ? "The Empire Beneath Democracy" : "The Last Human Workforce",
  backHref:
    entry.volume === "Volume II"
      ? "/series/the-empire-beneath-democracy/#recent-research-directions"
      : "/series/the-last-human-workforce/#recent-research-directions",
  updatedDate: curationPreviewDate,
}));

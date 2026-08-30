import type { EditorialDetailSection, EditorialStatus } from "./content";

/**
 * Public-safe roadmap metadata derived from the Dropbox review package dated
 * 2026-08-15. These are review candidates, not publication or KDP approvals.
 */
export type SeriesItem = {
  volume: string;
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  detailLead?: string;
  detailSections?: EditorialDetailSection[];
};

export const seriesItems: SeriesItem[] = [
  {
    volume: "Volume I",
    title: "Independent Observer",
    category: "Democratic capacity",
    description:
      "Volume I is the method anchor for the Independent Observer series. It is about how a public claim becomes believable: what was observed, which sources support it, what context or contradiction is missing, how interpretation becomes argument, and how uncertainty is recorded. It brings law, labor, media, history, public memory, and democratic practice into one framework so readers can follow not only a conclusion but the path that produced it. Its central question is whether people can use and correct their institutions in practice, not merely whether those institutions are formally legitimate. The volume represents disciplined observation before judgment and is intended to establish the evidence, memory, and accountability standards used by the later volumes. It remains a review-stage catalogue entry, not a finished publication.",
    status: "In editorial development",
    detailLead:
      "Volume I moves from a method manifesto into a sequence of working papers about opportunity, wealth, attention, evidence, civic capacity, reputation, and public memory. Together they ask what people can know, contest, and change—and which institutions make those actions possible or impossible.",
    detailSections: [
      {
        heading: "How to read Volume I",
        paragraphs: [
          "Volume I represents disciplined observation before judgment. It separates documented record, interpretation, hypothesis, policy proposal, and unresolved question, then asks how information asymmetry, institutional design, and public memory change the meaning of a claim. The aim is not a single ideological conclusion; it is a visible and correctable route from evidence to public reasoning.",
        ],
        items: [
          "Civic capacity and institutional capacity are related but not interchangeable: one concerns people’s time, security, knowledge, and ability to participate; the other concerns administration, information collection, legal predictability, and policy continuity.",
          "Attention is treated as infrastructure rather than a moral scoreboard: evidence visibility, organizational readiness, narrative compressibility, population concentration, media incentives, and elite signaling can affect which events become nationally actionable.",
        ],
      },
      {
        heading: "Working papers and research directions",
        items: [
          "Manifesto of a Destiny: The Independent Observer Method — establishes the standards-based method, correction discipline, and governance vocabulary for the series.",
          "Capital Amplification and the Myth of Equal Opportunity — examines how ownership, investor access, education, intellectual property, and legal-financial infrastructure can amplify skill beyond formal opportunity.",
          "Quiet Wealth as Risk Management — studies how visibility, privacy, household finance, entity governance, and lawful asset protection shape exposure and practical autonomy.",
          "The Attention Infrastructure Gap — models why comparable police-shooting incidents can receive different levels of national attention and political action.",
          "From Plato to Chomsky: Democracy, Mass Manipulation, and the Problem of Civic Capacity — uses a two-dimensional civic-capacity and state-capacity frame across comparative cases, with public indicators treated as bounded inputs rather than a deterministic ranking.",
          "Study the Wall: Social Injustice, Institutional Power, Democratic Legitimacy, and the Politics of Structural Literacy — defines structural literacy as the ability to read how institutions classify claims, preserve records, allocate credibility, and decide what becomes visible.",
          "The Death of Evidentiary Patience — develops a provisional case-study frame for how imagery, historical memory, institutional distrust, emotional compression, and platform incentives can move public narratives toward judgment before investigation is complete.",
          "Reputation Debt — proposes that contempt and scapegoating can create delayed costs in trust, coalition-building, partnership, regulation, and talent retention even when they produce short-term mobilization.",
          "The Security of Memory — examines state funerals and contested burials as intersections of security, symbolism, media attention, institutional continuity, and collective legitimacy.",
          "The Silent Archivist — develops a lawful documentation and deferred-disclosure model for institutions where loyalty narratives can outweigh professional evidence, emphasizing preserved originals, chronology, neutral framing, and authorized correction channels.",
        ],
      },
      {
        heading: "Public record and research boundaries",
        paragraphs: [
          "Three Volume I papers currently have matched public SSRN records: the Foundational Manifesto, A Systems-Centered Manifesto on Automation, Education, and the Carceral State, and The Illusion of Equality. The other titles above are mapped research directions; naming them here does not claim that they are public SSRN records or released publications.",
          "The Foundational Manifesto’s public record was last directly verified at 23 downloads and 113 abstract views on 25 August 2026. The Systems-Centered Manifesto record was verified at 22 downloads and 120 abstract views, and The Illusion of Equality at 36 downloads and 137 abstract views, on 30 August 2026. These figures are time-varying usage signals—not quality scores, citations, endorsements, or peer review.",
        ],
      },
    ],
  },
  {
    volume: "Volume II",
    title: "The Empire Beneath Democracy",
    category: "Sovereignty and interdependence",
    description:
      "Volume II is the power inquiry of the Independent Observer series: it studies how authority can remain formally democratic while becoming materially managed. Its research map brings together four families—democracy, institutions, and party power; immigration, citizenship, and border; civil rights, the carceral state, and legal power; and empire, geopolitics, and sovereignty. Across those families, the volume asks who can set the agenda, who is exposed to enforcement, whose membership is recognized, which definitions make a statistic meaningful, and how capital, technology, security, labor, markets, and alliances shape practical sovereignty. It represents the inquiry beneath constitutional language, party rotation, and national claims of independence: the operating arrangements that narrow or expand usable public power. This remains a concept-stage catalogue entry, not a finished publication.",
    status: "Concept preview",
  },
  {
    volume: "Volume III",
    title: "Managed Decline",
    category: "Work and social citizenship",
    description:
      "A concept-stage account of Managed Decline: how the Western industrial order moved from steel mills, mass production, and stable wage institutions toward screen-based, service, platform, and data work—and how that transition redistributes time, security, and economic opportunity. Volume III studies labor markets, licensing, welfare, taxation, health systems, and public visibility, asking whether administrative systems restore social citizenship or manage constrained choices. Its research map connects the public reading copy The Wardhan Tax Doctrine with bounded working-paper directions including From Steel to Screens, From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential, and Welfare, Wealthfare, and Social Control in Advanced Democracies. These are research directions and reading links, not a claim that every manuscript is a released publication.",
    status: "Concept preview",
  },
  {
    volume: "Volume IV",
    title: "The Last Human Workforce",
    category: "AI and human capability",
    description:
      "A concept-stage capability inquiry into how technological change becomes usable human capacity. Volume IV follows AI, automation, scientific infrastructure, energy, quantum computing, medical technology, neuroprosthetics, education, intimacy, and human evolution. It asks what must be understood, maintained, financed, and governed before a new tool can be called progress: who owns the compute and data, who can repair the systems, who receives training and care, which claims survive evidence review, and how institutions protect human agency when technology becomes opaque. The volume represents the material and social conditions of adaptation—from the energy and semiconductor base of advanced computation to the embodied, cognitive, and civic capabilities that let people use it. It remains an editorial-development catalogue entry, not a finished publication.",
    status: "In editorial development",
  },
];

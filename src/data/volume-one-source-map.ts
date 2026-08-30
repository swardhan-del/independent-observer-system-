import { sitePath } from "../lib/paths";

export type VolumeOneSourceMaterial = {
  id: string;
  family: string;
  status: string;
  title: string;
  summary: string;
  contribution: string;
  href?: string;
};

/**
 * Public-safe summaries of the Volume I source package supplied for editorial review.
 * These entries describe source material; they do not publish the source files themselves.
 */
export const volumeOneSourceMap: VolumeOneSourceMaterial[] = [
  {
    id: "manifesto-of-a-destiny-method",
    family: "Method and governance",
    status: "Public SSRN record · reading copy",
    title: "Manifesto of a Destiny: The Independent Observer Method",
    summary:
      "The current manifesto defines independence as consistency: apply the same standards across coalitions, separate mechanism from prediction and proposal, and revise claims through an explicit correction rule. It treats institutional trust as infrastructure and describes the verification, delay, enforcement, and risk costs that can follow opaque or selectively applied rules.",
    contribution:
      "This is the Volume I anchor. It gives the wider source set a reusable claim format, versioning discipline, and a nonpartisan way to move from observation to institutional diagnosis.",
    href: sitePath("/library/documents/independent-observer-volume-one-ssrn/"),
  },
  {
    id: "from-plato-to-chomsky",
    family: "Civic and institutional capacity",
    status: "Working preprint · public record not confirmed",
    title: "From Plato to Chomsky: Democracy, Mass Manipulation, and the Problem of Civic Capacity",
    summary:
      "This theory-building preprint asks why elections can coexist with weak implementation, clientelism, majoritarian pressure, or elite-managed consent. It keeps civic capacity—knowledge, time, security, media literacy, association, and procedural norms—distinct from institutional capacity such as administration, fiscal reach, information collection, and legal predictability. Its comparative matrix and five propositions are presented as a heuristic, not a civilizational ranking or deterministic law.",
    contribution:
      "It extends the manifesto into a comparative research design and gives Volume I a clear way to discuss elections, public literacy, state capacity, media systems, and correction without turning capacity into a test for political rights.",
  },
  {
    id: "formation-through-struggle",
    family: "Learning and human development",
    status: "Working paper · public record not confirmed",
    title:
      "Formation Through Struggle: Learning Beyond Merit in the Independent Observer Manifesto",
    summary:
      "The paper argues that struggle, failure, uncertainty, and disruption become educationally meaningful only when they are transformed through reflection, inquiry, support, disciplined action, and public reasoning. It rejects romanticizing suffering and proposes transparent standards, recoverable failure, disability support, procedural review, plural academic and vocational routes, and routes back after exclusion.",
    contribution:
      "It supplies the human-development bridge in Volume I: institutions should distinguish structured challenge from arbitrary harm and preserve a person’s capacity to learn, adapt, and return.",
  },
  {
    id: "knowledge-skills-abilities",
    family: "Capability and institutional recognition",
    status: "Conceptual preprint · public record not confirmed",
    title: "The Power of Knowledge, Skills, and Abilities",
    summary:
      "This conceptual paper separates knowledge, skill, ability, competence, and credential, then describes a capability-preservation cycle: learn, retain, integrate, demonstrate, translate, and redeploy. Its medical-education illustration shows why prior learning can carry option value across research, public health, biotechnology, administration, and communication while still not conferring a license or professional authority.",
    contribution:
      "It makes Volume I’s idea of capability precise: institutional recognition matters, but a credential is not the whole of what a person has learned or can later prove and use.",
  },
  {
    id: "systems-centered-manifesto",
    family: "Automation, labor, and civic capacity",
    status: "Public SSRN record · reading copy",
    title: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
    summary:
      "This systems paper links automation in global supply chains with skill mismatch, incarceration, recidivism, and reentry. It argues that tariffs alone are an imprecise route to employment when production is automated and geographically flexible, and pairs industrial policy with vocational learning, apprenticeships, second-chance hiring, and local capability-building.",
    contribution:
      "It shows the Volume I method operating across policy boundaries: labor, education, technology, and legal institutions are read as one connected system and then translated into testable reform proposals.",
    href: sitePath("/library/documents/a-systems-centered-manifesto-ssrn/"),
  },
  {
    id: "state-of-exception",
    family: "Rights and emergency power",
    status: "SSRN submission draft · public record not confirmed",
    title: "The State of Exception: Constitutional Rights in Declining Empires",
    summary:
      "This working paper examines how emergency powers can move from temporary response to durable legal, administrative, and digital infrastructures of control. Its historical and conceptual frame brings constitutional rights, wartime fear, surveillance, and the boundary between emergency and normal governance into the Volume I method of evidence and institutional review.",
    contribution:
      "It adds a rights-protection test to the volume’s account of legitimacy: a public system must be judged not only by the rules it announces, but by what happens when it claims necessity.",
  },
  {
    id: "security-of-memory",
    family: "Memory and symbolic legitimacy",
    status: "Working paper · reference review required",
    title:
      "The Security of Memory: State Funerals, Political Legacies, and the Global Architecture of Mourning",
    summary:
      "This working paper reads state funerals and contested burials as intersections of security operations, public ritual, media attention, physical remains, and institutional continuity. It asks how the management of a leader’s death can preserve, redirect, or challenge political legitimacy, while retaining a visible boundary around claims that need stronger source review.",
    contribution:
      "It extends Volume I’s documentation and public-memory inquiry beyond written records into ceremony, embodiment, security coordination, and the symbols through which institutions continue after a leader is gone.",
  },
  {
    id: "study-the-wall-audit",
    family: "Documentation and structural literacy",
    status: "Mapping hold · complete manuscript not verified",
    title:
      "Study the Wall: Social Injustice, Institutional Power, Democratic Legitimacy, and the Politics of Structural Literacy",
    summary:
      "The supplied source review contains a categorization audit, not a complete standalone manuscript. The audit confirms the intended Volume I placement but records that the full document was not verified. The public map therefore keeps this title as a research direction rather than implying that a readable paper has been uploaded.",
    contribution:
      "The hold is part of the method: Volume I treats an honest gap in the record as information. The underlying research direction would connect institutional classification, documentation, visibility, legitimacy, and correction.",
  },
  {
    id: "illusion-of-equality",
    family: "Institutional power and political economy",
    status: "Public SSRN record · reading copy",
    title:
      "The Illusion of Equality: The Founding Fathers’ Contradictions, the Flaws of Democracy, and the Future of U.S. Economic Influence",
    summary:
      "This historical and political-economy working paper examines the gap between equality language and the constitutional, legal, electoral, and economic structures that distribute power. It connects founding-era exclusions, representation, corporate influence, reserve-currency politics, and contemporary economic strategy as a case for reading context and incentives together.",
    contribution:
      "It gives the method a concrete institutional case: formal rights, historical inheritance, present incentives, and practical capacity must be connected before a claim about democratic equality is accepted.",
    href: sitePath("/library/documents/the-illusion-of-equality-ssrn/"),
  },
] as const;

export const volumeOneSourceMapSummary = {
  total: volumeOneSourceMap.length,
  publicRecordCount: volumeOneSourceMap.filter((source) => source.href).length,
  note: "These are curated public-safe summaries of reviewed Volume I source material. Raw manuscripts, PDFs, private paths, and unverified public records remain outside the site.",
} as const;

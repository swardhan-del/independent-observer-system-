export type ResearchReadingCopy = {
  version: string;
  updatedDate: string;
  introduction: string;
  sections: { id: string; title: string; paragraphs: string[]; sourceIds?: string[] }[];
  sources: { id: string; title: string; url: string; scope: string }[];
};

/** Complete web essays, adapted from the named research directions. Source manuscripts
 * retain their review status. No private file, external publication or peer review is implied.
 */
export const researchReadingCopies: Record<string, ResearchReadingCopy> = {
  "the-cost-of-political-independence": {
    version: "1.0",
    updatedDate: "2026-11-13",
    introduction:
      "This is the complete text of a public web essay adapted from the 12 November 2026 working paper, Status, Belonging, and Democratic Accountability. It develops the central argument with selected sources. The longer source manuscript remains under review. This essay is a conceptual synthesis, with no new survey or estimate of any population’s motives.",
    sections: [
      {
        id: "independence-and-belonging",
        title: "Independence can coexist with belonging",
        paragraphs: [
          "A person can recognize a false statement, dislike a party’s leadership and still vote for that party. That combination does not explain itself. The voter might agree with most of its programme, regard the alternative as worse, value a community associated with it, or expect criticism to damage important relationships. Those possibilities can produce the same electoral result. Treating the result as proof of one motive prevents investigation before it starts.",
          "Political independence is useful here as a practice: applying standards consistently, identifying the basis of a claim and allowing a conclusion to change. It does not require being unaffiliated or changing parties. A partisan who challenges a favoured leader can practise independence; an unaffiliated commentator can repeat a preferred audience’s assumptions. The relevant question is whether a judgment remains open to correction.",
          "Four decisions need to be kept separate: what a person privately believes, what they say publicly, the party they identify with and the candidate they select in a particular election. A change in one does not guarantee a change in the others. Someone may correct a factual belief while retaining the same vote because the available alternatives have not changed. Understanding that distinction makes disagreement more informative and less accusatory.",
        ],
      },
      {
        id: "loyalty-and-evidence",
        title: "What research can establish about loyalty",
        paragraphs: [
          "Barber and Pope’s 2019 study used contrasting policy statements attributed to Donald Trump to investigate the influence of party and leader cues. Several groups with stronger Republican or pro-Trump attachments were more likely to accept the cue in either ideological direction. This provides evidence that expressed positions can depend on who endorses them. It does not tell us why every supporter votes as they do or establish the prevalence of that mechanism today.",
          "A different historical setting requires a different account. White and Laird’s Steadfast Democrats examines social relationships and political norms in Black American communities. Its account connects solidarity and community expectations to Democratic affiliation. That framework makes social context part of the explanation; it is not a warrant to infer an individual’s motives from race. Black Americans are a diverse population, while a political movement is an affiliation. Comparing mechanisms across them cannot make the groups interchangeable.",
          "These studies should prompt questions rather than supply labels to attach to strangers. Does a person accept a policy because they have assessed its consequences? Do they defer to a trusted intermediary? Does their answer change with the audience? Evidence for one mechanism does not eliminate the others. A fair analysis also leaves room for the possibility that a citizen has reached a reasoned conclusion with which the observer disagrees.",
        ],
        sourceIds: ["party-cues", "social-norms"],
      },
      {
        id: "costs-of-dissent",
        title: "Three costs between disagreement and action",
        paragraphs: [
          "The working paper distinguishes relational, practical and electoral costs. A relational cost is the anticipated loss of trust or standing among people whose opinions matter. A practical cost is the effort needed to investigate, organize or challenge a decision. An electoral cost is the expected consequence of weakening a coalition when its rival seems less acceptable. These are proposed categories for inquiry, not a validated scoring system.",
          "Imagine a volunteer who privately objects to a misleading campaign claim. They might speak to the organizer, publish a criticism, leave the campaign or remain silent. The available time, the organizer’s willingness to listen and the volunteer’s assessment of the opposing candidate all affect that choice. Silence alone does not distinguish agreement from exhaustion, strategic restraint or fear of rejection. This is a hypothetical example, not a finding about a named campaign.",
          "Brady, Verba and Schlozman’s resource model treats time, money and civic skills as important resources for political participation. It provides a reason to examine what people can practically do, alongside what they believe. Applying that insight specifically to the cost of independent scrutiny is an extension proposed here. Their study did not validate this essay’s three-cost framework.",
        ],
        sourceIds: ["participation"],
      },
      {
        id: "accountability-test",
        title: "Can criticism produce a correction?",
        paragraphs: [
          "The central proposition is conditional: accountability may weaken when criticizing a coalition internally is costly and the alternatives outside it seem unacceptable. Continued support then need not mean satisfaction. But staying can also make correction possible. A member who helps replace poor leadership may exercise more influence than a dissatisfied member who quietly leaves. Counting defections is therefore an inadequate measure of independent judgment.",
          "Graham and Svolik’s 2020 research examined how voters trade democratic principles against partisan and policy considerations. Their candidate-choice experiment and analysis of a particular election found limits to the electorate’s willingness to penalize undemocratic conduct. This supports scrutiny of those tradeoffs. It does not establish that every voter accepts such conduct or that competing parties commit identical violations.",
          "A useful accountability test asks what happens after an error becomes clear. Can members question leaders without being expelled from the conversation? Is there a practical way to challenge a nomination or revise a policy? Do rules bind favoured representatives as well as opponents? These questions concern the consequences of criticism. They leave room for different political choices while insisting that a coalition’s claims remain examinable.",
        ],
        sourceIds: ["democratic-tradeoffs"],
      },
      {
        id: "testing-the-framework",
        title: "What could show this explanation is wrong?",
        paragraphs: [
          "A serious test would measure private beliefs, public statements, affiliation and voting intentions separately over time. It would also measure issue priorities, trust in leaders, assessments of alternatives and participation resources. Comparing people within a community would help avoid explaining every difference with a broad identity label. Interviews could distinguish experienced pressure from ordinary disagreement or a sincerely accepted obligation.",
          "Causal interpretation would remain difficult. People choose their social networks; political attachment can shape perceptions of risk. A survey answer can change because a question was misunderstood or because the respondent guessed what the researcher wanted. Confidentiality and consent are essential when investigating potentially costly political expression. Anticipated rejection must also be distinguished from documented consequences.",
          "The account should weaken if social costs do not help explain differences between private and public judgments after alternatives are considered. It should be qualified when loyal members repeatedly correct leaders. Those possibilities matter: a framework that treats both criticism and silence as automatic proof of manipulation cannot be meaningfully tested.",
        ],
      },
      {
        id: "independence-conclusion",
        title: "A standard the observer must also accept",
        paragraphs: [
          "Public education can make reasoning easier by presenting a claim, identifying its sources, explaining uncertainty and showing the strongest competing interpretation. Its success should be judged by whether readers can evaluate an argument and revise factual beliefs. A predetermined requirement that they move to a particular party would confuse education with recruitment.",
          "The same test applies to Independent Observer. An argument should remain correctable when a correction disappoints the author, an audience or a prospective supporter. Community membership can provide the trust and cooperation needed for public action. Independence means retaining the capacity to question that community’s representatives. Effective accountability also requires channels through which that questioning can change what they do.",
        ],
      },
    ],
    sources: [
      {
        id: "party-cues",
        title: "Barber and Pope (2019), Does Party Trump Ideology?",
        url: "https://doi.org/10.1017/S0003055418000795",
        scope:
          "Published research abstract checked. Supports the bounded claim about policy responses to leader cues; no claim about all current voters.",
      },
      {
        id: "social-norms",
        title: "White and Laird (2020), Steadfast Democrats",
        url: "https://csdp.princeton.edu/publications/steadfast-democrats-how-social-forces-shape-black-political-behavior",
        scope:
          "Princeton’s publication description checked for the book’s argument about social norms and historically formed ties; not a full-book re-review.",
      },
      {
        id: "participation",
        title: "Brady, Verba and Schlozman (1995), Beyond SES",
        url: "https://doi.org/10.2307/2082425",
        scope:
          "Published abstract checked for the resource model. The application to independent scrutiny is this essay’s inference.",
      },
      {
        id: "democratic-tradeoffs",
        title: "Graham and Svolik (2020), Democracy in America?",
        url: "https://doi.org/10.1017/S0003055420000052",
        scope:
          "Published abstract checked for study design and the reported tradeoff between democratic principles and electoral preferences.",
      },
    ],
  },
  "ai-and-the-first-rung": {
    version: "1.0",
    updatedDate: "2026-11-13",
    introduction:
      "This is the complete text of a public web essay developed from the Volume IV research brief of 31 October 2026. It compares three distinct kinds of evidence and develops an original framework for evaluating opportunity. It is a working synthesis, not the release of a larger manuscript, a new empirical study or a claim of peer review. Source editions were checked on 13 November 2026.",
    sections: [
      {
        id: "capability-and-entry",
        title: "Doing a task and entering a profession",
        paragraphs: [
          "An assistant can make a worker better at a task while an employer decides to recruit fewer beginners. These possibilities are compatible because performance within a job and access to a job are different outcomes. The first rung of a career is the opportunity to acquire experience under real constraints: deadlines, colleagues, customers and responsibility for mistakes. A technology that changes the work can also change how people gain that experience.",
          "That tension is a question to investigate. Lower costs might expand demand and create additional entry routes. Better tools might make novice workers more useful, encourage hiring or allow smaller organizations to offer services they previously could not. Alternatively, employers might rely on existing staff and reduce junior recruitment. The direction cannot be settled by showing that a model performs well on a benchmark.",
          "The practical distinction is between task performance, organizational output, compensation and access to opportunity. A change in one does not establish a change in the others. A faster worker might handle more requests without earning more. A firm might produce more without hiring. A newcomer might learn faster after being hired while finding it harder to get hired in the first place.",
        ],
      },
      {
        id: "workplace-productivity",
        title: "Evidence from people already at work",
        paragraphs: [
          "Brynjolfsson, Li and Raymond’s published study, Generative AI at Work, examines the introduction of an AI assistant among 5,172 customer-support agents. The reported average improvement was 15% in issues resolved per hour. Less experienced and lower-skilled agents gained more; the most experienced agents saw smaller speed gains and some deterioration in conversation quality. The outcome is a specific workplace productivity measure, not a general employment forecast.",
          "The study makes the optimistic mechanism credible: assistance can help people who are already in a role perform unfamiliar work. It does not establish that every occupation benefits equally or that employers will expand junior hiring. To answer the entry question, we would need recruitment and training evidence as well as performance records. Learning inside a particular workplace and obtaining access to that workplace remain distinct parts of the problem.",
        ],
        sourceIds: ["ai-at-work"],
      },
      {
        id: "danish-adoption",
        title: "Task changes can precede earnings changes",
        paragraphs: [
          "Humlum and Vestergaard’s 2026 working-paper abstract links adoption surveys to administrative labor-market records in Denmark. It reports substantial workplace adoption and task reorganization, alongside estimates near zero for earnings and recorded hours over the early period studied. The authors report excluding average effects larger than 2% at the worker and workplace levels two years after ChatGPT’s launch.",
          "That finding is bounded by its population, period and method. It is not proof that AI has no effect, nor a measurement of what every later system will do. Adoption was not randomly assigned; interpretation depends on the difference-in-differences design and its comparison assumptions. The paper also distinguishes task changes and occupational transitions from average pay. A quiet average can coexist with meaningful changes in the composition of work.",
        ],
        sourceIds: ["danish-study"],
      },
      {
        id: "junior-hiring",
        title: "A warning from younger workers’ employment",
        paragraphs: [
          "The August 12, 2026 revision of Canaries in the Coal Mine uses ADP payroll records through June 2026. Its authors report that employment of workers aged 22–25 in highly AI-exposed occupations was 19% below the path implied by less-exposed peers, with weaker hiring playing a larger role than separations. They do not report economy-wide displacement. The 19% is a relative gap against a comparison path, not a count of jobs proved to have been destroyed by AI.",
          "The authors explicitly describe these patterns as descriptive rather than causal. They note sensitivity to education controls, some diverging trends before generative AI and differences from national survey benchmarks. These qualifications are part of the result. The evidence warrants monitoring younger workers’ access to employment; it cannot isolate AI as the sole cause of the gap.",
          "This does not directly contradict the Danish study. The country, sample, age groups, adoption measures, comparison methods and observation periods differ. Combining their estimates as though they described one common experiment would erase the differences that make the research interpretable. The useful comparison concerns which parts of the labor market each study can observe.",
        ],
        sourceIds: ["canaries"],
      },
      {
        id: "opportunity-measures",
        title: "What an opportunity audit should measure",
        paragraphs: [
          "Start with actual implementation: which teams use which tools, for which tasks and from what date? Occupational exposure is a useful starting point, but it is not the same as documented adoption by an employer. Then examine vacancies, applicants, hires and separations separately. Stable headcount can conceal reduced hiring if fewer existing workers leave. A job advertisement is also different from a filled position.",
          "Track the route after entry. How much supervised practice do new workers receive? Who reviews errors? Are they progressing to tasks that require judgment, or only checking automated output? Follow pay, training time, promotion and moves between occupations. Comparing adopting and non-adopting teams requires attention to demand, financing conditions, education, workforce composition and trends already present before adoption.",
          "Consider a fictional support team that keeps ten experienced workers, cancels two planned trainee places and uses an assistant to handle additional requests. Output may rise while entry opportunities fall. Now imagine the lower cost brings in enough new customers to support four trainee places. Both scenarios are possible. The numbers are illustrative; they show why the hiring decision has to be observed rather than inferred from a productivity gain.",
        ],
      },
      {
        id: "first-rung-conclusion",
        title: "Capability needs a route into practice",
        paragraphs: [
          "One response worth testing is to preserve structured entry routes while redesigning training around the tools people actually use. Supervised placements, explicit progression standards and evaluation of independent judgment are possible components. Whether they work depends on costs, demand and the quality of supervision. This is a proposal for evaluation, not a claim that a particular programme already solves the problem.",
          "The strongest counterargument is that protecting older job structures can obstruct better routes into work. A new firm or occupation may teach skills differently and create opportunities that established job categories miss. An audit should therefore record new routes as well as lost ones and compare their pay, accessibility and long-term prospects. Preserving the first rung need not mean preserving every old task.",
          "The central standard for Volume IV is human capability that people can actually exercise. Tools may widen what someone can do while institutions determine whether they receive a chance to practise, earn and advance. The question is therefore both technological and organizational: who gains assistance, who gains access, and what evidence shows that the path from one to the other remains open?",
        ],
      },
    ],
    sources: [
      {
        id: "ai-at-work",
        title: "Brynjolfsson, Li and Raymond (2025), Generative AI at Work",
        url: "https://doi.org/10.1093/qje/qjae044",
        scope:
          "Quarterly Journal of Economics 140(2), 889–942. Published abstract and introduction checked; customer-support performance is distinct from economy-wide hiring.",
      },
      {
        id: "danish-study",
        title: "Humlum and Vestergaard (2026), Still Waters, Rapid Currents",
        url: "https://www.rfberlin.com/network-paper/still-waters-rapid-currents-early-labor-market-transformation-under-generative-ai/",
        scope:
          "Working-paper abstract posted 20 March 2026 checked. Describes early Danish adoption, task reorganization, earnings and recorded hours.",
      },
      {
        id: "canaries",
        title:
          "Brynjolfsson, Chandar and Chen, Canaries in the Coal Mine (12 August 2026 revision)",
        url: "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/",
        scope:
          "Authors’ revised research summary checked. Data through June 2026; descriptive comparisons, not causal estimates of AI displacement.",
      },
    ],
  },
};

export const readingCopyMinutes = (copy: ResearchReadingCopy) =>
  Math.max(
    1,
    Math.ceil(
      copy.sections
        .flatMap((s) => s.paragraphs)
        .join(" ")
        .split(/\s+/).length / 220,
    ),
  );

import type { PublicDocument, PublicDocumentSection, PublicCitation } from "./documents";
import { familyIdForKey } from "./family-registry";
import { placementDecisionFor } from "./placement-decisions";

const reviewedAt = "18 September 2026";
type ReadingInput = {
  id: string;
  taxonomyId: string;
  title: string;
  volume: string;
  category: string;
  description: string;
  sourceDate: string;
  sections: PublicDocumentSection[];
  evidence: PublicCitation[];
  limitations: string[];
  related?: string[];
};

const readings: ReadingInput[] = [
  {
    id: "empires-mirror",
    taxonomyId: "paper-empire-s-mirror",
    title: "Empire’s Mirror",
    volume: "Volume II",
    category: "Democracy, Institutions & Political Power",
    description:
      "Foreign lobbying, concentrated wealth and agenda-setting: how to distinguish access from influence and control.",
    sourceDate: "17 August 2026",
    sections: [
      {
        id: "argument",
        heading: "From personalities to institutions",
        paragraphs: [
          "The paper asks how organized resources become durable political capacity. Its argument concerns the ability to maintain expertise, relationships, legal support and institutional memory across election cycles—not a claim that every policy decision is purchased.",
          "The mirror is a comparative question: when a state condemns an influence mechanism abroad, what distinguishes that mechanism from practices it permits at home? Legal authority, transparency, consent and opportunities for challenge matter. Similar mechanisms do not make different political systems morally equivalent.",
        ],
      },
      {
        id: "disclosure",
        heading: "What the public record establishes",
        paragraphs: [
          "The Justice Department describes FARA as requiring specified agents of foreign principals to disclose covered relationships, activities, receipts and disbursements. Such records can identify an advocacy relationship. They do not, by themselves, show that advocacy caused a policy outcome.",
          "Foreign-agent disclosure and campaign-finance reporting concern different legal channels. A registration is not a finding of wrongdoing, and neither a donation nor a meeting alone establishes control. This synopsis omits allegations about named current individuals and does not infer guilt from association.",
        ],
        evidenceIds: ["mirror-fara"],
      },
      {
        id: "inference",
        heading: "An evidence ladder",
        paragraphs: [
          "The author proposes escalating the evidence requirement as the claim becomes stronger.",
        ],
        table: {
          caption: "Each stronger claim needs additional evidence",
          headers: ["Claim", "Question to test"],
          rows: [
            ["Access", "Was a meeting, submission or communication documented?"],
            ["Influence", "Did the intervention change attention, wording or a decision?"],
            [
              "Dependence",
              "Would the institution have acted differently without the resource provider?",
            ],
            [
              "Control",
              "Is there evidence of direction, compliance and exclusion of credible alternatives?",
            ],
          ],
        },
      },
      {
        id: "test",
        heading: "What would challenge the argument?",
        paragraphs: [
          "A useful study would connect dated contacts to committee agendas, bill changes and decisions, while accounting for prior preferences, constituency interests and genuine security concerns. Opposition, failed lobbying and cases with extensive access but no policy change belong in the comparison.",
          "The manuscript offers an institutional interpretation, not that contact-level causal dataset. Its reform proposals should therefore be assessed as proposals: would clearer disclosure and stronger legislative capacity make competing claims easier to investigate without restricting lawful advocacy?",
        ],
      },
    ],
    evidence: [
      {
        id: "mirror-fara",
        label: "U.S. Department of Justice",
        citation:
          "Foreign Agents Registration Act: disclosure purpose and covered relationships. Reviewed 18 September 2026.",
        url: "https://www.justice.gov/nsd-fara",
      },
    ],
    limitations: [
      "No causal estimate of lobbying effects is supplied.",
      "The comparison concerns mechanisms, not moral equivalence or allegations against particular people.",
    ],
    related: ["empire-of-distraction", "the-american-empire-was-never-a-democracy"],
  },
  {
    id: "the-fear-circuit",
    taxonomyId: "paper-the-fear-circuit",
    title: "The Fear Circuit",
    volume: "Volume II",
    category: "Media Psychology, Politics & Threat Perception",
    description:
      "An untested multilevel hypothesis, with separate evidence domains and a research design that could disprove the proposed links.",
    sourceDate: "17 August 2026",
    sections: [
      {
        id: "hypothesis",
        heading: "A hypothesis—not a discovered circuit",
        paragraphs: [
          "The manuscript asks whether measured exposure histories, affect regulation and repeated media threat cues interact to influence perceived danger. It does not establish a unified neural circuit for collective political behavior. In particular, it does not demonstrate that alcohol causes xenophobia, extremism or a particular political preference.",
          "This public reading page explains the question and the limits of inference. It does not release the manuscript as a validated scientific account; focused scientific review of its biological and cross-domain claims remains outstanding.",
        ],
      },
      {
        id: "evidence-domains",
        heading: "Keep the evidence domains separate",
        paragraphs: [
          "The proposed study must measure each domain rather than treating an analogy as a causal bridge.",
        ],
        table: {
          caption: "Research questions are not interchangeable findings",
          headers: ["Domain", "Required distinction"],
          rows: [
            [
              "Exposure history",
              "Individual timing, dose and context are not national drinking averages.",
            ],
            ["Psychological process", "A measured mediator is not a metaphor about dopamine."],
            [
              "Media response",
              "Sharing a message is not the same outcome as believing it or voting.",
            ],
            [
              "Political behavior",
              "Institutional trust, identity and material insecurity may offer rival explanations.",
            ],
          ],
        },
      },
      {
        id: "source-anchor",
        heading: "One bounded empirical anchor",
        paragraphs: [
          "Brady and colleagues studied moral-emotional language and the spread of messages in a sample of tweets about polarizing issues. That study provides a specific media-diffusion anchor, not evidence for an alcohol-to-politics causal chain. Its platform, sample and outcome must remain visible when drawing lessons from it.",
        ],
        evidenceIds: ["fear-brady"],
      },
      {
        id: "falsification",
        heading: "How the hypothesis could fail",
        items: [
          "Measure exposure, proposed mediators and political outcomes separately, with an explicit temporal order.",
          "Preregister competing explanations, including prior attitudes, stress, socioeconomic conditions and audience self-selection.",
          "Test whether the proposed interaction adds explanatory value beyond those alternatives.",
          "Reject or narrow the model if credible controls remove the association, the mediators are absent, or independent studies fail to replicate it.",
        ],
        paragraphs: [
          "A national correlation cannot diagnose individual brains. Nor can this hypothesis justify treating alcohol-harm prevention or media education as a validated treatment for a political condition. Any intervention requires its own evidence, outcomes and ethical review.",
        ],
      },
    ],
    evidence: [
      {
        id: "fear-brady",
        label: "NYU Center for Social Media and Politics",
        citation:
          "Brady et al. (2017), Emotion Shapes the Diffusion of Moralized Content in Social Networks. Research-team summary of the PNAS study; not a test of the Fear Circuit hypothesis.",
        url: "https://csmapnyu.org/research/academic-research/emotion-shapes-the-diffusion-of-moralized-content-in-social-networks",
      },
    ],
    limitations: [
      "The combined biological–media–political mechanism is untested.",
      "Specialist scientific review remains outstanding. This is not a diagnosis of voters or populations, or medical advice.",
    ],
    related: ["when-the-storm-decides"],
  },
  {
    id: "sanctioned-capital-and-the-american-opportunity-myth",
    taxonomyId: "paper-sanctioned-capital-and-the-american-opportunity-myth",
    title: "Sanctioned Capital and the American Opportunity Myth",
    volume: "Volume II",
    category: "Capital, Legal Institutions & Enforcement",
    description:
      "A governance analysis distinguishing lawful foreign investment, elevated risk and prohibited conduct through the problem of beneficial ownership.",
    sourceDate: "30 July 2026",
    sections: [
      {
        id: "argument",
        heading: "Openness and visibility are different questions",
        paragraphs: [
          "The manuscript argues that an economy can attract productive foreign investment while still having difficulty connecting an asset to the natural people who ultimately own or benefit from it. The problem is fragmented information, not the mere presence of foreign money or a complex corporate structure.",
          "Its opportunity critique is an author interpretation: people and capital can face different forms of identification and scrutiny. That claim should be investigated through specific institutions and transactions, not converted into a presumption that an investor, nationality or financial center is illicit.",
        ],
      },
      {
        id: "categories",
        heading: "Three categories that should not be collapsed",
        items: [
          "Lawful investment: legitimate capital and structures used for ordinary business, governance or asset management.",
          "Elevated risk: circumstances that call for closer fact-finding but do not themselves establish wrongdoing.",
          "Prohibited conduct: a transaction or property interest restricted by the applicable law, with liability depending on the relevant rules and facts.",
        ],
      },
      {
        id: "ownership",
        heading: "An ownership rule is not a name-list shortcut",
        paragraphs: [
          "OFAC’s FAQ 401 explains that entities owned 50 percent or more in aggregate, directly or indirectly, by blocked persons can themselves be blocked. Its examples show how indirect ownership is evaluated through blocked intermediary entities; simply multiplying percentages through every corporate layer is not an adequate substitute for the guidance.",
          "FAQ 398 distinguishes ownership from control: control alone does not automatically trigger the general 50 Percent Rule, although other prohibitions and designation risks may still matter. These are selected U.S. guidance points checked on 18 September 2026, not a complete transaction analysis.",
        ],
        evidenceIds: ["capital-401", "capital-398"],
      },
      {
        id: "information",
        heading: "Follow the information as well as the money",
        paragraphs: [
          "The paper proposes tracing which participant knows the investor, which knows the vehicle, and which records the asset. A bank, fund administrator, custodian and registry may each see a different fragment. Investigating that gap requires dated ownership and control evidence, not assumptions based on an offshore address.",
          "This bounded page omits the source’s current reporting-law timelines, aggregate financial figures and enforcement examples. They require separate currency checks before reuse. Its policy question is whether risk-calibrated transparency can improve detection without treating legitimate investment as inherently suspect.",
        ],
      },
    ],
    evidence: [
      {
        id: "capital-401",
        label: "U.S. Treasury / OFAC",
        citation:
          "FAQ 401: indirect ownership under the 50 Percent Rule; reviewed 18 September 2026.",
        url: "https://ofac.treasury.gov/faqs/401",
      },
      {
        id: "capital-398",
        label: "U.S. Treasury / OFAC",
        citation: "FAQ 398: ownership and control; reviewed 18 September 2026.",
        url: "https://ofac.treasury.gov/faqs/398",
      },
    ],
    limitations: [
      "Not legal, sanctions, tax or investment advice. Programs, licenses and reporting obligations change.",
      "No finding of misconduct is made about any person, jurisdiction or intermediary.",
    ],
    related: ["empires-mirror"],
  },
  {
    id: "how-command-states-finance-power",
    taxonomyId: "paper-how-command-states-finance-power",
    title: "How Command States Finance Power",
    volume: "Volume II",
    category: "Comparative History, Geopolitics & Resource Mobilization",
    description:
      "A comparison of resource mobilization that asks what budgets conceal while explicitly rejecting moral equivalence between historical regimes.",
    sourceDate: "29 July 2026",
    sections: [
      {
        id: "argument",
        heading: "A budget is not the whole cost",
        paragraphs: [
          "The paper compares Soviet space mobilization and Nazi German rearmament at a defined institutional level: how states obtain labor, expertise, materials and industrial priority for strategic projects. Its central analytical proposal is to follow real resources as well as monetary appropriations.",
          "The comparison is not a common moral score. Different objectives, property systems, coercive practices and historical consequences must remain part of the account. A mechanism can be compared without making the systems that use it equivalent.",
        ],
      },
      {
        id: "context",
        heading: "Preserve historical differences",
        paragraphs: [
          "NASA’s history of Sputnik describes the relationship between satellite proposals, the R-7 missile program and decisions about scientific participation. That overlap provides a reason to examine shared capabilities rather than assigning every cost to one visible budget label.",
          "The United States Holocaust Memorial Museum documents forced labor under Nazi rule. In this comparison, coercion is a human burden that must be recorded explicitly, never reclassified as an efficiency gain or erased by discussion of technological output.",
        ],
        evidenceIds: ["command-nasa", "command-ushmm"],
      },
      {
        id: "ledgers",
        heading: "Four ledgers for strategic mobilization",
        paragraphs: [
          "These ledgers are an analytical proposal for tracing costs and authority across fragmented accounts.",
        ],
        table: {
          caption: "The author’s proposed accounting framework",
          headers: ["Ledger", "What it asks researchers to trace"],
          rows: [
            [
              "Resources",
              "Personnel, materials, energy, equipment, transport and shared infrastructure.",
            ],
            ["Institutions", "Who can assign priority, resolve disputes or compel delivery?"],
            ["Transfers", "Credit, guarantees, procurement and compelled transfers of resources."],
            ["Alternatives", "Which other uses were displaced, and who bore the burden?"],
          ],
        },
      },
      {
        id: "method",
        heading: "Do not count a shared capability twice",
        paragraphs: [
          "A launcher, production plant or engineering team may serve more than one program. The paper recommends explicit attribution rules and sensitivity analysis rather than treating a classified or fragmented budget as a complete project total.",
          "The framework can also be applied to democratically governed strategic projects. That portability does not erase differences in consent, oversight or rights. This synopsis supplies neither a comparable Soviet–German spending ratio nor proof that a particular strategic program caused wider economic failure.",
        ],
      },
    ],
    evidence: [
      {
        id: "command-nasa",
        label: "NASA History",
        citation:
          "Asif A. Siddiqi, Korolev, Sputnik, and the International Geophysical Year. Historical account of satellite and missile-program overlap.",
        url: "https://www.nasa.gov/history/sputnik/siddiqi.html",
      },
      {
        id: "command-ushmm",
        label: "United States Holocaust Memorial Museum",
        citation:
          "Forced Labor: An Overview. Historical context for coercion and its human consequences.",
        url: "https://encyclopedia.ushmm.org/content/en/article/forced-labor-an-overview",
      },
    ],
    limitations: [
      "A qualitative comparison, not a definitive cost reconstruction.",
      "Comparison of resource-allocation mechanisms does not imply moral equivalence between regimes.",
    ],
    related: ["history-is-not-a-moral-certificate"],
  },
  {
    id: "when-real-science-becomes-science-fiction",
    taxonomyId: "paper-when-real-science-becomes-science-fiction",
    title: "When Real Science Becomes Science Fiction",
    volume: "Volume IV",
    category: "Medical Technology, Science & Human Capability",
    description:
      "Mechanistic technological literacy: understanding how an instrument produces a result without confusing clinical reasoning with specialist engineering authority.",
    sourceDate: "31 July 2026",
    sections: [
      {
        id: "argument",
        heading: "From an output to the process behind it",
        paragraphs: [
          "The manuscript proposes mechanistic technological literacy: the ability to connect an instrument’s output to the physical or biological process, measurement assumptions and interpretation that produced it. The aim is informed reliance on technology, not an expectation that every clinician can design or repair it.",
          "Its educational question is whether learners can transfer a mechanism to an unfamiliar result. A course title or an examination score alone cannot answer that question. The public adaptation does not rank countries, schools or professions, and does not claim that a particular curriculum has proven superior outcomes.",
        ],
      },
      {
        id: "example",
        heading: "A concrete example: computed tomography",
        paragraphs: [
          "NIBIB explains CT as an X-ray-based technique in which a computer reconstructs cross-sectional images from measurements taken around the body. The displayed slice is therefore a processed measurement, not an unmediated photograph of anatomy.",
          "The author’s proposed learning exercise is to identify what is measured, what reconstruction adds, and what would warrant asking a qualified specialist to investigate an unexpected result. This is an educational framing, not a diagnostic protocol or advice to alter a device.",
        ],
        evidenceIds: ["medical-ct"],
      },
      {
        id: "literacies",
        heading: "Four forms of literacy",
        paragraphs: [
          "The framework distinguishes understanding a process from being authorized and trained to perform specialist work.",
        ],
        table: {
          caption: "Different responsibilities require different depths of understanding",
          headers: ["Literacy", "Purpose"],
          rows: [
            ["Operational", "Use an approved workflow within one’s training and authority."],
            [
              "Mechanistic",
              "Explain what is measured and the assumptions connecting signal to result.",
            ],
            [
              "Specialist",
              "Interpret or supervise a modality with the required professional competence.",
            ],
            [
              "Translational",
              "Formulate a clinical problem that scientists and engineers can investigate.",
            ],
          ],
        },
      },
      {
        id: "evaluation",
        heading: "Test transfer, not national stereotypes",
        paragraphs: [
          "A fair evaluation would compare learners’ ability to explain unfamiliar cases, recognize limits and communicate uncertainty. It would account for prior knowledge, instructional time, assessment design and follow-up. Named standalone courses and integrated teaching are organizational choices, not outcome evidence by themselves.",
          "The proposal preserves the distinct responsibilities of clinicians, physicists, technologists, laboratory scientists and engineers. Calibration, servicing, quality assurance and treatment decisions require the appropriate training, governance and local procedures.",
        ],
      },
    ],
    evidence: [
      {
        id: "medical-ct",
        label: "NIH / NIBIB",
        citation:
          "Computed Tomography (CT): measurement and reconstruction principles. Reviewed 18 September 2026.",
        url: "https://www.nibib.nih.gov/science-education/science-topics/computed-tomography-ct",
      },
    ],
    limitations: [
      "A curriculum proposal, not proof of superior clinical outcomes or a ranking of medical schools.",
      "Educational discussion only; not clinical advice, device-maintenance guidance or authorization to practise outside professional competence.",
    ],
    related: ["entanglement-primer"],
  },
  {
    id: "quantum-computing-antimatter-and-the-next-energy-revolution",
    taxonomyId: "paper-quantum-computing-antimatter-and-the-next-energy-revolution",
    title: "Quantum Computing, Antimatter, and the Next Energy Revolution",
    volume: "Volume IV",
    category: "Quantum Computing, Energy & Scientific Infrastructure",
    description:
      "A six-level test for frontier-technology claims, separating established physics from demonstrations, deployable engineering, economics, policy and speculation.",
    sourceDate: "19 July 2026",
    sections: [
      {
        id: "argument",
        heading: "Possibility is not a deployment timetable",
        paragraphs: [
          "The manuscript’s central distinction is between a physical possibility and a useful system. A striking demonstration does not by itself establish reliability, scale, affordability or a public-policy case. The title poses a frontier-technology question; it is not a forecast of an imminent energy revolution.",
          "NIST describes quantum computation in terms of controlled quantum systems, algorithms and measurement. Its potential advantages concern particular problems, not a guarantee that every computation becomes faster. CERN’s antimatter account establishes a scientific subject and experimental program, not a commercial power supply.",
        ],
        evidenceIds: ["quantum-nist", "quantum-cern"],
      },
      {
        id: "six-levels",
        heading: "Six levels of a technology claim",
        paragraphs: [
          "Evidence at one level does not automatically establish the next. The paper proposes checking each transition explicitly.",
        ],
        table: {
          caption: "Ask which level the evidence actually reaches",
          headers: ["Level", "Evidence question"],
          rows: [
            ["Theory", "Is the proposed effect consistent with the relevant physical model?"],
            ["Demonstration", "Has it been observed under specified experimental conditions?"],
            ["Engineering", "Can a complete system deliver it reliably and repeatedly?"],
            ["Economics", "Does the full cost compare favorably with available alternatives?"],
            ["Policy", "What public purpose, oversight and tradeoffs justify support?"],
            ["Speculation", "Which assumptions remain untested, and what would disprove them?"],
          ],
        },
      },
      {
        id: "energy",
        heading: "An energy ledger must include the inputs",
        paragraphs: [
          "The paper asks readers to keep production, containment, control and energy conversion in the same accounting boundary. A large theoretical energy density is not a demonstration of favorable net energy or practical delivery. Likewise, an algorithmic advantage is not a complete cost estimate for a quantum computing facility.",
          "These are evaluation criteria, not a new engineering result. This page does not announce commercial antimatter energy, a date for general fault-tolerant computing, or an investment opportunity. It omits fast-changing hardware counts, national strategy claims and future timetables from the source manuscript.",
        ],
      },
      {
        id: "reading-path",
        heading: "Build on the existing quantum primers",
        paragraphs: [
          "The linked primer and foundations paper introduce quantum-information concepts and architectures. This companion adds the readiness and policy framework rather than duplicating those explanations. The author’s proposal is to support measurable scientific capacity while keeping demonstrations, procurement claims and speculative narratives distinct.",
        ],
      },
    ],
    evidence: [
      {
        id: "quantum-nist",
        label: "NIST",
        citation: "Quantum Computing Explained. Technical background, reviewed 18 September 2026.",
        url: "https://www.nist.gov/quantum-information-science/quantum-computing-explained",
      },
      {
        id: "quantum-cern",
        label: "CERN",
        citation: "Antimatter. Scientific background, reviewed 18 September 2026.",
        url: "https://home.cern/science/physics/antimatter/",
      },
    ],
    limitations: [
      "No new experiment, net-energy result or technology forecast is supplied.",
      "Engineering and economic readiness require system-specific evidence; neither follows from theoretical energy density alone.",
    ],
    related: ["entanglement-primer", "entanglement-foundations"],
  },
];

export const websiteFeedReadingLinks = readings.map(({ id, taxonomyId }) => ({ id, taxonomyId }));

export const websiteFeedReadingDocuments: PublicDocument[] = readings.map((reading) => {
  const familyId = familyIdForKey(reading.id);
  return {
    id: reading.id,
    familyId,
    title: reading.title,
    volume: reading.volume,
    category: reading.category,
    description: reading.description,
    author: "Siddhartha Harsh Wardhan",
    status: "Author working paper",
    genre: "Bounded web synopsis of an author working paper",
    publicationDate: reviewedAt,
    dateLabel: "Web synopsis posted",
    updatedDate: reviewedAt,
    sourceLabel: "Author-controlled manuscript · bounded public reading",
    sourceModified: `Source edition dated ${reading.sourceDate}`,
    sourceReviewedAt: reviewedAt,
    rightsNotice:
      "Copyright remains with the author. This bounded web synopsis does not reproduce third-party figures or publish the complete manuscript.",
    availability: {
      webPage: "This bounded web synopsis is publicly readable. It is not the complete manuscript.",
      original:
        "No complete manuscript download or verified external publication record is provided on this page.",
      data: "No new dataset is supplied with this synopsis.",
      code: "No analysis code is supplied with this synopsis.",
    },
    reviewScope: {
      sourceChecking: `Selected manuscript arguments and the public source anchors below were checked on ${reviewedAt}. This is not exhaustive verification of the source manuscript.`,
      editorialReview:
        "The web adaptation separates source-backed statements, author interpretation and untested proposals. Private records, figures and unsupported current-person allegations are excluded.",
      independentReview:
        "No independent scholarly peer review is documented. Publication of this synopsis does not certify the underlying manuscript or resolve outstanding specialist review.",
    },
    placementDecision: placementDecisionFor(familyId, reading.volume, reading.category),
    summaryEvidence: reading.evidence,
    relatedIds: (reading.related ?? []).map(familyIdForKey),
    limitations: reading.limitations,
    sections: [
      ...reading.sections,
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "This is a bounded public adaptation of an existing research-map work, not a new study, peer-reviewed publication or full-manuscript release. The source manuscript and internal working files are not hosted here.",
          ...reading.limitations,
        ],
      },
    ],
  };
});

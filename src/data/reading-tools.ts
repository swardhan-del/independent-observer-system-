export type ReadingTool = {
  id: string;
  title: string;
  volume: string;
  topics: string[];
  introduction: string;
  headers: string[];
  rows: string[][];
  example: string;
  limit: string;
  related: string;
  relatedLabel: string;
  prompts: string[];
  sources?: { title: string; url: string; scope: string }[];
};
export const readingTools: ReadingTool[] = [
  {
    id: "attention",
    title: "Why does one story receive more attention?",
    volume: "Volume I",
    topics: ["Politics", "History"],
    introduction:
      "The Attention Infrastructure Gap proposes six possible gates between an event and national attention. Use this table to turn that proposal into questions you could investigate.",
    headers: ["Proposed gate", "What to record", "Alternative explanation to check"],
    rows: [
      [
        "Evidence visibility",
        "When did verifiable records become available?",
        "Were incidents equally documented?",
      ],
      [
        "Organizational readiness",
        "Time to a documented response; networks already in place",
        "Did one case require more verification?",
      ],
      [
        "Narrative compressibility",
        "What details were lost in the headline?",
        "Was the simpler story less accurate?",
      ],
      [
        "Population and concentration",
        "Relevant population and geographic scope",
        "Are raw counts being compared without denominators?",
      ],
      [
        "Media incentives",
        "Coverage across a defined set of outlets and dates",
        "Did other major news displace this event?",
      ],
      [
        "Institutional uptake",
        "Dates of public statements and formal actions",
        "Did attention precede the statements or follow them?",
      ],
    ],
    example:
      "Fictional comparison: Event A has a verified public recording on day one; Event B does not. A receives more coverage in the first week. That pattern is consistent with an evidence-visibility explanation, but cannot isolate it from severity, location, timing or newsroom access. Record those differences before drawing a conclusion.",
    limit:
      "These are proposed measures, not a validated causal model or a ranking of whose harm matters. No real incident or community is scored here.",
    related: "/series/independent-observer/",
    relatedLabel: "Explore Volume I",
    prompts: [
      "Define the event pair, outlets and observation window.",
      "Which difference could overturn your initial explanation?",
    ],
  },
  {
    id: "mindhive",
    title: "What is inside a computing-energy estimate?",
    volume: "Volume IV",
    topics: ["Science", "Technology"],
    introduction:
      "MindHive Horizons asks a conditional infrastructure question. Before estimating the resources for a hypothetical digital population, separate what must be measured, stored and run. A hardware budget cannot settle consciousness or personal identity.",
    headers: ["Quantity", "Unit or boundary", "Question before calculating"],
    rows: [
      ["Acquisition", "Bytes collected once", "What was measured, and what was omitted?"],
      [
        "Stored model and state",
        "Bytes retained",
        "Is this raw scan data or an executable representation?",
      ],
      [
        "Computation and memory traffic",
        "Work per second and bytes per second",
        "What workload and fidelity are assumed?",
      ],
      [
        "IT equipment energy",
        "kWh over the chosen period",
        "Are storage, networking and redundancy already included?",
      ],
      [
        "Facility energy",
        "IT energy × assumed PUE",
        "Is the same period and facility boundary used?",
      ],
    ],
    example:
      "Illustrative arithmetic only: 1,000 workloads at an assumed average 1 kW each use 1 MW of IT power. With an assumed annual PUE of 1.2 and constant operation for 8,760 hours, facility energy is 10,512 MWh. These inputs are placeholders, not measured brain-emulation requirements.",
    limit:
      "This exercise makes no prediction that human emulation is feasible and no estimate of its actual power needs or timeline. Cooling and other facility overhead must not be added again after they are included through PUE.",
    related: "/series/the-last-human-workforce/",
    relatedLabel: "Explore Volume IV",
    prompts: [
      "Record the workload definition and source for each assumption.",
      "Which missing measurement changes the conclusion most?",
    ],
    sources: [
      {
        title: "U.S. Department of Energy: data-center energy and water efficiency",
        url: "https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers",
        scope:
          "Defines PUE as annual facility energy divided by annual IT energy. It does not validate this hypothetical workload.",
      },
    ],
  },
  {
    id: "housing",
    title: "Are housing programs measuring durable outcomes?",
    volume: "Volume III",
    topics: ["Economics", "Politics"],
    introduction:
      "Service activity, housing availability and sustained outcomes answer different questions. Use this worksheet to inspect a report before concluding that a program works or fails.",
    headers: ["Question", "Record to request", "Comparison limit"],
    rows: [
      [
        "Who is counted?",
        "Eligible cohort, entry/exit rules, missing records",
        "Different populations can produce different outcomes.",
      ],
      [
        "What was delivered?",
        "Contacts, shelter nights and housing placements",
        "Activity counts alone do not measure housing stability.",
      ],
      [
        "What happened after exit?",
        "Defined follow-up window and recorded returns",
        "No recorded return does not prove continued housing.",
      ],
      [
        "Was housing available?",
        "Units accessible to the cohort during the period",
        "A program outcome may reflect supply constraints.",
      ],
      [
        "What does the contract reward?",
        "Actual payment terms and performance clauses",
        "Spending alone does not establish a vendor's motive.",
      ],
    ],
    example:
      "Fictional comparison: two programs each report 100 placements. One follows people for a month and the other for a year. Those totals cannot establish equal durability. First align the cohort, follow-up period and definition of a return.",
    limit:
      "This is an original report-reading worksheet, not a finding of misconduct or a city ranking. HUD's table shells distinguish returns within 6, 12 and 24 months; use the applicable specification for an actual report.",
    related: "/series/managed-decline/",
    relatedLabel: "Explore Volume III",
    prompts: [
      "Record the program, reporting period, cohort and source URL.",
      "List activity, outcomes, missing follow-up and plausible alternative explanations.",
    ],
    sources: [
      {
        title: "HUD: System Performance Measure Tables",
        url: "https://files.hudexchange.info/resources/documents/System-Performance-Measures-Table-Shells.pdf",
        scope:
          "Measure 2 separates return-to-homelessness follow-up windows. This worksheet is not an implementation of the official measure.",
      },
    ],
  },
  {
    id: "measurement",
    title: "Can a better instrument remove every limit?",
    volume: "Volume IV",
    topics: ["Science", "Technology"],
    introduction:
      "Measurement Horizons raises a useful distinction: an instrument limit, a measurement uncertainty and a physical horizon are different problems.",
    headers: ["Limit", "What could help?", "What that does not establish"],
    rows: [
      [
        "A weak signal",
        "An appropriate detector or longer observation",
        "That every inaccessible signal can be recovered",
      ],
      [
        "Calibration or reproducibility uncertainty",
        "Reference measurements, uncertainty estimates and repeatable methods",
        "That a displayed number is exact",
      ],
      [
        "A cosmological horizon",
        "First specify which horizon and which cosmological model",
        "That a deeper survey removes every physical horizon",
      ],
    ],
    example:
      "A more sensitive sensor may detect a signal previously lost in noise. That improvement is not evidence that a cosmological event horizon has disappeared. First identify the kind of limit before claiming it has been overcome.",
    limit:
      "The Hubble sphere, particle horizon and event horizon are distinct concepts. This short guide does not assert a multiverse or validate broader claims about civilizations.",
    related: "/library/documents/entanglement-primer/",
    relatedLabel: "Read the entanglement primer",
    prompts: [
      "Name the precise limit and the observation that supports it.",
      "What would the proposed improvement actually let you measure?",
    ],
    sources: [
      {
        title: "Davis and Lineweaver: Expanding Confusion (2004)",
        url: "https://arxiv.org/html/astro-ph/0310808",
        scope: "Sections 3.3–3.4 distinguish observability and horizons.",
      },
      {
        title: "Hanisch, Plant and Gilmore: measurement science and reproducibility (2019)",
        url: "https://www.nist.gov/publications/improving-reproducibility-research-role-measurement-science",
        scope: "Measurement practice, uncertainty and confidence in research.",
      },
    ],
  },
  {
    id: "megaprojects",
    title: "What would make a megaproject resilient?",
    volume: "Volume III",
    topics: ["Economics", "Technology"],
    introduction:
      "Start with a question that can be checked in project records. This exercise can guide a future NEOM case study or a comparison of other large developments.",
    headers: ["Claim to examine", "Evidence to seek", "Keep separate"],
    rows: [
      [
        "Water and food resilience",
        "Dated capacity plans, operating data and demand assumptions",
        "An announced target and a demonstrated capability",
      ],
      [
        "Energy reliability",
        "Supply mix, outage plans and tested backup arrangements",
        "Installed capacity and dependable supply",
      ],
      [
        "Local capability",
        "Training, staffing and maintenance records",
        "Construction spending and durable skills",
      ],
      [
        "Social consequences",
        "Documented impacts, consultation records and responses",
        "Allegations, findings and the project's response",
      ],
      [
        "Financial durability",
        "Costs, operating assumptions and sensitivity analysis",
        "A rendering, a forecast and an audited result",
      ],
    ],
    example:
      "A developer's target is evidence of an intention. A dated operating record is evidence about performance. File them in different columns; neither a striking rendering nor an incomplete record proves success or failure.",
    limit:
      "No conclusion about NEOM's current plans or outcomes is asserted here. The related manuscript remains a research candidate; this is a general evidence checklist.",
    related: "/series/managed-decline/",
    relatedLabel: "Explore infrastructure and political economy",
    prompts: [
      "Name the project, claim, date and primary record.",
      "What evidence would contradict your present view?",
    ],
  },
  {
    id: "ownership",
    title: "How do you trace a claim about family wealth?",
    volume: "Volume III",
    topics: ["Economics", "Law"],
    introduction:
      "Separate a descriptive question about ownership from a claim about legal or tax treatment. An entity diagram alone cannot tell you whether a transaction is lawful.",
    headers: ["Layer", "Question", "Evidence needed"],
    rows: [
      ["Ownership", "Who owns which asset at the relevant date?", "Identifiable ownership records"],
      [
        "Cash flow",
        "What payment occurred, between whom, and for what?",
        "Transaction records and stated purpose",
      ],
      ["Obligation", "What debt or repayment commitment accompanies the cash?", "Terms and dates"],
      [
        "Legal claim",
        "Which jurisdiction and rule does the claim rely on?",
        "Current primary authority and its scope",
      ],
      [
        "Distribution",
        "Whose resources or risks changed?",
        "Before-and-after evidence, not labels alone",
      ],
    ],
    example:
      "In a fictional balance sheet, receiving a loan adds cash and an equal liability at that instant. Calling it income, profit or tax-free wealth without defining those terms skips different questions.",
    limit:
      "This is a method for reading an argument, not structuring advice or a judgment about a real family. The incomplete Family Wealth Machine manuscript is not reproduced or treated as a released paper.",
    related: "/library/documents/wardhan-tax-doctrine/",
    relatedLabel: "Read the tax proposal and balance-sheet example",
    prompts: [
      "Write the exact claim, jurisdiction, date and source.",
      "Which part is observed, inferred, proposed or still unknown?",
    ],
  },
];

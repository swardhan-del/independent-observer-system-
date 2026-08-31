export type EvidenceSource = {
  id: string;
  label: string;
  kind: "scholarly" | "institutional";
  locator: string;
  doi?: string;
};

export type EvidenceAuditRow = {
  claim: string;
  outcome: string;
  sourceIds: string;
  boundary: string;
};

export type ContradictionEntry = {
  title: string;
  tension: string;
  readingNote: string;
};

/** Public-safe index of the 36-source review map. It contains no manuscript text. */
export const regrowingHumanitySources: EvidenceSource[] = [
  ["S01", "Kuiken et al.", "JAMA · 2009", "10.1001/jama.2009.116"],
  [
    "S02",
    "Ortiz-Catalan et al.",
    "Science Translational Medicine · 2014",
    "10.1126/scitranslmed.3008933",
  ],
  [
    "S03",
    "Ortiz-Catalan et al.",
    "New England Journal of Medicine · 2020",
    "10.1056/NEJMoa1917537",
  ],
  [
    "S04",
    "Raspopovic et al.",
    "Science Translational Medicine · 2014",
    "10.1126/scitranslmed.3006820",
  ],
  ["S05", "Oddo et al.", "eLife · 2016", "10.7554/eLife.09148"],
  [
    "S06",
    "Wendelken et al.",
    "Journal of NeuroEngineering and Rehabilitation · 2017",
    "10.1186/s12984-017-0320-4",
  ],
  ["S07", "Vu et al.", "Science Translational Medicine · 2020", "10.1126/scitranslmed.aay2857"],
  ["S08", "Clites et al.", "Science Translational Medicine · 2018", "10.1126/scitranslmed.aap8373"],
  ["S09", "Graczyk et al.", "Scientific Reports · 2018", "10.1038/s41598-018-26952-x"],
  ["S10", "Flesher et al.", "Science · 2021", "10.1126/science.abd0380"],
  ["S11", "Collinger et al.", "The Lancet · 2013", "10.1016/S0140-6736(12)61816-9"],
  ["S12", "Dumanian et al.", "Annals of Surgery · 2019", "10.1097/SLA.0000000000003088"],
  ["S13", "Brånemark et al.", "Bone & Joint Journal · 2014", "10.1302/0301-620X.96B1.31905"],
  ["S14", "Marasco et al.", "Brain · 2011", "10.1093/brain/awq361"],
  ["S15", "Hargrove et al.", "Scientific Reports · 2017", "10.1038/s41598-017-14386-w"],
  [
    "S16",
    "Biddiss & Chau",
    "Prosthetics and Orthotics International · 2007",
    "10.1080/03093640600994581",
  ],
  ["S17", "Cordella et al.", "Frontiers in Neuroscience · 2016", "10.3389/fnins.2016.00209"],
  ["S18", "Kunutsor et al.", "British Journal of Surgery · 2018", "10.1002/bjs.11005"],
  ["S19", "Makin & Flor", "NeuroImage · 2020", "10.1016/j.neuroimage.2020.116943"],
  [
    "S20",
    "Scheme & Englehart",
    "Journal of Rehabilitation Research and Development · 2011",
    "10.1682/JRRD.2010.09.0177",
  ],
  [
    "S21",
    "Ienca & Andorno",
    "Life Sciences, Society and Policy · 2017",
    "10.1186/s40504-017-0050-1",
  ],
  ["S22", "Yuste et al.", "Nature · 2017", "10.1038/551159a"],
  ["S23", "Denning et al.", "Neurosurgical Focus · 2009", "10.3171/2009.4.FOCUS0985"],
  [
    "S24",
    "Smail et al.",
    "Disability and Rehabilitation: Assistive Technology · 2021",
    "10.1080/17483107.2020.1738567",
  ],
  ["S25", "Burger & Marincek", "Disability and Rehabilitation · 2007", "10.1080/09638280701320797"],
  ["S26", "Yuan et al.", "Plastic Surgery · 2024", "10.1177/22925503221107462"],
  ["S27", "Antfolk et al.", "Expert Review of Medical Devices · 2013", "10.1586/erd.12.68"],
  [
    "S28",
    "Raschke et al.",
    "Frontiers in Rehabilitation Sciences · 2022",
    "10.3389/fresc.2022.854404",
  ],
  [
    "S29",
    "Darter et al.",
    "Journal of Occupational Rehabilitation · 2018",
    "10.1007/s10926-018-9757-y",
  ],
  [
    "S30",
    "Resnik et al.",
    "Prosthetics and Orthotics International · 2024",
    "10.1097/PXR.0000000000000223",
  ],
  [
    "I01",
    "World Health Organization",
    "Standards for prosthetics and orthotics · 2017",
    "ISBN 978-92-4-151248-0",
  ],
  ["I02", "WHO & UNICEF", "Global report on assistive technology · 2022", "ISBN 978-92-4-004945-1"],
  [
    "I03",
    "U.S. Food and Drug Administration",
    "Cybersecurity in Medical Devices final guidance · February 2026",
    "Official guidance",
  ],
  [
    "I04",
    "U.S. Food and Drug Administration",
    "OPRA implant system PMA P190009",
    "Official device record",
  ],
  ["I05", "European Union", "Regulation (EU) 2017/745", "Official regulation"],
  [
    "I06",
    "U.S. Food and Drug Administration",
    "DEKA Arm De Novo DEN120016",
    "Official device record",
  ],
].map(([id, label, locator, doi]) => ({
  id,
  label,
  kind: id.startsWith("S") ? "scholarly" : "institutional",
  locator,
  ...(id.startsWith("S") ? { doi } : {}),
})) as EvidenceSource[];

export const numericalClaimAudit: EvidenceAuditRow[] = [
  {
    claim: "Performance and sensory-feedback measures",
    outcome:
      "Source-linked in the audit; the underlying study context, cohort size, and qualification are retained.",
    sourceIds: "S02–S10, S14–S15, S20",
    boundary: "Study results are not generalized to all prosthesis users or all settings.",
  },
  {
    claim: "Implant, osseointegration, and surgical outcomes",
    outcome: "Traceable to the cited clinical and surgical literature with limitations recorded.",
    sourceIds: "S01, S03, S11–S13, S18, S26",
    boundary: "Benefits, risks, follow-up, and eligibility vary by device and patient.",
  },
  {
    claim: "Use, embodiment, and daily-life outcomes",
    outcome:
      "Verified against the review matrix; observational and small-cohort limits remain visible.",
    sourceIds: "S16–S17, S19, S24–S25, S28–S30",
    boundary: "Usage is not equivalent to clinical superiority or universal adoption.",
  },
  {
    claim: "Rights, safety, and governance context",
    outcome: "Institutional sources were checked separately from scholarly evidence.",
    sourceIds: "I01–I06, S21–S23, S27",
    boundary: "Policy and device records describe frameworks, not a recommendation for treatment.",
  },
];

export const contradictionNavigator: ContradictionEntry[] = [
  {
    title: "Abandonment versus adaptation",
    tension:
      "A device can be technically capable while still being difficult to use, maintain, or integrate into ordinary life.",
    readingNote: "Read performance evidence alongside daily-use and access evidence.",
  },
  {
    title: "Osseointegration: benefit versus risk",
    tension:
      "Direct skeletal attachment may improve some forms of coupling while introducing surgical and long-term management questions.",
    readingNote: "Do not collapse a device-specific outcome into a general safety claim.",
  },
  {
    title: "Laboratory control versus home control",
    tension: "Controlled demonstrations and reliable everyday use answer different questions.",
    readingNote: "The setting, training burden, and follow-up period are part of the result.",
  },
  {
    title: "Sensory feedback versus embodiment",
    tension:
      "A signal can improve control without proving a complete subjective merger of device and body.",
    readingNote: "Keep reported experience, measured control, and interpretation distinct.",
  },
  {
    title: "Phantom pain model versus lived variation",
    tension:
      "Neural explanations can be useful without explaining every person’s pain or recovery.",
    readingNote: "The review treats mechanisms as partial models, not diagnoses.",
  },
  {
    title: "TMR/RPNI promise versus evidence maturity",
    tension:
      "Promising human work does not remove the need for larger, longer, and more comparable studies.",
    readingNote: "The evidence layer labels emerging human findings as emerging.",
  },
  {
    title: "Return to work versus access to work",
    tension:
      "Individual functional improvement does not establish broad employment access or equal opportunity.",
    readingNote: "Social outcomes require their own evidence base.",
  },
  {
    title: "Capability versus justice",
    tension:
      "Restoring function and enhancing capability raise overlapping but non-identical policy questions.",
    readingNote: "The policy matrix keeps distribution, consent, safety, and enhancement separate.",
  },
];

export const neuroprostheticControlLoop = [
  {
    label: "Intent",
    text: "A person forms a movement intention; the evidence does not require treating the device as a mind-reading system.",
  },
  {
    label: "Signal",
    text: "Peripheral or implanted interfaces capture a measurable biological signal with noise and individual variation.",
  },
  {
    label: "Decoder",
    text: "A trained algorithm maps the signal to a bounded control command; laboratory accuracy is not the same as everyday reliability.",
  },
  {
    label: "Actuator",
    text: "The prosthetic system moves or changes state. Mechanical limits, latency, power, and fit remain part of the loop.",
  },
  {
    label: "Feedback",
    text: "Visual, tactile, or neural feedback can help close the loop, but reported embodiment and measured performance should not be conflated.",
  },
];

export const prostheticIntegrationTimeline = [
  {
    label: "2009–2011",
    title: "Interface and control foundations",
    text: "Early human and neural-interface work established the questions of signal capture, control, and embodiment.",
  },
  {
    label: "2013–2014",
    title: "Clinical and sensory demonstrations",
    text: "Human studies connected control, sensory feedback, and device integration while keeping cohort and follow-up limits visible.",
  },
  {
    label: "2016–2020",
    title: "Broader integration questions",
    text: "Research expanded toward implanted interfaces, surgery, daily use, and the difference between demonstration and ordinary life.",
  },
  {
    label: "2021–2024",
    title: "Longer-term and social framing",
    text: "The review adds work on performance, employment, access, and the conditions under which technical gains become usable.",
  },
];

export const restorationEnhancementPolicy = [
  {
    title: "Restoration-first access",
    benefit: "Prioritizes repair of lost function and equitable access to established care.",
    cost: "May underweight people whose goals exceed a narrow restoration model.",
    openQuestion:
      "How should public systems define meaningful access when devices and follow-up are costly?",
  },
  {
    title: "Capability enhancement",
    benefit: "Recognizes autonomy and possible gains beyond a baseline biological function.",
    cost: "Raises fairness, coercion, safety, and unequal-access concerns.",
    openQuestion:
      "Which safeguards are needed before enhancement is treated as an ordinary consumer choice?",
  },
  {
    title: "Adaptive governance",
    benefit:
      "Allows evidence, consent, standards, and access rules to change as the technology matures.",
    cost: "Can delay decisions and leave responsibility unclear during transition.",
    openQuestion: "Who reviews changing evidence, and how are affected people represented?",
  },
];

export const evidenceLabTranscript = [
  {
    time: "00:00",
    speaker: "Guide",
    text: "This Evidence Lab is a public map of the reviewed sources, not a reproduction of the controller manuscript.",
  },
  {
    time: "00:24",
    speaker: "Guide",
    text: "Use the evidence and interpretation filters to distinguish what a source reports from what the review infers.",
  },
  {
    time: "00:48",
    speaker: "Guide",
    text: "The contradiction navigator keeps promising results next to their limits, settings, and unresolved policy questions.",
  },
  {
    time: "01:12",
    speaker: "Guide",
    text: "No section here establishes a treatment recommendation, peer review status, or universal prosthetic outcome.",
  },
];

export const evidenceLabLimitations = [
  "This is a structured narrative review and evidence map, not a meta-analysis or clinical guideline.",
  "The underlying studies vary in device, interface, participant selection, follow-up, outcome measure, and setting.",
  "A source being verified means its bibliographic record and relevance were checked; it does not make every interpretation settled.",
  "The public preview intentionally excludes the controller DOCX/PDF, private notes, raw figures, and unreviewed media.",
];

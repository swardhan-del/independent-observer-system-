import { familyIdForKey } from "./family-registry";

export type ArchivePaper = {
  id: string;
  familyId: string;
  title: string;
  status: string;
  href?: string;
  researchGateUrl?: string;
};

export type ArchivePlacement = {
  paperId: string;
  relationship?: "primary" | "cross-volume" | "book" | "project";
};

export type ArchiveSubfolder = {
  id: string;
  title: string;
  description?: string;
  papers: ArchivePlacement[];
};

export type ArchiveNavigationSection = {
  id: string;
  title: string;
  description: string;
  subfolders: ArchiveSubfolder[];
};

export type ArchiveNavigationVolume = {
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV" | "Volume V";
  archiveTitle?: string;
  sections: ArchiveNavigationSection[];
};

const paper = (
  id: string,
  title: string,
  status = "Archive catalogue entry · editorial review",
  href?: string,
  researchGateUrl?: string,
): ArchivePaper => ({
  id,
  familyId: familyIdForKey(id),
  title,
  status,
  href,
  researchGateUrl,
});

/**
 * Each research family appears once here. Source variants, drafts, manuscript
 * exports, submission packages, reference folders, and review material are not
 * separate public records.
 */
export const archivePapers: ArchivePaper[] = [
  paper(
    "manifesto-and-destiny",
    "Independent Observer: Manifesto and Destiny",
    "Book compilation · editorial development",
  ),
  paper(
    "original-master-ip",
    "Original master and IP declaration",
    "Archive master record · not a public reading copy",
  ),
  paper(
    "independent-observer-volume-one",
    "Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto)",
    "Public author paper",
    "/library/documents/independent-observer-volume-one/",
  ),
  paper("formation-through-struggle", "Formation Through Struggle"),
  paper(
    "a-systems-centered-manifesto",
    "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
    "Public author paper",
    "/library/documents/a-systems-centered-manifesto/",
  ),
  paper("state-of-exception", "State of Exception"),
  paper("study-the-wall", "Study the Wall"),
  paper("power-of-knowledge", "The Power of Knowledge, Skills, and Abilities"),
  paper("plato-to-chomsky", "From Plato to Chomsky: Democracy and Civic Capacity"),
  paper("capital-amplification", "Capital Amplification and the Myth of Equal Opportunity"),
  paper("attention-infrastructure-gap", "The Attention Infrastructure Gap"),
  paper("jd-vance-populism", "JD Vance, Populism, STEM, and Labor"),
  paper("quiet-wealth", "Quiet Wealth as Risk Management"),
  paper("family-wealth-machine", "The Family Wealth Machine"),
  paper("silent-archivist", "The Silent Archivist"),
  paper("reputation-debt", "Reputation Debt"),
  paper("security-of-memory", "Security of Memory: State Funerals and Political Legitimacy"),
  paper("death-of-evidentiary-patience", "The Death of Evidentiary Patience"),

  paper(
    "empire-beneath-democracy",
    "The Empire Beneath Democracy",
    "Book compilation · editorial development",
  ),
  paper(
    "american-empire-never-democracy",
    "The American Empire Was Never a Democracy",
    "Public author paper",
    "/library/documents/the-american-empire-was-never-a-democracy/",
  ),
  paper(
    "democracys-achilles-heel",
    "Democracy’s Achilles’ Heel: Institutional Incentives and Political Outcomes",
    "Public author paper",
    "/research/democracys-achilles-heel/",
  ),
  paper(
    "civil-rights-realignment",
    "Civil Rights Realignment and Party Sorting in the United States",
  ),
  paper(
    "hidden-taxation",
    "Human Rights, Policing Doctrine, and Hidden Taxation in Modern U.S. Governance",
  ),
  paper("welfare-queen", "The Welfare Queen and the Politics of Administrative Stigma"),
  paper("party-switch-polarization", "Party Switch and Polarization"),
  paper(
    "empires-mirror",
    "Empire’s Mirror: Foreign Lobbying, Concentrated Wealth, and Imperial Self-Understanding",
  ),
  paper("thermostat-musk", "The Thermostat, Elon Musk, and Managed Democracy"),
  paper("floyd-kirk", "Floyd, Kirk, and the Politics of Public Outrage"),
  paper("fear-circuit", "The Fear Circuit"),
  paper(
    "when-the-storm-decides",
    "When the Storm Decides",
    "Public author paper",
    "/library/documents/when-the-storm-decides/",
  ),
  paper("accusation-economy", "The Accusation Economy"),
  paper(
    "citizens-without-a-country",
    "Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections",
    "Public author paper",
    "/library/documents/citizens-without-a-country/",
  ),
  paper("detained-at-border", "Detained at the Border"),
  paper(
    "who-deported-more",
    "Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025",
    "Public author paper",
    "/library/documents/who-deported-more/",
  ),
  paper(
    "latino-irony",
    "The Latino Irony: Why Many Hispanic Americans Support Donald Trump",
    "Public author paper",
    "/library/documents/latino-irony/",
  ),
  paper("rotating-scapegoat", "Migration, Labor, and the Rotating Scapegoat"),
  paper(
    "borrowed-labor",
    "Borrowed Labor: The Demographic Limit of Nationalist Sovereignty in Central and Eastern Europe",
    "Public author paper",
    "/research/borrowed-labor/",
  ),
  paper(
    "thirteenth-punishment-clause",
    "The Clause, They Never Taught You: How the 13th Amendment Legalized Slavery for Profit",
  ),
  paper("mask-progressive-terry", "The Mask of the Progressive and Terry"),
  paper(
    "protected-criminals",
    "Protected Criminals: The Real Power Behind Pardons and Non-Prosecution",
  ),
  paper(
    "mitchell-to-barr",
    "From Mitchell to Barr: The Attorney General’s Legal Boundaries in Times of Crisis",
  ),
  paper("sanctioned-capital", "Sanctioned Capital: The American Opportunity Myth"),
  paper(
    "from-colonization-to-china",
    "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
    "Public author paper",
    "/library/documents/from-colonization-to-chinas-rise/",
  ),
  paper("empire-learned-disappear", "The Empire That Learned to Disappear"),
  paper("nato-american-empire", "NATO and the American Empire"),
  paper(
    "managed-interdependence",
    "Managed Interdependence: Industrial Policy and Governance Sequencing in Post-Autocratic Russia",
    "Public author paper",
    "/library/documents/managed-interdependence/",
  ),
  paper(
    "russia-after-autocracy",
    "Russia After Autocracy: A Policy Framework for Strategic Reform and Economic Renaissance",
  ),
  paper(
    "geography-enslaved-wealth",
    "The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies",
    "Public author paper",
    "/library/documents/geography-of-enslaved-wealth/",
  ),
  paper(
    "two-masks-one-face",
    "Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System",
    "Public author paper",
    "/library/documents/two-masks-one-face/",
  ),
  paper(
    "how-empires-rule-strangers",
    "How Empires Rule Strangers: Britain, India, and the Machinery of Distance",
  ),
  paper("caspian-supply-corridor", "The Tragic Caspian Supply Corridor: Russia, Iran, and China"),
  paper("how-empires-fail", "How Empires Fail: Truth, Failure, and Strategic Blindness"),
  paper(
    "command-economies",
    "How Command States Finance Power: Militarization and Technological Mobilization",
  ),
  paper("moral-exceptionalism", "Moral Exceptionalism, War, and National Memory"),

  paper(
    "managed-decline",
    "Managed Decline: Economic Displacement, Social Welfare, and the Machinery of Modern Class Collapse",
    "Book compilation · editorial development",
  ),
  paper("intimacy-after-institutional-change", "Intimacy After Institutional Change"),
  paper("divorce-gap", "The Divorce Gap"),
  paper(
    "wardhan-tax-doctrine",
    "The Wardhan Tax Doctrine",
    "Public author paper",
    "/library/documents/wardhan-tax-doctrine/",
  ),
  paper("social-class-welfare", "Social Class and Welfare"),
  paper(
    "hours-to-ownership",
    "Hours to Ownership",
    "Archive catalogue entry · verified ResearchGate record",
    undefined,
    "https://www.researchgate.net/publication/396766821_Hours_to_Ownership_Why_the_AI_Industrial_Revolution_Rewires_Inequality",
  ),
  paper(
    "double-tax-on-time",
    "The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy",
    "Public author paper",
    "/library/documents/double-tax-on-time/",
  ),
  paper(
    "economics-of-color",
    "The Economics of Color: Deindustrialization, Wealth Stratification, Race, Crime, and Identity",
  ),
  paper(
    "from-steel-to-screens",
    "From Steel to Screens",
    "Archive catalogue entry · verified ResearchGate record",
    undefined,
    "https://www.researchgate.net/publication/397270097_From_Steel_to_Screens_Deindustrialization_Mass_Incarceration_and_the_Rise_of_the_Adult_Industry_in_Post-Industrial_America",
  ),
  paper("perception-proxy", "The Perception Proxy"),
  paper("homelessness-manufacture", "Homelessness Manufacture"),
  paper(
    "welfare-wealthfare-social-control",
    "Welfare, Wealthfare, and Social Control in Advanced Democracies",
  ),
  paper(
    "civilizational-capacity",
    "Civilizational Capacity and the Political Economy of Scapegoating",
  ),
  paper(
    "nativist-politics",
    "You Can Have Our Money, But Not Our Vote: Nativist Politics and Globalized Capital",
  ),
  paper("placebo-discrimination", "The Placebo of Discrimination"),
  paper("status-incentives", "Status Incentives and Boundary Expansion"),
  paper("smashing-proxy", "Smashing the Proxy"),
  paper(
    "from-vietnam-terry",
    "From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential",
    "Public author paper",
    "/library/documents/from-vietnam-to-terry-ohio/",
  ),
  paper(
    "ious-to-dos",
    "From IOUs to DOs: Federal Reserve Debt Instruments, Tariff Policy, and Domestic Medical Labor",
    "Archive catalogue entry · verified ResearchGate record",
    undefined,
    "https://www.researchgate.net/publication/397777032_From_Treasury_Securities_to_Doctor_of_Osteopathic_The_Macroeconomic_Chain_Linking_Federal_Reserve_Debt_Instruments_Tariff_Policy_and_Domestic_Medical_Labor_in_Post-Petrodollar_America",
  ),
  paper(
    "ious-to-empires",
    "From IOUs to Empires: How America Outsourced Its Production and China Weaponized the Dollar",
  ),
  paper("territorial-collapse-networked", "From Territorial Collapse to Networked Fade"),
  paper("dollar-vs-brics", "Dollar vs. BRICS"),
  paper("digital-empire", "The Digital Empire"),
  paper(
    "empire-distraction",
    "The Empire of Distraction",
    "Archive catalogue entry · verified ResearchGate record · placement held",
    undefined,
    "https://www.researchgate.net/publication/400015476_The_Empire_of_Distraction_Foreign_Agenda-Setting_Malapportionment_and_the_Managed_Myth_of_Popular_Rule_in_the_United_States",
  ),
  paper("us-counter-china", "U.S. Counter-China and Latin America Playbook"),
  paper("empire-without-bread", "Empire Without Bread"),
  paper("first-without-supremacy", "First Without Supremacy"),
  paper("richer-republic-weaker-hegemon", "The Richer Republic, the Weaker Hegemon"),
  paper(
    "server-as-furnace",
    "The Server as a Furnace: Rust Belt AI Thermal Infrastructure",
    "Public author paper",
    "/research/the-server-as-a-furnace/",
    "https://www.researchgate.net/publication/411789776_The_Server_as_a_Furnace_Rust_Belt_AI_Thermal_Infrastructure",
  ),
  paper("hidden-moral-economy", "The Hidden Moral Economy of Immigration"),
  paper(
    "bipartition-betrayal",
    "Bipartition Betrayal of Human Rights and Fiscal and Monetary Policies",
  ),
  paper("cycles-political-hypocrisy", "The Cycles of Political Hypocrisy"),
  paper("ceiling-accountability", "The Ceiling of Accountability"),
  paper(
    "children-left-behind",
    "Children Left Behind After a War",
    "Public author paper",
    "/library/documents/children-left-behind-after-a-war/",
  ),
  paper(
    "education-rational-thinking",
    "Education and Rational Thinking",
    "Forthcoming collection · editorial review",
  ),
  paper("prescription-pad-power", "From Prescription Pad to Power"),
  paper("administrative-university", "The Administrative University"),
  paper(
    "arteries-empire",
    "The Arteries of Empire: Metabolic Colonization, Fast Food, and the Political Economy of Decline",
  ),

  paper(
    "last-human-workforce",
    "The Last Human Workforce",
    "Book compilation · editorial development",
    "/series/the-last-human-workforce/",
  ),
  paper("rival-west-built", "The Rival the West Built"),
  paper("programmable-gene-silencing", "Programmable Gene Silencing Governance"),
  paper("when-real-science-fiction", "When Real Science Becomes Science Fiction"),
  paper("mindhive-horizons", "MindHive Horizons"),
  paper("ai-learning", "Independent Observer Volume IV: AI Learning"),
  paper(
    "quantum-advantage-primer",
    "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer",
    "Public author paper",
    "/library/documents/entanglement-primer/",
  ),
  paper(
    "quantum-advantage-foundations",
    "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
    "Public author paper",
    "/library/documents/entanglement-foundations/",
  ),
  paper("quantum-antimatter", "Quantum Computing, Antimatter, and the Next Energy Revolution"),
  paper("adhd-cage", "ADHD in a Cage"),
  paper("flesh-trap", "The Flesh Trap"),
  paper(
    "disconnected-hearts",
    "Disconnected Hearts — The Tech Revolution of Intimacy",
    "Public author paper",
    "/library/documents/disconnected-hearts/",
  ),
  paper(
    "regrowing-humanity",
    "Regrowing Humanity",
    "Public author paper",
    "/research/regrowing-humanity/",
  ),
  paper(
    "environmental-instability",
    "Environmental Instability, Developmental Timing, and Cognitive Divergence of Early Homo",
  ),
  paper("genelock", "GeneLock: The Silent Sequence", "Research project · development"),
];

export const archivePaperById = new Map(archivePapers.map((entry) => [entry.id, entry]));
export const archivePaperByFamilyId = new Map(
  archivePapers.map((entry) => [entry.familyId, entry]),
);

const primary = (...paperIds: string[]): ArchivePlacement[] =>
  paperIds.map((paperId) => ({ paperId, relationship: "primary" }));
const crossVolume = (...paperIds: string[]): ArchivePlacement[] =>
  paperIds.map((paperId) => ({ paperId, relationship: "cross-volume" }));
const book = (...paperIds: string[]): ArchivePlacement[] =>
  paperIds.map((paperId) => ({ paperId, relationship: "book" }));
const project = (...paperIds: string[]): ArchivePlacement[] =>
  paperIds.map((paperId) => ({ paperId, relationship: "project" }));

/**
 * Public programme map built from the archive taxonomy. It is intentionally a
 * catalogue, not a file mirror: each paper family is represented once and the
 * source archive remains private.
 */
export const archiveNavigation: ArchiveNavigationVolume[] = [
  {
    volume: "Volume I",
    sections: [
      {
        id: "book-master",
        title: "Book and master compilations",
        description:
          "Volume-level book and master records, kept separate from individual paper families.",
        subfolders: [
          {
            id: "manifesto-destiny-book",
            title: "Manifesto and Destiny",
            papers: book("manifesto-and-destiny"),
          },
          {
            id: "original-master",
            title: "Original master and IP declaration",
            papers: book("original-master-ip"),
          },
        ],
      },
      {
        id: "foundation-method",
        title: "Foundational manifesto and method",
        description: "Method, public literacy, civic capacity, and human capability.",
        subfolders: [
          {
            id: "foundational-manifesto",
            title: "Foundational manifesto versions",
            papers: primary(
              "independent-observer-volume-one",
              "formation-through-struggle",
              "a-systems-centered-manifesto",
            ),
          },
          {
            id: "institutional-power",
            title: "Institutional power and public literacy",
            papers: primary("state-of-exception", "study-the-wall"),
          },
          {
            id: "knowledge-skills",
            title: "Knowledge, skills, and human capability",
            papers: primary("power-of-knowledge"),
          },
          {
            id: "civic-capacity",
            title: "Democracy, civic capacity, and comparative development",
            papers: primary("plato-to-chomsky"),
          },
        ],
      },
      {
        id: "political-economy",
        title: "Political economy, labor, and equal opportunity",
        description: "Economic power, work, technology, and opportunity.",
        subfolders: [
          {
            id: "capital-opportunity",
            title: "Capital amplification and equal opportunity",
            papers: primary("capital-amplification", "attention-infrastructure-gap"),
          },
          {
            id: "populism-stem-labor",
            title: "JD Vance, populism, STEM, and labor",
            papers: primary("jd-vance-populism"),
          },
        ],
      },
      {
        id: "quiet-wealth",
        title: "Quiet wealth, risk, and asset protection",
        description: "Wealth architecture and risk questions.",
        subfolders: [
          {
            id: "quiet-wealth-family",
            title: "Quiet wealth",
            papers: primary("quiet-wealth", "family-wealth-machine"),
          },
        ],
      },
      {
        id: "documentation-evidence",
        title: "Documentation, memory, and evidence",
        description: "Public records, evidence, and institutional memory.",
        subfolders: [
          {
            id: "silent-archivist",
            title: "Silent archivist",
            papers: primary("silent-archivist"),
          },
          {
            id: "security-memory",
            title: "Security of memory",
            papers: primary("reputation-debt", "security-of-memory"),
          },
          {
            id: "evidentiary-patience",
            title: "Death of evidentiary patience",
            papers: primary("death-of-evidentiary-patience"),
          },
        ],
      },
    ],
  },
  {
    volume: "Volume II",
    sections: [
      {
        id: "book-compilations",
        title: "Book and compilations",
        description:
          "The Empire Beneath Democracy book is shown once, independently of the paper families that inform it.",
        subfolders: [
          {
            id: "empire-book",
            title: "Empire Beneath Democracy",
            papers: book("empire-beneath-democracy"),
          },
        ],
      },
      {
        id: "democracy-institutions",
        title: "Democracy, institutions, and party power",
        description: "Representation, agenda-setting, party continuity, media, and public outrage.",
        subfolders: [
          {
            id: "american-empire",
            title: "American empire and elite continuity",
            papers: primary("american-empire-never-democracy"),
          },
          {
            id: "achilles-heel",
            title: "Democracy’s Achilles’ Heel",
            papers: primary("democracys-achilles-heel"),
          },
          {
            id: "bipartisan-betrayal",
            title: "Bipartisan betrayal and party continuity",
            papers: primary("civil-rights-realignment", "hidden-taxation", "welfare-queen"),
          },
          {
            id: "party-switch",
            title: "Party switch and polarization",
            papers: primary("party-switch-polarization"),
          },
          {
            id: "elite-agenda",
            title: "Elite agenda setting and donor power",
            papers: primary("empires-mirror", "thermostat-musk"),
          },
          {
            id: "crises-elections",
            title: "Crises, elections, and public outrage",
            papers: primary("floyd-kirk", "fear-circuit", "when-the-storm-decides"),
          },
          {
            id: "media-narrative",
            title: "Media, race, narrative warfare, and managed democracy",
            papers: primary("accusation-economy"),
          },
        ],
      },
      {
        id: "immigration-border",
        title: "Immigration, citizenship, and border",
        description: "Citizenship, enforcement, migration labor, and voting.",
        subfolders: [
          {
            id: "citizens",
            title: "Citizens without a country",
            papers: primary("citizens-without-a-country"),
          },
          {
            id: "detained",
            title: "Detained at the border",
            papers: primary("detained-at-border"),
          },
          { id: "deportations", title: "Who deported more?", papers: primary("who-deported-more") },
          { id: "latino-voting", title: "Latino voting behavior", papers: primary("latino-irony") },
          {
            id: "migration-labor",
            title: "Migration, labor, and the rotating scapegoat",
            papers: primary("rotating-scapegoat"),
            description:
              "The connected Borrowed Labor record is catalogued in the sovereignty family to avoid a duplicate page.",
          },
        ],
      },
      {
        id: "civil-rights",
        title: "Civil rights, carceral state, and legal power",
        description: "Punishment, prosecution, capital, and legal power.",
        subfolders: [
          {
            id: "punishment-clause",
            title: "Thirteenth Amendment punishment clause",
            papers: primary("thirteenth-punishment-clause"),
          },
          {
            id: "progressive-terry",
            title: "Mask of the Progressive and Terry",
            papers: primary("mask-progressive-terry"),
          },
          {
            id: "protected-criminals",
            title: "Protected criminals, pardons, and non-prosecution",
            papers: primary("protected-criminals"),
          },
          {
            id: "attorney-general",
            title: "Attorney General and presidential pressure",
            papers: primary("mitchell-to-barr"),
          },
          {
            id: "sanctioned-capital",
            title: "Sanctioned capital and the American opportunity myth",
            papers: primary("sanctioned-capital"),
          },
        ],
      },
      {
        id: "empire-geopolitics",
        title: "Empire, geopolitics, and sovereignty",
        description:
          "Power shifts, Russia, China, Europe, resource systems, and strategic failure.",
        subfolders: [
          {
            id: "china-order",
            title: "China, global order, and power shifts",
            papers: primary("from-colonization-to-china"),
          },
          {
            id: "empire-fade",
            title: "American empire fade and network power",
            papers: primary("empire-learned-disappear"),
          },
          {
            id: "europe-nato",
            title: "Europe, NATO, and borrowed sovereignty",
            papers: primary("nato-american-empire", "borrowed-labor"),
          },
          {
            id: "post-autocratic-russia",
            title: "Post-autocratic Russia and industrial policy",
            papers: primary("managed-interdependence", "russia-after-autocracy"),
          },
          {
            id: "resource-wealth",
            title: "Resource wealth and competing economic systems",
            papers: primary("geography-enslaved-wealth", "two-masks-one-face"),
          },
          {
            id: "colonial-governance",
            title: "Colonial governance and imperial intermediaries",
            papers: primary("how-empires-rule-strangers"),
          },
          {
            id: "caspian",
            title: "Caspian supply corridor",
            papers: primary("caspian-supply-corridor"),
          },
          {
            id: "truth-failure",
            title: "Truth, failure, and strategic blindness",
            papers: primary("how-empires-fail"),
          },
          {
            id: "command-economies",
            title: "Command economies, militarization, and technological mobilization",
            papers: primary("command-economies"),
          },
          {
            id: "moral-exceptionalism",
            title: "Moral exceptionalism, war, and national memory",
            papers: primary("moral-exceptionalism"),
          },
        ],
      },
    ],
  },
  {
    volume: "Volume III",
    sections: [
      {
        id: "book-compilation",
        title: "Book and master compilation",
        description:
          "The Volume III book is catalogued once, separate from its individual paper families.",
        subfolders: [
          { id: "managed-decline-book", title: "Managed Decline", papers: book("managed-decline") },
        ],
      },
      {
        id: "marriage-ownership-tax",
        title: "A. Marriage, ownership, tax, and wealth architecture",
        description:
          "Household institutions, taxation, social class, and post-industrial ownership.",
        subfolders: [
          {
            id: "marriage-family-law",
            title: "Marriage, family law, and wealth",
            papers: primary("intimacy-after-institutional-change", "divorce-gap"),
          },
          {
            id: "tax-ownership-class",
            title: "Tax, ownership, and social class",
            papers: primary("wardhan-tax-doctrine", "social-class-welfare"),
          },
          {
            id: "ai-labor",
            title: "AI, labor, and the post-industrial economy",
            papers: primary("hours-to-ownership"),
          },
          {
            id: "gender-time",
            title: "Gender equity, time, and demographic economics",
            papers: crossVolume("double-tax-on-time"),
            description: "Canonical public record is placed in Volume IV.",
          },
        ],
      },
      {
        id: "deindustrialization-welfare",
        title: "B. Deindustrialization, welfare, social control, and cultural displacement",
        description: "Economic insecurity, welfare administration, labor, and social change.",
        subfolders: [
          {
            id: "direct-papers",
            title: "Direct paper shelf",
            papers: primary(
              "economics-of-color",
              "from-steel-to-screens",
              "perception-proxy",
              "homelessness-manufacture",
              "welfare-wealthfare-social-control",
              "civilizational-capacity",
              "nativist-politics",
              "placebo-discrimination",
              "status-incentives",
              "smashing-proxy",
              "from-vietnam-terry",
            ),
          },
        ],
      },
      {
        id: "macroeconomy-industrial",
        title: "C. Macroeconomy, industrial power, and geopolitical infrastructure",
        description: "Industrial systems, energy, technology, and macroeconomic power.",
        subfolders: [
          {
            id: "direct-papers",
            title: "Direct paper shelf",
            papers: primary(
              "ious-to-dos",
              "ious-to-empires",
              "territorial-collapse-networked",
              "dollar-vs-brics",
              "digital-empire",
              "empire-distraction",
              "us-counter-china",
              "empire-without-bread",
              "first-without-supremacy",
              "richer-republic-weaker-hegemon",
              "server-as-furnace",
            ),
          },
        ],
      },
      {
        id: "immigration-enforcement",
        title: "D. Immigration, law enforcement, measurement, and labor dependence",
        description: "Measurement, enforcement, labor, and migration systems.",
        subfolders: [
          {
            id: "deportations-measurement",
            title: "Who deported more? enforcement measurement",
            papers: crossVolume("who-deported-more"),
            description: "Canonical public record is placed in Volume II.",
          },
          {
            id: "hidden-moral-economy",
            title: "Hidden moral economy and labor dependence",
            papers: primary("hidden-moral-economy"),
          },
        ],
      },
      {
        id: "governance-legitimacy",
        title: "E. Governance, legitimacy, and accountability",
        description: "Institutional trust, accountability, and public legitimacy.",
        subfolders: [
          {
            id: "direct-papers",
            title: "Direct paper shelf",
            papers: primary(
              "bipartition-betrayal",
              "cycles-political-hypocrisy",
              "ceiling-accountability",
            ),
          },
          {
            id: "connected-records",
            title: "Connected archive records",
            papers: crossVolume(
              "reputation-debt",
              "floyd-kirk",
              "state-of-exception",
              "mitchell-to-barr",
            ),
            description:
              "These paper families have one canonical placement elsewhere in the programme.",
          },
        ],
      },
      {
        id: "education-health",
        title: "F. Education, medicine, health, and human capital",
        description: "Education, health systems, medicine, and capability.",
        subfolders: [
          {
            id: "direct-papers",
            title: "Direct paper shelf",
            papers: primary(
              "prescription-pad-power",
              "administrative-university",
              "arteries-empire",
              "children-left-behind",
            ),
          },
          {
            id: "education-rationality",
            title: "Education and rational thinking",
            papers: crossVolume("education-rational-thinking"),
            description: "Canonical forthcoming collection is placed in Volume V.",
          },
        ],
      },
    ],
  },
  {
    volume: "Volume IV",
    sections: [
      {
        id: "book-compilation",
        title: "Book and master compilation",
        description:
          "The Last Human Workforce is shown once as an in-development book compilation.",
        subfolders: [
          {
            id: "last-human-workforce",
            title: "The Last Human Workforce",
            papers: book("last-human-workforce"),
          },
        ],
      },
      {
        id: "transition",
        title: "Transition from Volume III",
        description: "A bridge into capability, infrastructure, learning, and technology.",
        subfolders: [
          {
            id: "rival-west-built",
            title: "Transition paper",
            papers: primary("rival-west-built"),
          },
        ],
      },
      {
        id: "technology-cognition",
        title: "Technology, cognition, and governance",
        description:
          "Technology as a human and institutional system, rather than a software-only story.",
        subfolders: [
          {
            id: "biotechnology",
            title: "Biotechnology, biosecurity, and dual-use governance",
            papers: primary("programmable-gene-silencing"),
          },
          {
            id: "direct-manuscripts",
            title: "Technology and cognition paper shelf",
            papers: primary(
              "when-real-science-fiction",
              "mindhive-horizons",
              "ai-learning",
              "quantum-advantage-primer",
              "quantum-advantage-foundations",
              "quantum-antimatter",
              "adhd-cage",
              "flesh-trap",
              "disconnected-hearts",
            ),
          },
        ],
      },
      {
        id: "human-capability",
        title: "Human capability and development",
        description:
          "Embodiment, adaptation, care, and the conditions that make technical capability usable.",
        subfolders: [
          {
            id: "regrowing-humanity",
            title: "Regrowing humanity and neuroprosthetics",
            papers: primary("regrowing-humanity"),
          },
          {
            id: "environmental-instability",
            title: "Environmental instability and human development",
            papers: primary("environmental-instability"),
          },
          {
            id: "education-rationality",
            title: "Education and rational thinking",
            papers: crossVolume("education-rational-thinking"),
            description: "Canonical forthcoming collection is placed in Volume V.",
          },
        ],
      },
      {
        id: "research-projects",
        title: "Research projects",
        description: "Research-to-narrative work is separated from research-paper records.",
        subfolders: [{ id: "genelock", title: "GeneLock project", papers: project("genelock") }],
      },
    ],
  },
  {
    volume: "Volume V",
    archiveTitle: "Future Societal Problems — Forthcoming",
    sections: [
      {
        id: "education-rationality",
        title: "Education, rationality, and cognitive control",
        description:
          "A forthcoming fifth-volume research direction; it has one canonical catalogue record rather than duplicated Volume III or IV copies.",
        subfolders: [
          {
            id: "education-rational-thinking",
            title: "Education and rational thinking",
            papers: primary("education-rational-thinking"),
          },
        ],
      },
    ],
  },
];

export type ArchivePlacementRecord = ArchivePlacement & {
  familyId: string;
  volume: ArchiveNavigationVolume["volume"];
  sectionId: string;
  sectionTitle: string;
  subfolderId: string;
  subfolderTitle: string;
};

export const archivePlacementRecords: ArchivePlacementRecord[] = archiveNavigation.flatMap(
  (volume) =>
    volume.sections.flatMap((section) =>
      section.subfolders.flatMap((subfolder) =>
        subfolder.papers.flatMap((placement) => {
          const archivePaper = archivePaperById.get(placement.paperId);
          if (!archivePaper) return [];
          return [
            {
              ...placement,
              familyId: archivePaper.familyId,
              volume: volume.volume,
              sectionId: section.id,
              sectionTitle: section.title,
              subfolderId: subfolder.id,
              subfolderTitle: subfolder.title,
            },
          ];
        }),
      ),
    ),
);

export const archivePlacementsByFamilyId = new Map<string, ArchivePlacementRecord[]>();
for (const placement of archivePlacementRecords) {
  const existing = archivePlacementsByFamilyId.get(placement.familyId) ?? [];
  existing.push(placement);
  archivePlacementsByFamilyId.set(placement.familyId, existing);
}

export function archivePlacementsForFamily(familyId?: string) {
  return familyId ? (archivePlacementsByFamilyId.get(familyId) ?? []) : [];
}

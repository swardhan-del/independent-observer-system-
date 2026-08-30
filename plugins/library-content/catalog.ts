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
      "This volume makes distribution concrete by following the move from industrial wage work toward fragmented service, platform, and data work. It asks how time, taxation, welfare, health, education, housing, policing, and ownership decide who carries the cost of change and who can build a future.",
    summary:
      "Managed Decline is a political-economy inquiry into how economic displacement becomes lived insecurity: wage taxation and asset ownership, welfare and health systems, administrative friction, deindustrialization, algorithmic attention, and the pathways that may turn hours of work into durable capacity.",
    coreIdeas: [
      "Work and time are social and policy questions, not only private economic inputs.",
      "A policy proposal must remain distinct from enacted law, official scoring, or legal advice.",
      "Social citizenship asks who carries the cost of change and who can access public capacity.",
    ],
    topicSlugs: ["economics", "law", "politics"],
    researchPapers: [
      {
        title:
          "From Pockets to Portfolios: Terry v. Ohio, Working-Class Life, and the Labor-First Tax State",
        lens: "Law, time, and labor taxation",
        description:
          "Connects discretionary police encounters to a working-class time tax: missed work, late fees, court dates, and compounding legal exposure. It then compares that street-level burden with a tax system that treats wage labor more predictably than appreciating assets, and proposes reforms linking legal safeguards to labor-first tax reform.",
        relevance:
          "Provides a central Volume III bridge between legal exposure, lost time, wage taxation, asset ownership, and the practical conditions of social citizenship.",
      },
      {
        title:
          "The Economics of Color: How De-industrialization and Wealth Stratification Reshaped Race, Crime, and Identity in America",
        lens: "Deindustrialization, race, and policing",
        description:
          "Examines how the decline of stable industrial labor and the concentration of wealth reshaped crime, legitimacy, and cultural identity. Its argument treats preventive policing, mass incarceration, and media markets as parts of a post-industrial system in which race can become a visible proxy for class position.",
        relevance:
          "Shows how Volume III moves from economic displacement to its institutional and cultural consequences, including policing, concentrated poverty, wealth stratification, and public narratives.",
      },
      {
        title:
          "Welfare, Wealthfare, and Social Control in Advanced Democracies: Open-Air Prisons, Crime, and the Surplus Population",
        lens: "Welfare and social control",
        description:
          "Uses the open-air-prison concept to examine how deindustrialization, cognitive deprivation, punitive conditionalities, public housing, and carceral policy can confine people without creating routes to mobility. It contrasts those burdens with tax expenditures, asset subsidies, and regulatory privileges that shield wealth from risk.",
        relevance:
          "Develops Volume III’s core question about who receives genuine exits into education, employment, and ownership—and who is instead managed through welfare, surveillance, or punishment.",
      },
      {
        title:
          "The Administrative University: Bureaucratic Expansion, Tuition Growth, Student Debt, and the Managed Decline of Academic Mobility",
        lens: "Education and administrative mobility",
        description:
          "Studies the shift from teaching-centered institutions toward layered administrative systems for compliance, assessment, retention, risk, and student services. It argues that administrative expansion can transmit rising fixed costs into tuition, debt, time loss, and bureaucratic confusion, with working-class students absorbing more of the mobility risk.",
        relevance:
          "Adds education and administrative friction to Volume III’s account of social citizenship: public capacity is measured by whether institutions expand mobility or convert access into debt and delay.",
      },
      {
        title: "Hours to Ownership: Why the AI Industrial Revolution Rewires Inequality",
        lens: "AI, ownership, and inequality",
        description:
          "Compares earlier industrial revolutions with general-purpose AI, emphasizing cognitive automation, platform gatekeepers, and scarce compute, energy, and data. It proposes shifting the distributional question from hours alone toward ownership of equity, intellectual property, datasets, and distribution channels, alongside portable benefits and adult learning.",
        relevance:
          "Extends Volume III into the next labor transition by asking whether technological change produces broad-based ownership and capability or intensifies winner-take-most inequality.",
      },
      {
        title:
          "The Perception Proxy: From Factory Collapse to Podcast Rage, and How Culture-War Influencers Convert Class Displacement into Identity Conflict",
        lens: "Media, class displacement, and identity",
        description:
          "Describes a displacement-to-distraction pipeline in which deindustrialization, automation, offshoring, wage stagnation, housing stress, debt, and ownership concentration are converted by platform media into high-arousal identity conflict. It follows how attention markets can redirect economic injury toward symbolic enemies.",
        relevance:
          "Brings Volume III’s economic, media, and social-control strands together by showing how material insecurity can be narrated, monetized, and politically displaced rather than materially repaired.",
      },
    ],
  },
  {
    volume: "Volume IV",
    focus: "AI, infrastructure, science, and human capability",
    importance:
      "Volume IV asks when science and technology become usable human capability. It spans AI and automation; energy, compute, semiconductors, and quantum systems; biophysics and medical technology; neuroprosthetics, cognition, intimacy, and human evolution; and the geopolitical institutions that sustain or constrain them. It represents the full stack behind technical promise—measurement, education, labor, infrastructure, maintenance, safety, ownership, and governance—and tests whether progress expands human agency or creates a new black box.",
    summary:
      "A capability inquiry into how advanced technology is measured, built, maintained, and distributed—from AI and quantum systems to medical devices, neural interfaces, education, scientific rivalry, and human adaptation.",
    coreIdeas: [
      "Technology is a system involving infrastructure, energy, data, maintenance, skills, and human labor.",
      "Scientific claims must be separated into theory, experiment, engineering, economic practicality, governance, and speculation.",
      "Human capability includes learning, cognition, health, embodiment, and participation—not only automation or output.",
    ],
    topicSlugs: ["technology", "science", "economics"],
    researchPapers: [
      {
        title:
          "When Real Science Becomes Science Fiction: Biophysics, Medical Technology, and the Decline of Mechanistic Training",
        lens: "Biophysics and medical education",
        description:
          "Distinguishes operating a medical tool from understanding the physical, computational, and molecular chain that produces its output. Through imaging, radiation, electrophysiology, hematology, molecular methods, and clinical training, it develops mechanistic technological literacy and asks how education can preserve troubleshooting, artifact recognition, and interdisciplinary design.",
        relevance:
          "Makes Volume IV’s human-capability question concrete in medicine: advanced devices improve care only when institutions preserve the scientific literacy needed to interpret, audit, repair, and safely extend them.",
      },
      {
        title:
          "Quantum Computing, Antimatter, and the Next Energy Revolution: Preparing Civilization for the Post-Silicon Age",
        lens: "Quantum computing, energy, and scientific sovereignty",
        description:
          "Separates quantum computing’s specialized computational promise from antimatter’s established physics and extreme engineering limits. Its six-part framework distinguishes theory, laboratory demonstration, engineering feasibility, economic practicality, geopolitical importance, and speculation, while connecting quantum science to post-quantum security, fusion, materials, laboratories, education, and resilient infrastructure.",
        relevance:
          "Gives Volume IV a disciplined way to evaluate frontier technology without confusing a physical possibility, a laboratory milestone, a deployable system, and a public capability.",
      },
      {
        title:
          "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
        lens: "Quantum foundations and post-quantum security",
        description:
          "Explains superposition, entanglement, measurement, interference, teleportation, superdense coding, selected algorithms, fault-tolerant error correction, and quantum networks. It also clarifies the no-communication theorem and connects the technical foundations to cryptographic migration, materials and chemistry simulation, and the limits of optimization and machine learning claims.",
        relevance:
          "Connects Volume IV’s scientific-capability theme to the difference between a valid mechanism, an engineering architecture, and a social consequence that institutions must prepare for.",
      },
      {
        title:
          "The Rival the West Built: China’s Scientific Rise, American Deindustrialization, and the Transition from Political Empire to Planetary Civilization",
        lens: "Scientific rivalry and industrial transition",
        description:
          "Traces how the Sino-Soviet split, triangular diplomacy, post-1978 reform, investment, supply-chain integration, technology diffusion, and domestic state capacity contributed to China’s industrial and scientific scale, while distinguishing different measures of research and technological leadership. It pairs that history with U.S. deindustrialization, persistent American institutional strengths, and a verification-centered reform agenda.",
        relevance:
          "Provides Volume IV’s geopolitical bridge: scientific capability depends on industrial foundations, education, infrastructure, institutions, and verifiable cooperation rather than headline rankings alone.",
      },
      {
        title:
          "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
        lens: "Neuroprosthetics and embodied capability",
        description:
          "Reviews the shift from passive and body-powered limbs toward myoelectric, peripheral-nerve, cortical, and bone-anchored systems that interpret intention, produce movement, and sometimes return limited sensation. It keeps motor control, sensation, usability, embodiment, rehabilitation, maintenance, cybersecurity, consent, financing, and employment infrastructure analytically distinct.",
        relevance:
          "Shows that Volume IV’s idea of capability is embodied and institutional: a device is not meaningful progress unless people can safely use, maintain, afford, and live with it over time.",
      },
      {
        title:
          "Environmental Instability, Developmental Timing, and the Cognitive Divergence of Early Homo",
        lens: "Human evolution and cognitive adaptation",
        description:
          "Uses a conservative synthesis of palaeoanthropology, palaeoclimate, developmental timing, archaeology, comparative cognition, cultural evolution, and ancient genomics to question simple climate-to-intelligence stories. It treats flexibility, social learning, development, connectivity, disease, technology, and demographic resilience as interacting possibilities while keeping fossil and archaeological inference bounded.",
        relevance:
          "Expands Volume IV beyond machines: human capability has biological, developmental, social, and ecological conditions that cannot be reduced to brain size, automation, or a single evolutionary ladder.",
      },
      {
        title:
          "Mind Hive Horizons: Energy, Error-Correction, and the Real Timeline to Type-I Emulation",
        lens: "Whole-brain emulation and digital infrastructure",
        description:
          "Rebuilds the whole-brain-emulation question as a conditional infrastructure problem. It separates acquisition data, reconstructed storage, dynamic state, computation, memory traffic, communication, redundancy, cooling, and governance, and treats low-, central-, and high-demand scenarios as sensitivities rather than forecasts.",
        relevance:
          "Tests Volume IV’s central claim that digital capability remains physical: computation, identity, maintenance, energy, cybersecurity, and legal authority all matter when software is treated as a possible human substrate.",
      },
      {
        title: "ADHD in a Cage: Why the System Criminalizes the Mind",
        lens: "Neurodiversity, health, and justice",
        description:
          "Frames ADHD diagnosis, educational exclusion, racialized access to care, and medication restrictions in correctional settings as a connected research problem. The preprint argues that institutions can convert untreated neurodivergence into disciplinary and criminal-justice exposure, and proposes screening, treatment parity, and training as questions for evidence and policy review.",
        relevance:
          "Brings cognition and public capacity into Volume IV’s account of human capability by asking whether institutions accommodate different minds or turn difference into lost education, health, and civic participation.",
      },
      {
        title: "The Last Human Workforce: Automation, AI, and the Death of the Old Middle Class",
        lens: "AI, labor, and social adaptation",
        description:
          "The Volume IV book-length draft follows automation, AI as cognitive amplifier, education, originality, time, political volatility, and the rebuilding of an intellectual middle class. It asks how institutions can preserve meaningful human work and shared capability when tasks, credentials, and economic security are reorganized by machines.",
        relevance:
          "Acts as the volume’s labor anchor, connecting technical systems to education, class structure, social adaptation, and the human functions that should remain visible inside an automated economy.",
      },
    ],
  },
];

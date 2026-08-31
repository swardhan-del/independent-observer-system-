/**
 * Public-safe synthesis of the Volume II source taxonomy and audit frame.
 * These are research families and reading principles, not a claim that only
 * four manuscripts exist or that any manuscript is a released publication.
 */
export type VolumeTwoResearchPaper = {
  title: string;
  description: string;
  status: "Public SSRN record" | "Mapped research direction";
  href?: string;
};

export type VolumeTwoResearchFamily = {
  title: string;
  fullTitle: string;
  description: string;
  significance: string;
  principle: string;
  papers: readonly VolumeTwoResearchPaper[];
};

export type VolumeTwoPrinciple = {
  title: string;
  description: string;
};

export type VolumeTwoFramework = {
  intro: string;
  families: readonly VolumeTwoResearchFamily[];
  principles: readonly VolumeTwoPrinciple[];
};

export const volumeTwoFramework: VolumeTwoFramework = {
  intro:
    "Volume II, The Empire Beneath Democracy, is organized as four connected paper families—not four isolated papers and not a claim that the project ends with four manuscripts. Each family takes a different route into the same question: how does authority become usable, limited, or materially dependent beneath the language of democratic sovereignty? The sequence begins with institutions and party power, moves through membership and enforcement, tests law and civil rights, and then follows capital, resources, alliances, and geopolitical dependence beyond the state. The family briefs below are a public editorial synthesis of that research map. Representative titles are labeled as public SSRN records or mapped research directions; no private draft is reproduced and no working paper is represented as a released publication.",
  families: [
    {
      title: "Democracy, institutions, and party power",
      fullTitle:
        "Democracy, Institutions, and Party Power: Representation, Agenda-Setting, and the Architecture of Usable Authority",
      description:
        "This family starts with the institutions that translate public participation into decisions. It examines constitutional arrangements, election rules, party continuity, realignment, donor concentration, lobbying, agenda-setting, information gatekeeping, and political crisis. The question is not merely whether people may vote, but who can define the choices, fund the messages, control attention, and obtain correction once a decision is made. That makes this family the opening institutional bridge from Volume I’s evidence discipline to Volume II’s account of managed power.",
      significance:
        "This is Volume II’s institutional starting point. It gives readers a way to compare formal legitimacy with usable political power, keeping representation, incentives, and historical continuity visible before the volume turns to borders, law, or empire.",
      principle: "Formal democracy is not the same as usable power.",
      papers: [
        {
          title: "Democracy’s Achilles’ Heel: Institutional Incentives and Political Outcomes",
          description:
            "Examines how concentrated resources, unequal participation, information gatekeeping, partisan tolerance for rule-breaking, and weakened institutional referees can reinforce one another. It tests whether these advantages persist through identifiable pathways and resist correction without reducing the diagnosis to a single cause.",
          status: "Mapped research direction",
        },
        {
          title:
            "Civil Rights Realignment and Party Sorting in the United States: From Reconstruction to Contemporary Populism",
          description:
            "Traces Republican coalition identity from Union and Reconstruction origins through disenfranchisement, the Voting Rights Act’s federal-enforcement effects, and later party sorting. Realignment and media-linked identity mechanisms remain bounded historical hypotheses rather than a single-cause explanation.",
          status: "Mapped research direction",
        },
        {
          title:
            "The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States",
          description:
            "Links foreign-policy agenda shocks to unequal representation, attention allocation, lobbying, and the distance between population-weighted preferences and enacted policy. Its measurement frame follows committee and floor time, appropriations, contract geography, and representation without treating any foreign-policy event as automatically manufactured or coordinated.",
          status: "Public SSRN record",
          href: "/library/documents/empire-of-distraction-ssrn/",
        },
        {
          title:
            "Empire’s Mirror: Foreign Lobbying, Concentrated Wealth, and Imperial Self-Understanding in the United States",
          description:
            "Asks how foreign lobbying, concentrated private wealth, and institutional power shape congressional agenda-setting. It separates registration, spending, access, agenda attention, and policy outcomes, treating foreign lobbying as a disclosed influence channel rather than proof of control.",
          status: "Mapped research direction",
        },
      ],
    },
    {
      title: "Immigration, citizenship, and border",
      fullTitle:
        "Immigration, Citizenship, and Border Governance: Membership, Enforcement, and the Administrative State",
      description:
        "This family follows the boundary between the people a state names and the people its institutions govern. It distinguishes citizenship, residency, external voting, border inspection, detention, removal, return, expulsion, migration, labor demand, and political identity, then asks how administrative categories distribute rights, exposure, and belonging. Its cases matter to Volume II because they show sovereignty working through records, permits, enforcement routines, and reciprocal obligations—not only through speeches or constitutional language.",
      significance:
        "This family makes membership and enforcement measurable. It gives the volume a concrete way to study who is counted as part of the political community, who is exposed to state power, and how definitions can change the apparent meaning of a public statistic.",
      principle: "Definitions are part of evidence.",
      papers: [
        {
          title:
            "Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections",
          description:
            "Examines how federal voting rights held by citizens who live permanently outside the United States—including people who have never lived there—test the relationship among political voice, residency, civic integration, taxation, and exposure to domestic policy consequences. It treats citizenship and voting as institutional relationships rather than labels that resolve every legitimacy question by themselves.",
          status: "Public SSRN record",
          href: "/library/documents/citizens-without-a-country-ssrn/",
        },
        {
          title:
            "Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025",
          description:
            "Separates removals, returns, expulsions, interior enforcement, border enforcement, and expedited removal before comparing administrative priorities. The definitions-first approach shows how prosecutorial discretion, detainer policy, reporting periods, and resource allocation can change headline counts without proving a simple increase or decrease in total enforcement.",
          status: "Public SSRN record",
          href: "/library/documents/who-deported-more-ssrn/",
        },
        {
          title: "The Latino Irony: Why Many Hispanic Americans Support Donald Trump",
          description:
            "Treats Latino voting behavior as internally heterogeneous rather than as a single identity-based bloc. It combines identity, cultural conservatism, economic evaluation, political memory, immigration-enforcement salience, and local information environments while framing its purpose as explanation and measurement, not candidate advocacy.",
          status: "Public SSRN record",
          href: "/library/documents/latino-irony-ssrn/",
        },
        {
          title:
            "Borrowed Labor: The Demographic Limit of Nationalist Sovereignty in Central and Eastern Europe",
          description:
            "Maps how Poland, Hungary, and Slovakia reconcile demographic-sovereignty rhetoric with reliance on foreign workers. The paper defines the membership–function gap and the demographic time-lag problem, then tests how ageing, wages, childcare, productivity, managed migration, portable status, and integration interact.",
          status: "Mapped research direction",
        },
      ],
    },
    {
      title: "Civil rights, carceral state, and legal power",
      fullTitle:
        "Civil Rights, the Carceral State, and Legal Power: Doctrine, Discretion, and Unequal Exposure",
      description:
        "This family tests what legal equality means when the state’s protective and punitive capacities are distributed unevenly. It studies constitutional exceptions, policing doctrine, fines and fees, punishment, pardons, non-prosecution, prosecutorial independence, and the historical afterlives of coerced labor. The analytical task is to separate legal text from administrative discretion and observed outcome, so claims about civil rights remain tied to jurisdiction, procedure, evidence, and the people who bear the risk.",
      significance:
        "This family keeps Volume II from treating sovereignty as an abstract constitutional power. It shows how law becomes practical through enforcement, protection, discretion, and fiscal incentives—and how the same legal order can distribute safety, burden, and accountability unevenly.",
      principle: "Enforcement reveals how power is organized.",
      papers: [
        {
          title: "Human Rights, Policing Doctrine, and Hidden Taxation in Modern U.S. Governance",
          description:
            "Develops hidden taxation as a framework for examining when policing, adjudication, and municipal finance become entangled through fines, fees, forfeiture, court costs, and related sanctions. It distinguishes legal instruments and jurisdictions, then asks what ability-to-pay safeguards, neutral collections, independent audits, and transparent distributional data would make exposure visible.",
          status: "Mapped research direction",
        },
        {
          title:
            "The Clause, They Never Taught You: How the 13th Amendment Legalized Slavery for Profit",
          description:
            "Examines the Thirteenth Amendment’s punishment-clause exception, the history of coerced labor, and the legal and economic mechanisms that can connect criminal punishment with profit. The public brief treats the title’s strongest claim as a research argument to test through constitutional text, historical records, doctrine, and institutional practice.",
          status: "Mapped research direction",
        },
        {
          title: "Protected Criminals: The Real Power Behind Pardons and Non-Prosecution",
          description:
            "Studies pardons, non-prosecution, beneficial ownership, extradition, mutual legal assistance, national-security tradeoffs, and political influence as questions of selective exposure. It asks how protection is created, which institutions can review it, and how legal equality is affected when enforcement is discretionary.",
          status: "Mapped research direction",
        },
        {
          title:
            "From Mitchell to Barr: The Attorney General’s Legal Boundaries in Times of Crisis",
          description:
            "Uses the recurring problem of presidential pressure on Attorneys General to examine legal boundaries, institutional independence, and the difference between executive direction and action outside the law. Historical comparison is used as a cautionary framework, not as a claim that distinct administrations or events are identical.",
          status: "Mapped research direction",
        },
      ],
    },
    {
      title: "Empire, geopolitics, and sovereignty",
      fullTitle:
        "Empire, Geopolitics, and Sovereignty: External Power, Resource Systems, and Practical Independence",
      description:
        "This family carries the inquiry beyond domestic institutions to the systems that make independence materially possible or impossible. It follows capital, technology, security, labor, trade, resources, industrial policy, alliances, lobbying, and historical power shifts across the United States, Europe, Russia, China, and resource-rich regions. Its central question is whether a state can claim sovereign choice while relying on external infrastructures; this is Volume II’s bridge from institutional design to geopolitical and political-economic dependence.",
      significance:
        "This family supplies the volume’s outward-facing scale. It connects constitutional and administrative choices to the capital, technology, security, labor, resource, and alliance systems that set the real limits of national autonomy.",
      principle: "Sovereignty is relational and material.",
      papers: [
        {
          title:
            "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
          description:
            "Traces how colonization, industrialization, and strategic economic design shaped modern power. It reads contemporary competition among the United States, China, and Russia alongside older systems of knowledge extraction, inequality, and institutional control rather than treating the present contest as wholly new.",
          status: "Public SSRN record",
          href: "/library/documents/from-colonization-to-chinas-rise-ssrn/",
        },
        {
          title: "The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies",
          description:
            "Compares resource-rich regions to ask why natural wealth does not automatically produce innovation, social mobility, or high living standards. It connects resource rents, public employment, foreign-investment restrictions, logistics, currency systems, and governance to the question of whether resources become broad capability or concentrated patronage.",
          status: "Public SSRN record",
          href: "/library/documents/geography-of-enslaved-wealth-ssrn/",
        },
        {
          title:
            "Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System",
          description:
            "Compares state capitalism and private feudalism as institutional forms that may concentrate decision-making power while using different languages of freedom, equality, or merit. Its cases ask whether hierarchy, worker dependence, and obedience can persist beneath opposing ideological masks; the shared-face thesis remains an interpretation to test, not a claim that all systems are identical.",
          status: "Public SSRN record",
          href: "/library/documents/two-masks-one-face-ssrn/",
        },
        {
          title:
            "NATO and the American Empire: Burden-Shifting, European Rearmament, and the Politics of Retrenchment",
          description:
            "Treats the NATO question as an inquiry into alliance dependency, burden-shifting, European rearmament, and the transformation of American imperial power from universalist leadership toward selective and transactional hierarchy. It connects legal sovereignty to military capacity, strategic priorities, and the material obligations that alliances distribute.",
          status: "Mapped research direction",
        },
      ],
    },
  ],
  principles: [
    {
      title: "Formal democracy is not the same as usable power.",
      description:
        "Rights and elections matter, but practical power also depends on access, information, agenda-setting, institutional vetoes, and a route for correction between elections.",
    },
    {
      title: "Definitions are part of evidence.",
      description:
        "A credible comparison must keep categories distinct—such as removals, returns, and expulsions; citizens and noncitizens; or basic and advanced searches—before drawing a conclusion.",
    },
    {
      title: "Sovereignty is relational and material.",
      description:
        "A state can speak in the language of independence while relying on outside capital, technology, security, labor, or markets; dependence is a mechanism to investigate, not an insult to assign.",
    },
    {
      title: "Enforcement reveals how power is organized.",
      description:
        "Emergency authority, selective enforcement, punishment, protection, and administrative discretion reveal who is exposed, who is buffered, and whether institutions can correct themselves.",
    },
  ],
};

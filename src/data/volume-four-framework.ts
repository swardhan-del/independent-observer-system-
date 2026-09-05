import type { VolumeTwoFramework } from "./volume-two-framework";

/**
 * Public-safe reading frame for Volume IV. The paper families are a connective
 * map assembled from the existing public catalogue and public synopsis records;
 * they are not a release of the underlying source archive.
 */
export const volumeFourFramework: VolumeTwoFramework = {
  thesis:
    "Technology becomes human capability only when the systems around it—energy, compute, data, training, care, maintenance, and governance—remain accessible, repairable, and answerable to the people who depend on them.",
  intro:
    "Volume IV, The Last Human Workforce, is organized as four connected capability families. They move from the physical and scientific base of advanced systems, through automation and work, into embodied health and finally education, cognition, and adaptation. The sequence keeps technical possibility distinct from engineering feasibility, social access, and public value. The representative titles below are public paper records or mapped research directions; they are a guide to the volume's argument, not a claim that every mapped item is a released publication.",
  families: [
    {
      title: "Scientific infrastructure and quantum systems",
      fullTitle:
        "Scientific Infrastructure and Quantum Systems: From Physical Possibility to Public Capability",
      description:
        "This family sets the evidentiary floor for frontier technology. It separates a valid physical principle, a laboratory demonstration, an engineered system, an economically practical deployment, and a public capability. Quantum computing, error correction, networking, cryptographic migration, materials, energy, and scientific education appear together because no one layer can carry the promise by itself.",
      significance:
        "It prevents Volume IV from becoming a catalogue of technological headlines. The family gives readers a disciplined route from theory to infrastructure and asks which institutions must prepare before a specialized capability can become broadly useful.",
      principle: "A physical possibility is not yet a public capability.",
      papers: [
        {
          title:
            "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers",
          description:
            "A public Volume IV primer explaining superposition, measurement, interference, entanglement, error correction, cryptography, networking, and the limits of quantum speedup. It is designed as the accessible on-ramp: technical distinctions remain visible before policy or procurement conclusions are drawn.",
          status: "Public paper record",
          href: "/library/documents/entanglement-primer/",
        },
        {
          title:
            "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
          description:
            "Moves from first principles to fault-tolerant architecture, quantum networks, post-quantum cryptography, simulation, optimization, and institutional readiness. Its role in the map is to connect a technical mechanism with the standards, security transition, and scientific capacity needed to make it socially useful.",
          status: "Public paper record",
          href: "/library/documents/entanglement-foundations/",
        },
        {
          title: "Quantum Computing, Antimatter, and the Next Energy Revolution",
          description:
            "A mapped research direction that keeps quantum computing's specialized promise separate from antimatter's established physics and extreme engineering limits. Its proposed six-part test—principle, demonstration, engineering, economics, geopolitics, and speculation—gives the volume a reusable anti-hype method.",
          status: "Mapped research direction",
        },
      ],
    },
    {
      title: "AI, automation, and the work transition",
      fullTitle:
        "AI, Automation, and the Work Transition: Task Bundles, Hidden Labor, and the Material System",
      description:
        "This family asks what changes when automation is treated as a full system rather than a software feature. It follows task bundles, supervision, compute, energy, data, maintenance, training, ownership, and the institutional arrangements that determine whether a productivity gain becomes time, security, learning, or simply a transfer of risk.",
      significance:
        "This is the labor anchor of Volume IV. It connects the machine's visible output to the human work and physical infrastructure that make the output possible, then carries that connection into transition design and social adaptation.",
      principle: "Automation changes the task bundle before it eliminates the job title.",
      papers: [
        {
          title: "The Last Human Workforce: Task Bundles, Automation, and Transition Design",
          description:
            "The public synopsis argues that the useful question is not which job titles disappear, but which tasks move, which are redesigned, and who controls the transition. It uses a customer-support field-study result as a bounded example, not as proof that AI raises productivity in every occupation.",
          status: "Public paper record",
          href: "/research/the-last-human-workforce/",
        },
        {
          title: "The Autonomous Illusion",
          description:
            "A research preview that restores the people, resources, rules, and maintenance behind the promise of autonomy. It asks which tasks are replaced, reorganized, augmented, or moved out of sight, and how education, energy, data, and institutional capacity shape the result.",
          status: "Research preview",
          href: "/research/the-autonomous-illusion/",
        },
        {
          title: "The Server as a Furnace",
          description:
            "A public synopsis that treats AI infrastructure as an electrical load, cooling system, secured site, fiber node, and local governance question. Heat reuse, water, construction, training, and enforceable community benefit are treated as conditional design questions, not as automatic benefits.",
          status: "Public paper record",
          href: "/research/the-server-as-a-furnace/",
        },
      ],
    },
    {
      title: "Embodied capability, medicine, and care",
      fullTitle: "Embodied Capability, Medicine, and Care: When Devices Become Lived Systems",
      description:
        "This family moves the capability question into the body. It distinguishes signal capture, decoding, actuation, sensory feedback, embodiment, rehabilitation, maintenance, cybersecurity, consent, financing, and employment. It treats a device as part of a maintained human-machine system rather than as a miracle object or a simple replacement for biology.",
      significance:
        "It gives Volume IV a human measure of progress. The issue is not whether a device looks advanced, but whether a particular person can safely use it, afford it, repair it, understand its limits, and live with its consequences over time.",
      principle: "Capability is lived, maintained, and distributed.",
      papers: [
        {
          title:
            "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
          description:
            "A preview-only bounded research article reviewing the movement from passive and body-powered limbs toward myoelectric, peripheral-nerve, cortical, and bone-anchored systems. The public article separates measured control, sensory feedback, reported embodiment, everyday use, access, and policy; the linked Evidence Lab exposes the source map without publishing the controller manuscript.",
          status: "Preview-only bounded text adaptation",
          href: "/research/regrowing-humanity/",
        },
        {
          title:
            "When Real Science Becomes Science Fiction: Biophysics, Medical Technology, and the Decline of Mechanistic Training",
          description:
            "A mapped direction about the scientific literacy required to interpret, troubleshoot, and safely extend medical technology. It connects imaging, radiation, electrophysiology, molecular methods, and clinical training to the question of whether institutions can preserve understanding while tools become more complex.",
          status: "Mapped research direction",
        },
        {
          title: "ADHD in a Cage: Why the System Criminalizes the Mind",
          description:
            "A mapped direction connecting neurodiversity, educational exclusion, access to care, medication restrictions, and correctional exposure. Its proposed screening and treatment questions are research and policy directions, not a universal diagnosis or a settled causal account.",
          status: "Mapped research direction",
        },
      ],
    },
    {
      title: "Education, cognition, and adaptation",
      fullTitle:
        "Education, Cognition, and Adaptation: Building Human Agency Around Technical Change",
      description:
        "This family asks whether people can build the judgment, health, time, learning, and social connection needed to govern technical change. It links education and adult learning to human evolution, digital intimacy, cognitive difference, and the distribution of stable opportunity, keeping an individual outcome separate from a system-wide claim.",
      significance:
        "It closes the loop between advanced tools and the people who must use, question, and redirect them. Volume IV's final test is not output alone; it is whether institutions leave people with more agency, learning capacity, and room to adapt.",
      principle: "Human adaptation is an institutional capability, not a private obligation.",
      papers: [
        {
          title:
            "The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy",
          description:
            "A Volume IV working paper treating education, foundational skills, AI literacy, and lifelong learning as economic infrastructure. Its strong title is the paper's thesis rather than a universal law; quality, cost, geography, disability, family resources, and labor demand remain part of the test.",
          status: "Public paper record",
          href: "/library/documents/lottery-of-luck/",
        },
        {
          title:
            "Mind Hive Horizons: Energy, Error-Correction, and the Real Timeline to Type-I Emulation",
          description:
            "A mapped direction that treats whole-brain emulation as a conditional infrastructure problem involving acquisition, storage, dynamic state, computation, memory traffic, cooling, identity, cybersecurity, and governance. Low-, central-, and high-demand cases are sensitivities, not forecasts.",
          status: "Mapped research direction",
        },
        {
          title:
            "Environmental Instability, Developmental Timing, and the Cognitive Divergence of Early Homo",
          description:
            "A mapped direction extending capability beyond machines. It brings palaeoanthropology, palaeoclimate, development, archaeology, comparative cognition, culture, and ancient genomics together while rejecting simple climate-to-intelligence stories.",
          status: "Mapped research direction",
        },
      ],
    },
  ],
  principles: [
    {
      title: "A physical possibility is not yet a public capability.",
      description:
        "A mechanism or laboratory result must still pass through engineering, cost, safety, standards, skills, maintenance, and access before it becomes usable at public scale.",
    },
    {
      title: "Automation changes the task bundle before it eliminates the job title.",
      description:
        "The relevant unit is the work inside a role: tasks can be substituted, augmented, supervised, or displaced while the title remains. Training and bargaining power determine who benefits.",
    },
    {
      title: "Capability is lived, maintained, and distributed.",
      description:
        "Performance in a controlled setting is one layer. Daily use, repair, consent, affordability, safety, accessibility, and the ability to challenge a system are separate measures of human value.",
    },
    {
      title: "Human adaptation is an institutional capability, not a private obligation.",
      description:
        "Education, health, care, time, scientific literacy, and public rules shape whether people can understand and govern technical change; individuals cannot carry the whole transition alone.",
    },
  ],
};

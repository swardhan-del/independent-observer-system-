# Where does the server heat go?

Production draft for a 15–19 minute YouTube episode. Source: [The Server as a Furnace](https://independentobserver.org/research/the-server-as-a-furnace/), Volume III, released web adaptation v2 (9 October 2026). Use the source link in the video description. Read at about 112–118 words/minute; allow 4½ minutes for the two guided engineering and policy walkthroughs.

### A physical address for the cloud

[Show an original diagram from an electrical connection to a server rack. Follow a line out of the frame.]

A reply on a screen seems to arrive from nowhere. Somewhere, equipment draws electricity, processes a request and has to be cooled. The machine sits in a real building, on a real grid, next to real neighbours. What happens to the heat it releases?

This episode follows a possible path from a chip to someone who needs heat. We will see where the path can fail, why a claim about water needs a clear boundary, and what a community might ask before supporting a facility. The questions apply to physical infrastructure. They are useful whether or not a prediction about AI demand turns out to be right.

### Separate the report from the scenario

[Source card: Lawrence Berkeley National Laboratory, 2024 United States Data Center Energy Usage Report. Use separate captions for historical estimates and scenario range.]

The Lawrence Berkeley National Laboratory report published in 2024 estimates historical US data centre electricity use and gives scenarios for future demand through 2028. A scenario is a way to examine what could happen under assumptions. It is not a measurement of the future or a promise about the power a particular site will draw. For a local decision, you would also need details about that project, the grid connection, and the service it will actually provide.

Electricity used by computing equipment ultimately becomes heat. That does not make it free to recover. The relevant question is whether enough heat reaches a place that needs it, at a temperature that is useful, on a timetable that suits both sides. To find out, follow the route rather than rely on a photograph of a server.

### Walkthrough 1 · from chip to heat user

[Allow 2:30: 25 seconds for the route overview, 35 seconds for viewers to predict a weak link, 60 seconds for the animated loop and alternate route, and 30 seconds to display the design conditions. Label the system schematic and show arrow directions.]

Start at the chip. Liquid close to the chip can pick up heat and carry it to a place where heat is transferred between loops. The loop serving the equipment and the loop serving the building need not carry the same fluid. A heat exchanger can transfer heat while keeping the systems separate. If the customer needs a higher temperature, a heat pump may provide the lift. Then a distribution route has to carry the heat to a building, a campus or another host.

Pause at the route. How far does the pipe have to go? Who owns the land it crosses? Is the host there when the computing equipment runs? Will the buyer still need the heat if the process changes or the weather is warm? Check the temperature at both ends, the cost of installation, and how much electricity the added equipment uses. A route that looks short on a map might still be hard to build.

Now turn off the customer's demand in the diagram. Computing equipment cannot wait for the buyer to reopen. The site still needs a way to reject heat reliably. The US Department of Energy design guide discusses nearby demand, temperature compatibility and redundant cooling. The article also cites technical guidance on warm-water cooling and separated loops. The diagram is one possible arrangement; it is not a design drawing for any particular site.

### Draw the boundary around a water claim

[Outline the equipment loop, then zoom out to the whole facility.]

If the fluid next to the chip circulates in a closed loop, a company may be able to make a narrow claim about water in that loop. Zoom out. How is heat ultimately rejected? Does another part of the facility need makeup water? What does the design do under hot conditions or during an outage? The Department of Energy’s federal cooling-water guidance is relevant because evaporation and makeup water matter in systems that use cooling towers. The mechanism does not mean every site has a tower.

You can ask a project to specify which boundary it is talking about and which operating conditions it includes. A label without that boundary makes it hard to compare two designs. Water, power, noise and backup systems have to be evaluated on their own terms. A good answer should tell you what has been counted and where you can see how it was measured.

### The best reason to say no

[Draw a possible heat buyer with a seasonal demand line and show a separate supply line.]

The strongest objection is straightforward: the extra system may cost too much for too little useful heat. A host may be too far away. A heat pump can add an electrical load. The demand might be seasonal, and the facility needs backup anyway. A locality might prefer another investment that offers greater public benefit. Those are reasons to screen projects, rather than objections that can be answered with a slogan about recycling.

There is an argument on the other side. A nearby heat host, compatible operating temperatures, and a well-designed contract can make a connection worth testing. A project that fails on one parcel might be feasible on another. A careful assessment would compare with the host's realistic heating alternative and count the new equipment and its energy use. Heat recovery should earn its place in the design.

### Walkthrough 2 · what goes in a public agreement?

[Allow 2:00: 25 seconds for a fictional planning scenario, 30 seconds for viewers to select two obligations, 45 seconds to annotate measures and remedies, 20 seconds for the conclusion card.]

Imagine a town is asked to support a project at a former industrial site. List the promises separately: capacity added, heat delivered where feasible, skills developed, and resources used. For each promise, ask who measures it, how often and what happens when it falls short. The installed capacity of a heat system isn't the same as useful heat actually delivered. A count of people on site during construction does not describe the permanent staff. A training promise is easier to examine if it names the opportunity, when it opens and who can apply.

The article proposes a redevelopment district as a screening and governance framework. In that proposal, infrastructure, paid training and public commitments are part of the deal. That idea still needs feasibility and political evaluation. There may be sites where heat reuse makes sense without a district and districts where no facility clears the test. For the town, the point is to compare alternatives before granting support and to leave behind a way to check the agreement after the announcement.

### Useful heat is an outcome, not a nameplate

[Draw three rows: heat available, heat delivered, heat used. Show no numbers.]

Suppose the equipment maker describes how much heat its system can recover under specified conditions. The operator reports how much heat reaches the far side of a pipe. The building manager wants to know how much of that heat can replace part of an existing service. Those records have different boundaries. Start by naming the quantity. A system can work technically while serving a smaller share of demand than the promotional material suggests.

Also ask who carries a mismatch in timing. The computing load may change when an operator changes equipment or how it runs. A building's schedule may change when it gains a new tenant. The answer could affect the revenue case and the reliability plan. Before treating the system as a public benefit, define the period of measurement, what happens when either party leaves, and whether the alternate heating system must still be maintained. These are questions the article invites a project team to investigate; the answers depend on local conditions, not on this schematic.

### Check the practical alternative

[Place the heat route next to a box marked “current heating service”.]

A useful comparison starts with the heat service the customer actually needs. It might be space heating at certain times, or an industrial process with a more regular schedule. The same equipment can have very different value in those settings. Write down which heat source the project would replace and which one remains available as backup. Then ask what can be measured after installation and what still depends on assumptions about the next tenant or future computing load. This gives the customer and the locality a way to compare a proposal with the service they already have. It also leaves room for deciding that a different location or a different heat source would serve them better.

### Closing · ask for the route and the evidence

[Show two cards: “Can the heat be used?” and “What does the public receive?”]

A server gives off heat. Whether it can be useful depends on the path between equipment and demand. Whether a project deserves public support depends on a wider set of choices. The full article separates those two questions and links the engineering sources. If someone offers you a plan to heat a neighbourhood with computing, ask to see the route, the demand and the backup. Then ask how the public can check what it was promised.

### Description sources and graphics

- [Source article and limitations](https://independentobserver.org/research/the-server-as-a-furnace/#article-limitations)
- [LBNL, 2024 US Data Center Energy Usage Report](https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report)
- [US DOE design guide, sections 5.6 and 7.1](https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf)
- [US DOE cooling-water guidance](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers)
- Draw the loop and temperature concepts in-house. Use no supplier illustration, performance estimate, or site image implying a real project.

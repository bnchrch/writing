Theres a new user persona that I dont think most product teams are thinking about correctly.

When engineers hear a "chef" vibe coded a data integration, they chuckle at the novelty, laugh about "productionizing" it, and move on.

What they miss is the second order effect of this new user persona.

Now Chefs/Dentists/CEOs/Vets all just began to have the same expectations of (and issues with) software as engineers.

Problems that used to be unique to engineers are now everywhere and have a stronger voice:
1. Why is it so hard to access/edit my own data through an API?
2. If I can see it in the UI, why isn't it in the API?

And they're needs are going to start sounding like that of an engineering team. Analogs for:
1. Versioning
2. Environments
3. Packaging and sharing
4. Dev mode vs. prod mode
5. Data storage

Ive started calling them the **non-technical engineer**.

They dont come from computer science. They dont have a GitHub profile from 2014. But they build real software, ship it, and when they hit your products limits they sound exactly like a traditional engineer asking for an API key.

LLMs collapsed the beginner-to-intermediate curve in software. The climb that used to take years now takes weeks for someone whos already smart and has strong systems instincts in their own domain. These people were always out there. The tooling just finally caught up.

Ive met four of them in the last year. The variety is what convinced me this is a real pattern.

1. A former CFO who runs three veterinary clinics. Vibe-coded two polished mobile apps for radical financial transparency. Employees see everyones salary, revenue targets, and submit improvement ideas. Gamified in a Stardew Valley theme with leaderboards. More polished than some of my MVPs after 15 years of building software.

2. My neighbor is a dentist in a small Canadian town. Engineered his own pipeline for same-day dental crowns. Array of 3D printers, calibration cubes, software integrations across multiple packages. Scan, print, fit, same appointment.

3. At Airbyte I helped build a system that let people publish, fork, and remix API integrations. We bolted on an AI assistant to help users write them. Internally engineers debated: "Whats the lowest barrier of technical ability we're willing to support?" They were skeptical non-technical users would even show up. They were wrong. A chef who owned a restaurant chain built integrations to pull data from his POS system. Sales reps authored connectors for obscure internal tools. People who had never written code were building and publishing integrations that other customers used.

4. A CEO and former CMO built what he calls a "content operating system." Custom scripts, a GitHub repo, markdown files, and AI agents that produce content in his voice consistently. Without knowing it hed re-derived data engineering best practices: idempotent transformations, staged processing, version-controlled configs.

I keep seeing this.

The vet practice owner is now switching patient management vendors. Not because the software is bad at managing patients. Because its bad as a platform. The API was incomplete. Data visible in the UI wasnt exposed. A buyer just became a builder. And data access is now a dealbreaker in a market where it never was before.

Two things are happening at once.

1. The number of people who can build software just got much larger
2. Their expectations of your product just became the same as an engineers

Your product isnt software they use. Its a platform they build on. And when it doesnt support that (incomplete APIs, no webhooks, no composability, no data access) they find one that does.

I found these four in a small town in Canada and a modest professional network. If I can find this many in a small radius theyre everywhere.

And theyre going to want an API key.

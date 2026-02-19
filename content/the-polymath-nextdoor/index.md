---
title: "The Rise of the Non-Technical Engineer"
description: "LLMs collapsed the beginner-to-intermediate curve in software. The result isn't just faster engineers. It's new engineers: a CFO, a dentist, a chef, a marketer. And they're going to want an API key."
date: "2026-02-19"
categories:
  - Technology
  - Software Engineering
published: true
---

Polymaths used to be rare. Not because polymathic people were rare, but because polymathic *achievement* was expensive. Learning a new domain meant months or years of beginner pain: dead ends, jargon walls, slow feedback loops, and the constant temptation to quit and go back to the thing you were already good at.

LLMs and agentic tools quietly changed the economics of one domain in particular: software. The beginner-to-intermediate climb that used to take years can now take days or weeks for the right kind of person.

And that person isn't always a software engineer. I've met them as a veterinary practice owner, a dentist, a marketer, a chef.

They don't call themselves engineers. But they build like engineers, and they're starting to expect products to treat them like engineers.

## Polymaths used to be rare

Think of Richard Feynman. Physicist, bongo player, safe cracker, artist. He's the canonical polymath. But Feynman had something beyond raw intellect: an almost supernatural tolerance for being a beginner. Most people don't.

**Polymathy isn't binary. It's a spectrum.** It's shaped by three things: intelligence (how fast you learn), interest (how much the domain pulls you), and energy (your tolerance for being bad at something for a long time). Most smart people have the first two. The third is what stops them.

Being a beginner is painful. And most domains make you pay that tax for years before you're useful.

Software was one of the most expensive domains to cross into. The feedback loops were slow. The jargon was dense. The tooling assumed you already knew what you were doing. The path from "I have an idea" to "I have a working thing" was measured in months. Often years.

## Software just got cheaper to learn

LLMs and agentic tools (AI systems that can take multi-step actions on your behalf: writing code, running commands, debugging errors) collapsed the beginner-to-intermediate curve in software.

I want to be specific about what changed. Not just "AI writes code now." The whole experience of learning to build shifted:

- **Faster feedback loops.** You describe what you want, you get something back in seconds. Not hours of Stack Overflow.
- **Less context hunting.** The tool already knows the framework, the language, the patterns. You don't have to go find them.
- **Fewer dead ends.** The biggest killer of beginner motivation is spending four hours on something that turns out to be a typo or a misconfigured environment. AI tooling dramatically reduces this.
- **Scaffolding for best practices.** Architecture, syntax, error handling. You get reasonable defaults without needing to learn why they're reasonable first.

The beginner-to-intermediate climb that used to take years now takes days or weeks for someone who is already intelligent, motivated, and has strong systems instincts in their own domain.

**This doesn't just create faster engineers. It creates new engineers.**

## Meet the non-technical engineer

Here's the persona I keep running into: the **non-technical engineer.**

They don't come from computer science. They don't have a GitHub profile from 2014. They've never argued about tabs vs. spaces. But they build real software systems, ship them, operate them, and develop the same frustrations and expectations that traditional engineers have.

The "non-technical" part is a label about their history, not their ability. A CFO who vibe-codes two polished mobile apps is doing engineering. A chef who writes data integrations for his restaurant chain is doing engineering. They just didn't go through the traditional door.

Here's how I think about it: **they don't have a new skill set. We just specialized early.** The intelligence and systems thinking was always there. The barrier was the tooling, not the talent.

## New expectations from products

When these builders hit the limits of the software they use, they sound exactly like engineers. I've heard all of these in the last six months:

- "Why can't I access my own data through an API?"
- "If I can see it in the UI, why isn't it in the API?"
- "Why can't I connect app A to app B?"
- "Why can't I edit this data programmatically?"
- "Where's the webhook? Where's the endpoint?"

These aren't engineers complaining. These are veterinarians, marketers, and restaurant owners. And they're asking the exact same questions we've been asking for years.

**Their vendor is no longer software they use. It's a platform they build on.** And when the platform doesn't support that, they start shopping for one that does.

## New problems to solve

Here's the part that surprised me.

**Once you build something that matters, you inherit the problems of people who build things that matter.**

These new builders are running into:

- **Storage decisions.** Files vs. databases. Where does this data live? How do I back it up?
- **Versioning.** "I changed something and it broke. How do I go back?"
- **Environments.** "It works on my machine but not on theirs."
- **Packaging and sharing.** "I built this for me. Now my team wants it. How do I distribute it?"
- **Dev mode vs. prod mode.** "This runs great when I'm testing it. How do I make it always run?"

They're re-deriving the operational side of software engineering from first principles. Not because they read about it, but because building real systems forces these questions on you.

## Four stories from the wild

These aren't hypothetical. These are people I've met in the last year.

### The veterinary practice owner

A friend of mine is a former CFO who now runs a veterinary practice group, three clinics. Sharp, financially minded, deeply competitive.

He vibe-coded two apps for his practices. The goal was radical transparency: show every employee what the practice earns, what it needs to earn, and how they can help close the gap.

The employee-facing mobile app displays salaries of everyone, current revenue, target revenue, the plan to get there, and today's performance. Employees can submit ideas to improve clinic operations. He gamified the whole thing in a Stardew Valley theme, complete with leaderboards, prizes, and discussions around employee-submitted ideas. The executive companion app shows the same data with more granularity.

The UI polish was genuinely surprising. More polished than some of my MVPs after 15 years of building software.

But here's where it gets interesting. To build this, he needed API access to his patient information management system (PIMS) and his other systems of record. Getting an API key was harder than it should have been because he wasn't a "business entity" in the way the vendor expected. And once he got access, the API was incomplete. Data he could see in the UI wasn't exposed via the API. Not even read-only.

He's now considering switching PIMS vendors. Not because the software is bad at managing patients. Because it's bad as a platform.

This is a buyer transforming into a builder. And data access just became a dealbreaker in a market where it never was before.

### The Airbyte builders

At Airbyte, I helped build a system that let people publish, fork, edit, and remix API integrations. The primary goal was straightforward: grow the connector catalog to match the infinite number of APIs out there, let customers pull data from anywhere, and make it so that if a connector breaks at 2 AM, the customer who notices can fix it themselves.

The timing was interesting. AI agents were just emerging, and we bolted on an AI assistant to help users write integrations in a friendlier interface. Internally, there was a real debate: "What is the lowest barrier of technical ability we're willing to support?" Engineers were skeptical that non-technical users would actually operate in this part of the product.

They were wrong.

After release, we found non-technical users writing real integrations. A chef who owned a chain of restaurants built integrations to pull data from his POS system. Sales reps authored connectors to pull data from CSVs and obscure internal tools. People who had never written code were building and publishing integrations that other customers used.

**The supply of builders is larger than engineers think.** These people didn't lack ability. They lacked affordances. Once the barrier dropped, they showed up.

### The dentist next door

My neighbor is a dentist in a small town in Canada. Sharp, competitive, runs an extremely profitable clinic.

One evening he walked me through a system he'd built. In a back room: an array of 3D printers. He'd engineered his own pipeline for same-day crowns. Scan the patient's teeth, 3D print the crown, fit it the same appointment. No more "scan, send to a specialist, wait for the crown, come back for a second visit."

The system was legitimately impressive. Integrations between multiple software packages. Calibration cubes to ensure printer accuracy. Documented processes. A long list of satisfied patients and high throughput.

He's not a software engineer. He's a dentist who thinks like an engineer. **There are polymaths hidden in plain sight.** When tooling makes complex systems approachable, "engineering" expands well beyond people with the title.

### The content operating system

Through GrowthX.ai, I work with some of the best marketing talent at the frontier of AI and content. One of them, a CEO and former CMO, showed me his personal "content operating system."

It was a system for him to produce any piece of content he needed. Investor decks, emails, handbooks, blog posts. All cobbled together from custom scripts, claude code, a GitHub repo, and a folder structure full of markdown files. But functionally, it was a data processing pipeline. Inputs: meeting transcripts, blog posts, company profiles, contacts. Outputs: summaries, writing guides, personas, themes. Further refinements through what he called "skills," markdown files used by AI agents to transform artifacts through multiple stages.

The result: he can one-shot content in his voice and brand style, repeatedly, with consistent outputs and minimal drift.

He'd built text-engineering. A pipeline made of markdown and agents. And without knowing it, he'd re-derived data engineering best practices: idempotent transformations, staged processing, version-controlled configurations.

**Engineering is becoming an interface.** People discover best practices not because they studied them, but because real systems require them.

## What this means

I want to be honest about the limits of what I'm claiming here. This is a pattern, not a statistic. I'm working from anecdotes, not a dataset.

But consider the sample. In a small town in Canada and a relatively small professional network, I found a CFO building mobile apps, a dentist running a 3D printing pipeline, a chef writing data integrations, sales reps authoring connectors, and a marketer building a text-processing pipeline in markdown.

**If I can find this many in a small radius, they're everywhere.**

And their expectations will reshape software products. APIs, integrations, composability, data access, the operational scaffolding that makes building safe and shareable. These aren't features for developers anymore. They're features for anyone who builds. And the number of people who build is about to get much, much larger.

I don't know the magnitude yet. But I'd bet this shift reshapes software nearly as much as LLMs themselves. Not because it changes what software can do, but because it changes who uses it and what they demand from it.

The polymath nextdoor is here. And they're going to want an API key.

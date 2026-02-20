---
title: "The 12-Factor Process"
description: "Engineers don't make products anymore. They make product factories. Here are 12 factors for engineering teams built around that shift."
date: "2026-02-12"
categories:
  - Technology
  - Software Engineering
  - AI
  - Engineering Management
published: true
---

Engineers don't make products anymore. They make product factories.

That's not a metaphor. The job used to be: understand the requirement, write the code, ship the feature. Now it's: build the system that lets agents write the code, validate it, deploy it, and iterate on it. The engineer's output isn't the product. It's the infrastructure that produces the product.

## What changed

AI coding agents went from novelty to default. Andrej Karpathy [put it bluntly](https://12factorprocess.com/): "I rapidly went from 80% manual coding to 80% agent coding. This is easily the biggest change to my basic coding workflow in two decades."

The shift isn't incremental. Teams of 3 are shipping what used to take teams of 20. Major features that took six months now take six hours. Small changes land in 30 minutes.

## What that means

If agents do most of the coding, then the engineer's job isn't writing code. It's designing the environment where agents write good code. Standards, validation, deployment pipelines, shared context, accessible data. **The process becomes the product.**

Old-world engineering process was designed around humans coordinating with humans. Standups, sprint planning, code review bottlenecks, approval gates. That process assumes the bottleneck is human throughput. It's not anymore.

## The 12 factors

I wrote [The 12-Factor Process](https://12factorprocess.com/) as an infrastructure playbook for this shift. Twelve patterns that let small teams operate at this new speed without losing quality or control.

1. **Preview Everything.** Every change deploys to its own environment before merge.
2. **Shared Validation.** CI/CD, agent hooks, and pre-commit hooks all run the same pipelines.
3. **Democratize PRs.** Everyone on the team can create pull requests, not just engineers.
4. **Async Agents.** Coding agents run remote, in the cloud, in parallel.
5. **Codified Standards.** Design systems, code style, and architecture are written down and available to agents.
6. **Shared Agent Context.** Agent rules, plugins, and prompts are versioned and shared across the team.
7. **Agents in Every Conversation.** Agents available in meetings, Slack, email, ready to act.
8. **Unified Dev Environment.** Agents and developers work in the same coding environment.
9. **Show Don't Tell.** Put ideas in code, get them in front of customers, walk back rapidly if wrong.
10. **Data Accessible.** All system data accessible in very few API calls, available to all agents.
11. **Small Pods.** One domain expert plus 1-2 engineers, no more.
12. **Complexity-Based Process.** Low-complexity changes merge automatically with no sign-off.

The full site has more detail on each factor. [Check it out here.](https://12factorprocess.com/)

The old playbook optimized for human coordination. This one optimizes for human-agent collaboration. The teams that adopt these patterns early won't just move faster. They'll be structurally different from the teams that don't.

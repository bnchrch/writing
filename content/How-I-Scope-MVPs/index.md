---
title: "Continents, Islands, and MVPs"
description: "A structured approach to defining features from vision to implementation"
date: "2024-10-26"
published: true
slug: "continents-and-islands"
categories:
  - Product Development
  - Project Management
tags:
  - mvp
  - product management
  - feature development
  - scope
---

# The Continent-to-Island Approach to MVPs

## How I Scope MVPs

When scoping a new feature, I've found it incredibly useful to start with the full vision—what I call the "Continent"—before scaling back to the first achievable "Island." This approach ensures everyone understands where we're ultimately heading, even if we're only building a small piece right now.

## 📚 Define Your Taxonomy First

Before diving into user stories or the product vision, I establish a clear taxonomy that defines:

- User personas (who will use this feature and what's their technical background?)
- Key terms (what do specific terms mean in this context?)

This shared vocabulary prevents misunderstandings and keeps discussions focused. It's critical to pause here and ensure everyone agrees on these definitions before proceeding.

For example, when scoping a publishing feature, I might define:

- **Regular User**: A customer with limited technical knowledge who needs simple, guided experiences
- **Power User**: A technically-savvy customer who wants flexibility and control
- **Team Member**: An internal employee responsible for reviewing and supporting customer work

Getting alignment on these definitions first prevents downstream confusion when discussing features for different user types.

## 📖 User Stories Drive Development

Once taxonomy is agreed upon, I structure both the Continent and Island sections around user stories. This keeps the focus on user needs rather than technical implementations. Each story follows the format:

"As a [user type], I want to [action] so that [benefit]."

It's crucial to get agreement on these user stories before expanding into the full vision. When everyone understands who we're building for and what they need, the vision discussions become much more productive and less susceptible to bikeshedding.

## 🌍 Start With Your Continent

Only after aligning on taxonomy and core user stories do I outline the Continent—the long-term product direction. It's crucial to document this vision, even though you won't build most of it immediately. This creates alignment on the destination, allowing your team to make better decisions about what to prioritize now.

For the Continent, I include all the capabilities users might eventually need: comprehensive workflows, integrations, advanced features, and edge cases.

By starting with this complete picture and getting explicit agreement that it's directionally correct, we can see how all the pieces might eventually fit together. This prevents us from building dead-end features that won't scale with our vision.

## 🏝️ Find Your First Island

After defining and agreeing on the Continent, I identify the smallest subset that delivers real value—the first Island. This is your MVP.

I explicitly mark which user stories from the Continent are included and which are deferred, making the scope crystal clear. For example:

1. ~~As a user I want to fork existing resources~~ *(deferred)*
2. As a user I want to publish my work to share with others
3. As a user I want to resubmit my work after receiving feedback

The key is finding the balance between minimal scope and meaningful value. Your Island should be small enough to build quickly but substantial enough to validate your direction.

Again, I pause for explicit agreement that this is tactically correct before proceeding to technical implementation.

## 🔍 Technical Implementation Follows Vision

Only after aligning on the vision and MVP do we discuss technical implementation. This ensures the architecture supports both immediate needs and future direction.

The technical plan outlines:
1. High-level system changes
2. Specific implementation details
3. Alternative solutions considered

This approach prevents us from building dead-end technical solutions that might need to be completely reworked later. A final review ensures this implementation is technically correct.

## 🤔 Why This Works

This approach has several advantages:
1. Everyone understands the long-term vision
2. Stakeholders can see what was considered but deferred
3. Technical decisions support future growth
4. The MVP scope is clear and agreed upon
5. The review process is structured and explicit

By clearly separating the vision from the immediate implementation—and getting explicit agreement at each step—we avoid both scope creep and short-sighted decisions.

## 📝 Template for Scoping MVPs

Below is a template based on this approach that you can adapt for your own features:

```markdown
# [TECH SPEC] Feature Name

# The Goal

Define:
1. MVP of the feature
2. How it should be built
3. When it can be expected

# How we get there

1. 🌍 We describe a **Continent** version (vision) of the feature
    - Agree this is **Directionally correct**
2. 🏝️ We cut it back to the **first island we land on** version (MVP)
    - Agree this is **Tactically Correct**
3. 👷‍♀️ We look at its **component parts**, and how they should be **implemented**
    - We agree this is **Technically Correct**
4. 🔍 We **scope** out the **size** of these tasks
    - We agree on **time commitments**

## Context

### Taxonomy

**User Type 1**
Description of this user type and their needs/capabilities

**User Type 2**
Description of this user type and their needs/capabilities

**Key Term**
Definition of important terminology

# Continent (Long Term Product Direction)

> Remember! **This is not the proposal**, just the vision behind it. Small UI decisions do not matter here, general direction does.

## User Stories

### Primary
1. As a **User Type 1** I want to **do action 1** so that **benefit**
2. As a **User Type 1** I want to **do action 2** so that **benefit**
3. As a **User Type 2** I want to **do action 3** so that **benefit**
...

### Tertiary
1. Additional less critical user stories

### Excluded
1. Explicitly note what is out of scope even long-term

## How it should work

**Component 1**
1. Description of how this component should work
2. Key interactions and behaviors

**Component 2**
1. Description of how this component should work
2. Key interactions and behaviors

## 🛑 Review Time!

Long Term alignment: Does this **directionally** make sense?

---

# Island (MVP)

> Time to trim this back to an **MVP**

## User Stories

1. ~~As a User Type 1 I want to do action 1~~ *(deferred)*
2. As a User Type 1 I want to do action 2
3. As a User Type 2 I want to do action 3
...

## How it should work

**Component 1**
1. Simplified description of MVP functionality
2. Key interactions and behaviors for MVP

**Component 2**
1. Simplified description of MVP functionality
2. Key interactions and behaviors for MVP

## 🛑 Review Time!

Medium Term alignment:
- Does this Tactically make sense?
- Is this the smallest amount we can release while still providing value?

---

# MVP Tech Spec

> This is where we define the **how**

## High Level

*High-level diagram of system components*

To achieve this we should modify the systems in the following way:

### System Change 1
1. Technical details of implementation
2. APIs and data flow

### System Change 2
1. Technical details of implementation
2. APIs and data flow

## Alternative Solutions Considered

- **Option 1**
  - Description of alternative approach
  - Pros and cons

- **Option 2**
  - Description of alternative approach
  - Pros and cons

## 🛑 Review Time!

System Alignment:
- Does this Technically make sense?
- Is there something we're missing?
- Is there a higher quality way to do this?
- Is there a faster way to do this?

# Next Step Planning

## Stakeholder Needs
1. Required input from stakeholders
2. Design requirements

## Breakdown Tasks
*Table or list of specific implementation tasks with estimates*
```
---
title: "Mental Models for Simpler Code"
description: "Functional programming ideas that help reduce cognitive load and make systems easier to understand."
date: "2025-04-22"
published: true
slug: "mental-models-for-simpler-code"
tags:
  - programming
  - functional programming
  - mental models
  - software design
---

# Mental Models for Simpler Code

> You can't always satisfy these, but you can try.

These are ideas I reach for to keep my codebase from descending into a spaghetti-soaked nightmare. They're not rules --- they're guardrails.

## Insights

### Everything is a List

Everything is a list, or an operation on a list. And if you zoom out far enough --- **everything is a graph**: a series of **nodes** and **edges between them**.

This mental model lets you:

-   Avoid tangled state transitions
-   Frame logic as map/filter/reduce over inputs
-   Compose transforms cleanly
-   Provide a structure where each individual node is easy to understand, test, and reason about
-   Provide a structure where each individual edge is easy to debug
-   Provide a structure where the system as a whole is easy to move, change, and evolve


### Systems Are Just Transformations

Complex systems become easier to understand when you think of them as **data transformations**.

Modeling out the types and transforms between them is a **powerful** tool to both understand existing systems and design new ones.

It can cut through a lot of the architecture noise (services, factories, k8s workers, etc.) and make it easier to see the signal.

And not so coincidentally, systems that lean into transformations as first-class citizens are incredibly powerful.

Haskell's Servant library is a great example of this:

https://docs.servant.dev/en/stable/tutorial/ApiType.html

Where your API, including the controllers, models, handlers, middleware, and everything else, is just a type.

Disclaimer: I'm not a fan of Haskell, and warn anyone considering it for anything other than a research paper.


## Principles

### Minimize Cognitive Load

At the heart of all good code is this simple idea: **reduce the amount of information someone needs to understand at any given time**.

**Best tools for that?**

-   Pure functions
-   Immutable state
-   Avoiding side effects
-   And please dear god don't use classes and inheritance

#### Example

**Good**
No hidden state, no side effects, no classes, no inheritance.
```typescript
type Config = {
  token: string;
  baseUrl: string;
};

async function fetchUser(config: Config, userId: string) {
  const res = await fetch(`${config.baseUrl}/users/${userId}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  return res.json();
}

// Usage
const config = { token: "abc123", baseUrl: "https://api.example.com" };
const user = await fetchUser(config, "42");
```

**Bad**

Has hidden state, side effects, classes, and inheritance.

Making it hard to reason about what happens and when.
```typescript
class UserService {
  private token: string;
  private baseUrl: string;
  private userId: string;
  constructor(token: string, baseUrl: string, userId: string) {
    this.token = token;
    this.baseUrl = baseUrl;
    this.userId = userId;
  }

  async fetchUser() {
    const res = await fetch(`${this.baseUrl}/users/${this.userId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return res.json();
  }
}

// Usage
const service = new UserService("abc123", "https://api.example.com", "42");
const user = await service.fetchUser();
```

### Communication First

All problems in software are communication problems. Between people. Between now-you and future-you.

Your code should:

-   Be **readable** by someone unfamiliar with the system
-   Be **skimable** by someone who just wants to trace a bug
-   Use **small functions** that do one thing
-   Flow **linearly**, so the reader doesn't jump around
-   Include **pattern-matching** to reduce ambiguity

**Comments** are still useful --- not to explain what a line of code does, but to explain why it exists.

### Composability is Future-Proofing

All code will eventually become legacy code.

You won't get the abstraction right the first time. Composability means you don't have to:

-   You can **rewrite** pieces without breaking the whole
-   You can **swap** out modules as your mental model improves
-   You can **test** small parts in isolation, giving confidence to refactor later

This is why reusable transforms and decoupled flows matter.

### Local Over Global

Every time you reach for a global variable, a singleton, or a shared mutable object, you're increasing the amount of context someone needs to understand the system.

Instead:

-   Pass what you need
-   Return values clearly
-   Treat state as data, not as behavior

### Quarantine the Hacks

If you're writing something that shouldn't exist in a perfect world, isolate it. Document it. Track it.

Create a `/hacks` folder. Example:

```typescript
/**
 * @problem
 * Cloudflare worker deployments perform an immediate health check against newly created
 * subdomains, but DNS propagation takes time. This causes deployments to fail even when
 * the service is working correctly.
 *
 * @hack
 * Implement a retry mechanism that waits for DNS to propagate before continuing with
 * the deployment process. This gives DNS time to update across the network.
 *
 * @removalCriteria
 * This hack can be removed when either:
 * 1. Cloudflare updates their deployment process to account for DNS propagation time
 * 2. We implement a deployment pipeline that verifies DNS before triggering health checks
 *
 * @metadata
 * First Encountered: 2024-11-01
 * Created By: jliu
 * Related Issue: https://github.com/org/project/issues/5412
 */
export const waitForDnsPropagation = async (domain: string): Promise<void> => {
  const retries = 5
  for (let i = 0; i < retries; i++) {
    const isResolved = await dnsCheck(domain)
    if (isResolved) return
    await sleep(5000)
  }
  throw new Error(`DNS for ${domain} did not propagate in time`)
}
```

Use it like:

```typescript
import * as HACKS from "../hacks/waitForDnsPropagation"

await HACKS.waitForDnsPropagation("preview.api.example.com")
```

This makes the tech debt:

-   Traceable
-   Contained
-   Testable
-   Obvious at the callsite

### Use Familiar Concepts

Shared understanding is more important than theoretical purity.

-   Use `.env` files --- people expect them
-   Name the entry file `README.md` --- don't get cute
-   Stick to conventional structures unless there's a good reason

Your system should feel obvious to someone who's seen something like it before. If you have to explain your choices constantly, they may not be working.


## Final Thought

Good code is clear code. Clear to read, clear to trace, clear to delete.

The mental models above aren't about perfection --- they're about making better trade-offs, faster. They give you leverage:

-   In your design decisions
-   In your abstractions
-   In how you scale systems and teams

They're how you keep complexity from turning into chaos.
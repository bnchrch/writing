---
title: "Mental Models for Programming"
description: "A comprehensive guide to mental models in software development, from code to business context"
date: "2023-05-19"
published: true
slug: "mental-models-for-programming"
tags:
  - programming
  - mental models
  - software design
  - best practices
---

Mental Models for Programming
=============================

Ok so I think theres levels to mental models in software system.

***Important Note:* ***I listed these from smallest area of concern to largest. However when starting a new system or extending an existing system the most useful is to walk these levels backwards. From 4 to 1, or better said,* ***why to what to how****.*

Level 1: My program
-------------------

The lowest level ones tend to be about "How do I write maintainable code inside my own programming paradigm?"

For me when it comes to object orientated programming I tend to reach for the components of SOLID: <https://realpython.com/solid-principles-python/>

Level 2: All programs
---------------------

The next level up is: How do I write maintainable code inside any paradigm? or inside a team of programmers.

-   [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)
-   [Rule of least power](https://en.wikipedia.org/wiki/Rule_of_least_power)
-   [Composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
-   [Event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture)
-   [declarative vs imperitive programming](https://dev.to/ruizb/declarative-vs-imperative-4a7l)
-   Self documenting code (small, well named functions)
-   [Explicit is better than implicit](https://shopify.engineering/building-mental-models#Explicit)
-   [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)

Now at this level is where you will often find me trying to inject some ideas from a functional programming lens.

To that end feel free to take a look at[**Mental Models for Simpler Code**](/mental-models-for-simpler-code)


Level 3: Personal and Peer (anti-)habits
----------------------------------------

Programmers (often) overlap in personality traits and set of habits. Not all of them are perfect and some of them are counter to their own goals or the goals of the system

This is where principles like these come in

-   [You arent going to need it](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
-   [Keep it simple, stupid!](https://en.wikipedia.org/wiki/KISS_principle)
-   [Worse is better](https://en.wikipedia.org/wiki/Worse_is_better)
-   If used too early [DRY code is an antipattern](https://dev.to/jeroendedauw/the-fallacy-of-dry)
-   [via negativa](https://fronterablog.com/via-negativa-solution-through-subtraction) (solve by subtraction)

Level 4: User and Business Context
----------------------------------

At this level were just thinking about whos using our software, or is benefiting from it, and whats the goal

It can be great during the design phase of a new system or feature to think hard about this.

[**Socratic Questioning**](https://doubleyourfreelancing.com/socratically-question-new-project-leads/) can be really useful for when you first talk to people who might use a system to **understand their needs**

I find things like [**User stories**](https://en.wikipedia.org/wiki/User_story) helpful for **enumerating the use cases I should plan for**.

*(Note: At this point if there are more user stories than atoms in the universe, that can be a sign that your users need a more powerful abstraction. Perhaps you can no longer be prescriptive with your interface but instead have to expose more composable primitives to the power user. e.g. The difference between* [*Typeform*](https://www.typeform.com/) *vs Excel,* [*pagespeed*](https://pagespeed.web.dev/) *vs* [*pupeteer*](https://pptr.dev/)*, squarespace vs webflow.)*

Afterwards [**Minimum viable product**](https://en.wikipedia.org/wiki/Minimum_viable_product) is great **for ranking whats important to work on first** and when can I consider it ready for feedback and early use.

**When designing interfaces** (UI, CLI, config file, etc..) its really helpful to ask "[**What mental models do my users already have?**](https://careerfoundry.com/en/blog/ux-design/mental-models-ux-design/)"

This is often a UX/UI question. But is just as important in software interfaces. The purpose is to identify what a user may already know and leverage that to make interfaces you dont have to explain to them. Which makes the product feel intuitive and easy to use.

i.e. Dont use a new language unless you have to, dont deviate from the expected by calling your README file view.txt, or if you declare docker images via something other than dockerfiles there better be a good reason :stuck_out_tongue:

And finally just **asking how does this impact the business**? why are we doing this? what are our motivations? How does this make us money? These question can be really clarifying and lead to unexpected, counterintuitive but important insights. **These are often the best questions to start with**.

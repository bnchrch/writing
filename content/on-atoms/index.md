---
title: "On Atoms"
description: "A note to my daughter about physics, and mostly about how to learn: find the small truths that let you rebuild everything else."
date: "2026-06-08"
categories:
  - Life
  - Mental Models
published: true
---

*This started as a note to my daughter. Which means it is partly about physics. But mostly about how to learn.*

* * *

Hey Darling,

Your young old man here again.

Or, depending on when you read this, maybe just your old old man.

Today I want to talk to you about my favourite formula:

```text
E_start = E_end
```

The conservation of energy.

Not because I prefer being sloth-like, or because I love shortcuts.

Though, to be fair, both are true.

But because it was my first favourite **atom of knowledge**.

And I think atoms are one of the most important things you can learn to look for.

## What I mean by atoms

An **atom of knowledge** is a small truth that helps you derive bigger truths.

Atoms matter because they reduce the number of things you need to simply “remember.”

Knowledge works a bit like chemistry:

| Level | Meaning |
|---|---|
| **Atoms** | Simple truths |
| **Molecules** | Combinations of those truths |
| **Structures** | Bigger systems built from those combinations |

In physics, a few atoms might be:

| Atom | Idea | Formula |
|---|---|---|
| A | Energy is conserved | `E_start = E_end` |
| B | Height stores energy | `PE = mgh` |
| C | Motion stores energy | `KE = 1/2mv²` |
| D | Springs store energy | `SE = 1/2kx²` |

On their own, each atom is useful.

But when you combine them, they become molecules of understanding.

## Molecule 1: height becomes speed

Take a roller coaster rolling down a hill, a skier going down a slope, a ball falling from a window, or a pendulum swinging downward.

At first, those look like different problems. But underneath, they are often the same molecule:

> **Conservation of energy + height energy + motion energy**

Or:

```text
A + B + C
```

The elegant version is:

```text
mgh = 1/2mv²
```

Height energy becomes movement energy.

Mass is on both sides, so it cancels:

```text
gh = 1/2v²
```

So:

```text
v = √(2gh)
```

That is the shortcut.

You do not need to know:

- the shape of the hill
- how long the fall took
- how heavy the object is
- the exact path it travelled

If you know the height, you can find the speed.

But if you do not understand the atom underneath, you might solve it the ugly way:

```text
F = mg sinθ
F = ma
a = g sinθ
s = h / sinθ
v² = u² + 2as
v² = 2(g sinθ)(h / sinθ)
v = √(2gh)
```

Same answer.

Much uglier road.

The ugly version carries around:

- forces
- angles
- acceleration
- distance
- motion equations
- trigonometry
- substitution
- cancellation

And after all that, you discover the angle never mattered.

The path never mattered.

The time never mattered.

Only the **change in height** mattered.

That is what an atom of knowledge does.

It helps you see the thing that matters sooner.

## Molecule 2: spring becomes speed

Another molecule might be:

```text
A + C + D
```

That is a spring launching a toy car.

The elegant version is:

```text
1/2kx² = 1/2mv²
v = x√(k/m)
```

Spring energy becomes movement energy.

Simple.

Beautiful.

The ugly way is to track the spring’s force at every tiny moment:

```text
F = kx
F = ma
a = kx / m
```

But `x` keeps changing as the spring expands.

So the force changes. Which means acceleration changes. Which means velocity changes. Which means position changes. Which means the force changes again.

Now you are stuck describing a system where force, position, acceleration, and velocity are all changing together.

Not impossible.

Just messier.

The energy version says:

> I do not need to know every tiny moment.  
> I just need to know what energy was stored at the start, and where it went by the end.

Spring energy became motion.

Done.

## Same truth, different costume

A roller coaster. A falling ball. A skier. A pendulum. A ramp.

They look like different problems, but often they are the same molecule wearing different costumes.

The useful questions are:

- **What energy exists at the beginning?**
- **What energy exists at the end?**
- **What changed form?**
- **What stayed the same?**

Before I understood this, physics felt like memorizing separate formulas for roller coasters, ramps, falling objects, pendulums, and spring launchers.

But conservation of energy showed me that many of those formulas were not separate things.

They were combinations.

Molecules made from the same atoms.

And if I understood the atoms, I could rebuild the molecules.

That was the breakthrough.

Not that I had learned a trick.

That I had learned what **understanding** feels like.

It feels like carrying less.

## This is not just physics

This is true almost everywhere.

So as you grow up, I hope you do not worry too much about whether you are a “math person,” a “science person,” a “creative person,” or a “people person.”

Those categories are mostly fake.

What matters is learning how to find the atoms in whatever world you are drawn to.

## If you love design

At first, design can look like taste.

One room feels beautiful. One outfit looks right. One website feels clean. One painting feels balanced.

But design has atoms too:

| Atom | What it does | Some laws / patterns it relates to |
|---|---|---|
| **Colour** | Sets the emotional temperature | Complementary colours, analogous colours, colour temperature, saturation, contrast ratios |
| **Contrast** | Tells the eye where to look | Figure-ground, visual weight, emphasis, accessibility contrast |
| **Proportion** | Makes things feel balanced or tense | Golden ratio, rule of thirds, scale, symmetry, negative space |
| **Hierarchy** | Decides what matters first, second, and third | Gestalt grouping, typography scale, spacing systems, information architecture |
| **Repetition** | Makes things feel intentional | Rhythm, pattern, consistency, design systems |
| **Alignment** | Makes things feel orderly | Grid systems, baseline grids, visual axes |
| **Proximity** | Shows what belongs together | Gestalt proximity, grouping, chunking |
| **Whitespace** | Gives ideas room to breathe | Negative space, simplicity, focus, signal-to-noise |

Once you understand those atoms, design stops being **“make it pretty”** and becomes:

- What should someone notice first?
- What should they feel?
- What belongs together?
- What needs breathing room?
- What pattern should repeat?
- What should stand apart?

Posters, rooms, paintings, apps, books, buildings.

Different molecules.

Same atoms.

## If you love programming

The atoms might be:

| Atom | Meaning |
|---|---|
| **State** | What something is right now |
| **Transformation** | How it changes |

A light switch has state: on or off.

A bank account has state: how much money is in it.

A game has state: where the player is, how much health they have, what level they are on.

A program is often just state being transformed:

```text
name = "Paige"
name = name.toUpperCase()
```

The state changed from:

```text
"Paige"
```

to:

```text
"PAIGE"
```

Tiny example.

Huge idea.

| Program | State | Transformation |
|---|---|---|
| Photo app | Pixels | Filters, crops, edits |
| Calendar app | Dates and events | Schedules, reminders, conflicts |
| Banking app | Transactions | Balances, categories, reports |
| Map app | Location and destination | Routes, timing, directions |
| Game | Player, world, rules | Movement, damage, progress |

Once you see that, programming stops being a giant pile of languages, frameworks, libraries, and strange punctuation.

It becomes:

- What is the state?
- How should it change?
- What rules control the change?
- What happens next?

Different programs.

Same atoms.

## If you love people

People can seem mysterious.

They say one thing and mean another. They resist good advice. They get defensive when you are technically right. They change their minds slowly, then all at once.

But people have atoms too.

Especially in friendship, sales, leadership, marriage, parenting, and conflict.

| Atom | What it means | Useful question |
|---|---|---|
| **Attention** | People want to feel seen, not processed | What are they trying to have noticed? |
| **Status** | People protect their sense of importance | Am I raising or lowering their status? |
| **Dignity** | People resist less when they can keep self-respect | Can they change their mind without feeling stupid? |
| **Incentive** | Behaviour follows wants, fears, hopes, and pressures | What do they gain, lose, fear, or need? |
| **Trust** | Trust is repeated evidence | Have my words and actions kept matching? |
| **Autonomy** | People want to feel they are choosing, not being forced | Do they still feel in control? |
| **Reciprocity** | People feel pulled to return genuine value | What can I give before I ask? |
| **Emotion** | People need to feel safe before they can think clearly | What emotional state are they in? |
| **Narrative** | People understand through stories, not facts alone | What story are they living inside? |

Once you understand those atoms, a lot of little people-rules become easier to derive.

You do not need to memorize every ceremony.

You can understand the law underneath it.

| Molecule | Atoms inside it | What it really does |
|---|---|---|
| **Bring a thoughtful gift to a prospect** | Reciprocity + attention | Gives value before asking for value |
| **Send a useful insight before the meeting** | Reciprocity + trust | Proves you can help before you sell |
| **Open with research about them** | Attention + status | Makes them feel like a person, not a lead |
| **Use their words back to them** | Attention + trust | Shows you actually listened |
| **Ask permission before giving advice** | Autonomy + dignity | Lowers defensiveness |
| **Disagree by first proving you understand** | Attention + dignity | Makes disagreement feel respectful |
| **Give them a graceful out** | Dignity + autonomy | Lets them change course without feeling trapped |
| **Make your champion look smart** | Status + incentive + reciprocity | Helps them win inside their own tribe |
| **Tell a story about someone like them** | Narrative + social proof | Makes the idea feel familiar and less risky |
| **Send a crisp recap** | Trust + attention | Proves you listened and creates shared memory |
| **Admit what your product cannot do** | Trust + authority | Builds credibility by not overreaching |
| **Make the next step tiny and obvious** | Autonomy + trust | Lowers friction |

The trick is not **“bring a gift.”**

The atom is **reciprocity**.

The gift is just one molecule that falls out of it. And a gift does not have to be wine or swag. It can be a useful introduction, a thoughtful question, a benchmark, a teardown, or an idea they can use even if they never buy.

The trick is not **“repeat their point back before disagreeing.”**

The atoms are **attention** and **dignity**.

People do not always need to win. But they usually need to feel heard. If they feel ignored, embarrassed, or cornered, they defend. If they feel understood, they can think.

That is why good sales and good leadership are not really about tricks.

They are about understanding people clearly enough to act with care.

A prospect is a person trying not to waste money, lose status, back the wrong idea, annoy their boss, disappoint their team, or create more work for themselves.

A teammate is a person trying to do good work, be respected, avoid embarrassment, grow, belong, and feel that their effort matters.

Once you see the atoms, the molecules become easier:

- **Listening** is attention + dignity.
- **Leadership** is trust + direction + status.
- **Persuasion** is incentive + dignity + timing.
- **Friendship** is attention + trust + reciprocity.
- **Repair** is dignity + responsibility + changed behaviour.
- **Love** is attention + trust + repeated care.

Again and again, the work is the same:

> See people clearly.  
> Protect their dignity.  
> Understand what they want.  
> Earn their trust.  
> Give before you ask.

That is not manipulation.

That is care with eyes open.

## If you love biology

A living thing is not just a pile of parts.

It is a system trying to stay alive.

The atoms might be:

| Atom | Meaning | Useful question |
|---|---|---|
| **Energy** | Every living thing needs fuel | How does it get, store, and use energy? |
| **Information** | Bodies carry instructions | What information is copied, read, passed along, or changed? |
| **Structure** | Shape and function are connected | Why is this shaped this way? |
| **Adaptation** | Traits solve survival problems | What problem did this help solve? |

A few examples:

| Example | Atom underneath |
|---|---|
| Plants capture sunlight | Energy |
| DNA gives cells instructions | Information |
| Wings are shaped for flight | Structure |
| Cacti store water | Adaptation |
| Polar bears have thick insulation | Adaptation |
| Babies cry before they have words | Adaptation + communication |

Once you understand those atoms, biology becomes less like memorizing endless names and more like asking better questions.

Different organisms.

Same atoms.

## The lesson underneath the lesson

Whatever you love, look for the atoms.

| Field | Some atoms to look for |
|---|---|
| **Design** | Colour, contrast, proportion, hierarchy, repetition, alignment, proximity, whitespace |
| **Programming** | State, transformation |
| **People** | Attention, status, dignity, incentive, trust, autonomy, reciprocity, emotion, narrative |
| **Biology** | Energy, information, structure, adaptation |
| **Physics** | Conservation, force, motion, energy |

The subject almost does not matter.

The pattern is the same.

Do not just collect the leaves.

Find the roots.

Do not just memorize the molecules.

Find the atoms.

Because once you understand the atoms, the world becomes less overwhelming.

You can rebuild what you forget.

You can recognize the same truth in a new costume.

You can walk into a strange field and start asking useful questions.

And that is one of the most powerful feelings in the world.

Not knowing everything.

Knowing how to begin.

* * *

That is why conservation of energy became my favourite formula.

Not because it made me good at physics.

Though it helped.

But because it taught me what understanding feels like.

It feels like the world getting lighter.

It feels like a messy problem becoming simple.

It feels like realizing that a hundred things you thought were different were actually connected all along.

And that, my darling, is one of the great joys of learning.

Not memorizing everything.

Finding the little truths that help you understand almost anything.

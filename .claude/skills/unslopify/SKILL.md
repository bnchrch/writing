---
name: unslopify
description: Remove AI slop and corporate jargon from text without applying a personal voice. Use when the user asks to "unslopify", "remove AI slop", "deslopify", "clean up AI writing", "remove AI patterns", "make this less AI", or needs AI-generated text cleaned of typical AI writing patterns.
allowed-tools: Read, Glob, Grep
---

# Unslopify

Remove AI slop and corporate jargon from text. Make it sound like a human wrote it — but not necessarily like *Ben* wrote it. For Ben's voice specifically, use `/benify`.

## Process

1. **Load the anti-patterns reference.** Read `.claude/skills/guide/references/nonos.md` from this project.

2. **Read the input.** The user will provide text inline, as a file path, or as `$ARGUMENTS`.

3. **Identify all slop patterns.** Scan the text for every category from nonos.md:
   - AI slop phrases (throat-clearing, filler transitions, empty conclusions, weasel phrases)
   - Corporate speak (leverage, utilize, synergy, etc.)
   - Performative enthusiasm (forced exclamation, adjective stacking)
   - Excessive hedging (unnecessary qualifiers undermining authority)
   - Structural tells (suspiciously parallel lists, summary-that-restates-intro)

4. **Rewrite affected sections.** For each identified pattern:
   - Replace with direct, clear language that preserves the original meaning
   - Cut phrases that add no meaning (most throat-clearing can simply be deleted)
   - Simplify corporate jargon to plain English
   - Reduce hedging to appropriate confidence levels
   - Break up template-feeling structure into natural variation

5. **Verify no new slop was introduced.** Rewriting to avoid AI patterns sometimes introduces different AI patterns. Check the output against nonos.md again.

6. **Present the result.** Output:
   - The full cleaned text
   - A bulleted list of what was changed and why (grouped by category)

## Rules

- **Preserve the original meaning.** Unslopify is cleanup, not rewriting. The ideas should remain intact.
- **Preserve the original structure** unless the structure itself is the problem (e.g., forced 5-point lists).
- **Don't inject personality.** This skill produces clean, neutral, human-sounding text. No voice transformation.
- **Don't over-correct.** Not every list is AI slop. Not every exclamation mark is performative. Use judgment.
- **When in doubt, cut.** If a phrase adds no meaning, remove it rather than trying to improve it.

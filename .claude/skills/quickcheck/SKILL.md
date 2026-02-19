---
name: quickcheck
description: Fast single-pass writing review against Ben Church's writing standards. Use when the user asks to "quickcheck", "quick review", "fast check", "quick edit", "scan my writing", or needs a fast assessment of writing quality without a deep multi-agent analysis.
allowed-tools: Read, Glob, Grep
---

# Quickcheck

Fast, single-pass writing review. No subagents. Returns a brief, actionable assessment.

## Process

1. **Load key references.** Read:
   - `.claude/skills/guide/references/writing-like-ben.md`
   - `.claude/skills/guide/references/nonos.md`

2. **Read the target.** The user will provide text inline or as a file path via `$ARGUMENTS`.

3. **Single-pass assessment.** Scan the text once, checking:

   **Voice consistency** — Does it sound like Ben? Is it conversational and direct? Or does it read like a different writer?

   **Slop presence** — Any AI slop phrases, corporate speak, performative enthusiasm, or excessive hedging from nonos.md?

   **Structure** — Does it follow a logical progression? Are headers useful? Is it scannable? Does the opening hook?

   **Readability** — Sentence length variation? Paragraph length appropriate? Dense walls of text?

   **Frontmatter** (if a blog post) — Valid format? Title, description, date, categories, published fields present?

4. **Return a concise report.** Keep the output under 500 words:

   ```
   ## Overall: [Strong | Good | Needs Work | Off]

   ### Issues (if any)
   - [Most critical issue with specific quote and suggested fix]
   - [Second issue]
   - [Third issue]

   ### Strengths
   - [What's working well]
   - [What's working well]

   ### Recommendation
   [One sentence: publish as-is, do a quick edit, run /benify, or needs a /fullcheck]
   ```

## Rules

- **Be specific.** Quote the problem text. Suggest a concrete fix. "The opening is weak" is useless. "The opening 'In this article we will explore...' should be replaced with a direct statement of the problem" is useful.
- **Prioritize.** Three issues maximum. Focus on what matters most.
- **Be honest but constructive.** If it's good, say so. If it's off, say that too. Don't sugarcoat, but don't be harsh for no reason.
- **Don't rewrite.** This is a review, not a transformation. Point out problems; let the user decide whether to fix them manually or run `/benify`.
- **Fast means fast.** One pass. No loading every reference file. No spawning agents. Quick and useful.

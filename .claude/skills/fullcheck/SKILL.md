---
name: fullcheck
description: Comprehensive multi-agent writing review using the writing-analyser subagent. Use when the user asks to "fullcheck", "full review", "deep review", "comprehensive review", "thorough edit", or needs a detailed analysis of their writing against Ben Church's standards.
allowed-tools: Read, Glob, Grep, Task
---

# Fullcheck

Comprehensive writing review that delegates deep analysis to the `writing-analyser` agent, then synthesizes findings into an actionable report.

## Process

1. **Determine input.** The user will provide text inline, as a file path, or as `$ARGUMENTS`. If it's a file path, read the file to understand its content.

2. **Spawn the writing-analyser agent.** Use the Task tool to launch a subagent:
   - **subagent_type**: `general-purpose`
   - **prompt**: Include the full document text (or file path) and instruct the agent to follow the process defined in `.claude/agents/writing-analyser.md`. Tell it to read that agent file first, then follow its instructions to analyze the provided document.
   - For a single document, spawn 1 agent.
   - For multiple documents, spawn 1 agent per document (max 3-4 in parallel).

3. **Receive analysis.** Wait for the agent to complete and return its structured report.

4. **Synthesize into actionable review.** Compile the agent's findings into a final report:

   ```
   ## Overall Assessment
   [2-3 sentences summarizing quality and key themes]

   ## Critical Issues
   [Issues that must be fixed before publishing. Include exact quote → fix.]

   ## Warnings
   [Issues that should be fixed but aren't blockers. Include quote → fix.]

   ## Suggestions
   [Nice-to-have improvements. Brief descriptions are fine.]

   ## What's Working
   [Genuine strengths worth preserving. Don't skip this section.]
   ```

5. **Offer next steps.** Ask the user:
   - "Want me to apply these fixes?" (which would use the benify approach)
   - "Want me to just fix the critical issues?"
   - "Looks good — ready to publish?"

## Rules

- **Deduplicate across agents.** If multiple agents flag the same issue, report it once with the best example.
- **Prioritize ruthlessly.** Critical issues are things that would make Ben cringe if published. Warnings are suboptimal but not embarrassing. Suggestions are polish.
- **Preserve voice that's already working.** If a section sounds authentically like Ben, say so and don't suggest changes just to seem thorough.
- **Be specific.** Every critical issue and warning needs an exact quote and a concrete fix suggestion.
- **Don't auto-apply.** Present findings and let the user decide what to do.

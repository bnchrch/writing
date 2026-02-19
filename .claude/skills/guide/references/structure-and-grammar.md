# Structure and Grammar

Formatting standards for Ben Church's blog.

## Language

- **US English**: color, organize, favorite, analyze (not colour, organise, favourite, analyse)
- **Contractions encouraged**: it's, don't, won't, can't, we're, they're. Ben writes conversationally; uncontracted forms sound stiff in his voice.
- **Oxford comma**: always. "Load balancing, A/B Testing, and Caching."

## Punctuation

- **No em dashes.** Do not use em dashes (—). Use commas, periods, colons, or parentheses instead. Restructure sentences if needed.
- **Semicolons**: use sparingly; only when two closely related independent clauses benefit from connection.
- **Exclamation marks**: use for genuine enthusiasm only. One per section maximum unless you really mean it.
- **Quotation marks**: double quotes for direct quotes and scare quotes. Single quotes for code/technical references in running text when backticks aren't appropriate.
- **Ellipsis**: three dots, no spaces between ("Even more specifically… were gonna write a Reverse Proxy!").

## Paragraphs

- **Vary length.** Single-sentence paragraphs for emphasis. 2-4 sentences for standard content. Never more than 5-6 sentences.
- **One idea per paragraph.** If you're connecting two ideas with "Also," split them.
- **White space is your friend.** Dense walls of text lose readers.

## Headings

- **Use liberally.** Headers are signposts for scanning, not decoration.
- **Sentence case**: "Creating a way to store these links" not "Creating A Way To Store These Links."
- **H2 for major sections, H3 for subsections, H4 for steps.** Don't skip levels.
- **Be descriptive.** "Redirect from an Id to a URL" beats "Next Steps."

## Lists

- **Numbered lists** for sequential steps or ordered items.
- **Bullet lists** for unordered collections.
- **Keep items parallel** in grammatical structure.
- Don't force everything into lists. Prose is fine for connected ideas.

## Code Formatting

- **Inline backticks** for code references in prose: `proxy_condition`, `handleRequestAndRedirect`.
- **Fenced code blocks** with language identifiers for examples:
  ````
  ```elixir
  def my_function do
    :ok
  end
  ```
  ````
- **Comment file paths** at the top of code blocks when the file location matters: `# shorten_api/links/link.ex`
- **Show terminal output** when it helps the reader verify their work.

## Bold and Italic

- **Bold** for introducing key concepts or terms on first use: **"A big fancy way of saying a traffic forwarder."**
- **Bold** for emphasis on critical statements: **"This is not the proposal"**, **"ALWAYS!"**
- *Italic* for attribution, asides, or light emphasis: *"This is a habit I picked up from the 12 Factor App."*
- Don't overuse either. If everything is bold, nothing is.

## Links

- Use descriptive link text, not "click here."
- Link to external resources for context: Wikipedia, docs, other people's writing.
- Ben links generously: "go learn more about this" not "stay on my page."

## Blog Post Frontmatter

```yaml
---
title: "Post Title"
description: "Brief description for listings and SEO"
date: "2024-10-26"               # ISO date format
categories:
  - Category One
  - Category Two
published: true                   # false for drafts
canonicalLink: "https://..."      # optional, for cross-posted content
slug: "url-slug"                  # optional, defaults from directory name
---
```

- **title**: the display title. Use sentence case. Can be playful.
- **description**: 1-2 sentences for the listing page. Should make someone want to read the post.
- **categories**: 2-5 tags. Use existing categories from other posts when possible.
- **published**: set to `false` to keep as draft.

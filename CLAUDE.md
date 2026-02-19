# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog for Ben Church (https://by.ben.church) built with Gatsby 5 and React 18. Content is authored in Markdown and MDX files under `content/`, and Gatsby generates a static site at build time.

## Commands

```bash
npm run dev       # Start Gatsby dev server (hot reload)
npm run build     # Production build → public/
npm run serve     # Serve production build locally
npm run format    # Prettier on src/**/*.{js,jsx}
```

No test suite exists yet. Node 18 is required (see .nvmrc).

## Architecture

### Content Pipeline

Blog posts live in `content/{slug}/index.md` (or `.mdx`). Each post uses YAML frontmatter:

```yaml
title: "Post Title"
description: "Listing description"
date: "2018-08-06T18:01:41.279Z"
categories: ["Tag1", "Tag2"]
published: true          # false = draft, excluded from nav
canonicalLink: "https://..." # optional, for cross-posted content
```

`gatsby-node.js` processes both MDX and MarkdownRemark nodes:
- Adds `slug` and `published` fields
- Computes `estimatedReadingTime` via custom resolver
- Creates pages using `src/templates/blog-post.js` with prev/next context

### Key Files

- `gatsby-config.js` — Site metadata (title, bio, social links) and plugin chain. Remark plugins handle images, code highlighting (PrismJS), embeds (gists, tweets, video), and smart quotes.
- `gatsby-node.js` — Node creation, schema customization, and page generation for both MDX and Markdown.
- `src/pages/index.js` — Homepage listing all published posts via GraphQL.
- `src/templates/blog-post.js` — Individual post template with prev/next navigation.
- `src/components/seo.js` — Meta tags and OpenGraph via react-helmet.
- `src/components/main-bio.js` — Homepage bio with social links.

### Styling

Plain CSS files (no CSS-in-JS). Syntax highlighting uses PrismJS with theme imported in `gatsby-browser.js`.

## Code Style

- ESLint with Airbnb config + Prettier (config in package.json: single quotes, no semicolons, trailing commas es5)
- Pre-commit hook runs lint-staged
- Components use PropTypes for runtime validation

## Deployment

Netlify — builds automatically on push. Config in `netlify.toml`.

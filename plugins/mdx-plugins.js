// This file exports the required plugins for gatsby-plugin-mdx
// We use this approach to handle compatibility between ESM and CommonJS

// Import plugins
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Export them for use in gatsby-config.js
export const remarkPlugins = [
  remarkFrontmatter,
  remarkGfm
]

export const rehypePlugins = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'wrap' }]
]
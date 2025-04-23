const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const readingTime = require('reading-time')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Handle both MDX and markdown nodes
  if (node.internal.type === 'Mdx' || node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter?.published !== false, // Default to true if not specified
    })
  }
}

// Add estimatedReadingTime to frontmatter
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: Fields
    }
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      fields: Fields
    }
    type Fields {
      slug: String
      published: Boolean
    }
    type MdxFrontmatter {
      title: String!
      date: Date @dateformat
      description: String
      published: Boolean
      categories: [String]
      canonicalLink: String
      estimatedReadingTime: Int
    }
    type MarkdownRemarkFrontmatter {
      title: String!
      date: Date @dateformat
      description: String
      published: Boolean
      categories: [String]
      canonicalLink: String
      estimatedReadingTime: Int
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxFrontmatter: {
      estimatedReadingTime: {
        type: 'Int',
        resolve: (source, args, context, info) => {
          const nodeId = info.parentNode && info.parentNode.id;
          if (!nodeId) return 5; // Default reading time

          const node = context.nodeModel.getNodeById({ id: nodeId });
          if (!node) return 5; // Default reading time

          const { rawBody } = node;
          const readingStats = readingTime(rawBody || '');
          return Math.round(readingStats.minutes);
        },
      },
    },
    MarkdownRemarkFrontmatter: {
      estimatedReadingTime: {
        type: 'Int',
        resolve: (source, args, context, info) => {
          const nodeId = info.parentNode && info.parentNode.id;
          if (!nodeId) return 5; // Default reading time

          const node = context.nodeModel.getNodeById({ id: nodeId });
          if (!node) return 5; // Default reading time

          const { rawBody } = node;
          const readingStats = readingTime(rawBody || '');
          return Math.round(readingStats.minutes);
        },
      },
    },
  }
  createResolvers(resolvers)
}

exports.createPages = ({ graphql, actions, reporter, pathPrefix }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMdx(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              id
              fields {
                slug
                published
              }
              internal {
                contentFilePath
              }
              frontmatter {
                title
              }
            }
          }
        }
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              id
              fields {
                slug
                published
              }
              internal {
                contentFilePath
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors && result.errors.length) {
      if (result.errors.length === 1) {
        throw new Error(result.errors[0])
      }

      result.errors.forEach(error => {
        reporter.error('Error while querying the mdx and markdown', error)
      })

      throw new Error('See errors above')
    }

    // Create MDX pages
    const mdxPosts = result.data.allMdx.edges;
    mdxPosts.forEach(({ node }, index) => {
      let previous = index === mdxPosts.length - 1 ? null : mdxPosts[index + 1].node;
      let next = index === 0 ? null : mdxPosts[index - 1].node;

      if (previous && !previous.fields.published) {
        previous = null;
      }
      if (next && !next.fields.published) {
        next = null;
      }

      createPage({
        path: `${pathPrefix}${node.fields.slug}`,
        component: `${path.resolve(`./src/templates/blog-post.js`)}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, previous, next },
      });
    });

    // Create markdown pages
    const markdownPosts = result.data.allMarkdownRemark.edges;
    markdownPosts.forEach(({ node }, index) => {
      let previous = index === markdownPosts.length - 1 ? null : markdownPosts[index + 1].node;
      let next = index === 0 ? null : markdownPosts[index - 1].node;

      if (previous && !previous.fields.published) {
        previous = null;
      }
      if (next && !next.fields.published) {
        next = null;
      }

      const component = node.internal.contentFilePath
        ? `${path.resolve(`./src/templates/blog-post.js`)}?__contentFilePath=${node.internal.contentFilePath}`
        : path.resolve(`./src/templates/blog-post.js`);

      createPage({
        path: `${pathPrefix}${node.fields.slug}`,
        component,
        context: { id: node.id, previous, next },
      });
    });
  });
}

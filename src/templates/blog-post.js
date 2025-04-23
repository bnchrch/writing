import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

import SEO from '../components/seo'
import Pills from '../components/pills'
import Bio from '../components/bio'
import Embed from '../components/embed'
import { formatPostDate, formatReadingTime } from '../utils/dates'

import './blog-post.css'

// Define custom components
const shortcodes = { Embed }

export default function PageTemplate({ data, children, pageContext }) {
  const { mdx, markdownRemark, site } = data

  // Use either MDX or MarkdownRemark node
  const post = mdx || markdownRemark

  if (!post) {
    return <div>Post not found</div>
  }

  const { previous, next } = pageContext
  const publicUrl = `${site.siteMetadata.siteUrl}${post.fields.slug}`

  return (
    <div>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        canonicalLink={post.frontmatter.canonicalLink}
        keywords={post.frontmatter.categories || []}
        meta={[
          {
            name: 'twitter:label1',
            content: 'Reading time',
          },
          {
            name: 'twitter:data1',
            content: `${post.frontmatter.estimatedReadingTime || '5'} min read`,
          },
        ]}
      />
      <section className="center blog">
        <article className="container small">
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>
              {formatPostDate(post.frontmatter.date)}
              {` • ${formatReadingTime(post.frontmatter.estimatedReadingTime || 5)}`}
            </p>
            <Pills items={post.frontmatter.categories} />
          </header>

          {/* Render MDX content if available */}
          {mdx && (
            <MDXProvider components={shortcodes}>
              {children}
            </MDXProvider>
          )}

          {/* Render MarkdownRemark content if available */}
          {markdownRemark && (
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          )}
        </article>
        <footer className="container small">
          <small>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`https://twitter.com/search?q=${publicUrl}`}
            >
              Discuss on Twitter
            </a>{' '}
            &middot;{' '}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`${site.siteMetadata.githubUrl}/edit/master/content${
                post.fields.slug
              }index.md`}
            >
              Edit this post on GitHub
            </a>
          </small>
          <hr
            style={{
              margin: `24px 0`,
            }}
          />
          <Bio />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </footer>
      </section>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        githubUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        categories
        canonicalLink
        estimatedReadingTime
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        categories
        canonicalLink
        estimatedReadingTime
      }
    }
  }
`

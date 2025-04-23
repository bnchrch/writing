import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Section from '../components/section'
import Pills from '../components/pills'
import MainBio from '../components/main-bio'
import { formatPostDate, formatReadingTime } from '../utils/dates'

import './blog-listing.css'

const BlogIndexPage = ({ data }) => {
  // Combine MDX and MarkdownRemark nodes
  const allMdx = data.allMdx || { nodes: [] };
  const allMarkdownRemark = data.allMarkdownRemark || { nodes: [] };

  // Convert markdown nodes to the same structure as MDX nodes
  const markdownNodes = allMarkdownRemark.nodes.map(node => ({
    ...node,
    frontmatter: {
      ...node.frontmatter,
      estimatedReadingTime: node.frontmatter.estimatedReadingTime || 5
    }
  }));

  // Combine both types of nodes
  const allNodes = [...allMdx.nodes, ...markdownNodes];

  // Sort by date
  const sortedNodes = allNodes.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Layout>
      <SEO
        title="By Ben Church"
        keywords={['elixir', 'javascript', 'react-native', 'remote', 'digital nomad', 'golang', 'go', 'python', 'swift', 'react']}
        canonicalLink={null}
      />
      <Section name="bio" centered big={false}>
        <MainBio />
      </Section>

      {sortedNodes.map(post => (
        <Section key={post.fields.slug} name={post.fields.slug} centered big={false}>
          <a href={post.fields.slug} className="blog-listing">
            <h1>{post.frontmatter.title}</h1>
            <p>
              {formatPostDate(post.frontmatter.date)}
              {` • ${formatReadingTime(post.frontmatter.estimatedReadingTime || 5)}`}
            </p>
            <Pills items={post.frontmatter.categories} />
            <p>{post.frontmatter.description}</p>
          </a>
        </Section>
      ))}
    </Layout>
  );
};

export default BlogIndexPage

export const query = graphql`
  query BlogIndex {
    allMdx(
      filter: { fields: { published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          categories
          date(formatString: "MMMM DD, YYYY")
          estimatedReadingTime
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          categories
          date(formatString: "MMMM DD, YYYY")
          estimatedReadingTime
        }
      }
    }
  }
`

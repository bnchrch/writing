import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Pills from '../components/pills'
import MainBio from '../components/main-bio'
import { formatPostDate, formatReadingTime } from '../utils/dates'

import './blog-listing.css'

const FOR_THEM = 'For them'
const FILTER_PARAM = 'filter'
const FOR_THEM_VALUE = 'for-them'
const FOR_THEM_EMOJIS = ['♥️', '🌈', '🦄', '🏎️', '🐰', '🐈', '🐕', '🎈', '🛝', '🫧']

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

  // Toggle: when on, show only "For them" posts. Backed by a ?filter=for-them
  // query param so the state is shareable and survives reloads.
  const [forThemOnly, setForThemOnly] = useState(false);

  // Read the initial state from the URL after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setForThemOnly(params.get(FILTER_PARAM) === FOR_THEM_VALUE);
  }, []);

  const toggleForThem = () => {
    setForThemOnly(prev => {
      const next = !prev;
      const params = new URLSearchParams(window.location.search);
      if (next) {
        params.set(FILTER_PARAM, FOR_THEM_VALUE);
      } else {
        params.delete(FILTER_PARAM);
      }
      const query = params.toString();
      const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
      window.history.replaceState(null, '', url);
      return next;
    });
  };

  const visibleNodes = forThemOnly
    ? sortedNodes.filter(post => (post.frontmatter.categories || []).includes(FOR_THEM))
    : sortedNodes;

  // "For them" delight: a random emoji cursor (per page load) plus a hovered
  // title that appends the next emoji in the cycle.
  const emojiIndex = useRef(0);
  const [hoverEmoji, setHoverEmoji] = useState({ slug: null, emoji: '' });
  const [forThemCursor, setForThemCursor] = useState(null);

  useEffect(() => {
    // Random starting point so the first appended emoji differs each load.
    emojiIndex.current = Math.floor(Math.random() * FOR_THEM_EMOJIS.length);

    // Render a random emoji onto a canvas and use the PNG as the cursor
    // (reliable across browsers, unlike emoji inside an SVG cursor).
    const emoji = FOR_THEM_EMOJIS[Math.floor(Math.random() * FOR_THEM_EMOJIS.length)];
    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '26px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, size / 2, size / 2 + 1);
      setForThemCursor(`url(${canvas.toDataURL('image/png')}) 16 16, pointer`);
    }
  }, []);

  const handlePostEnter = slug => {
    if (!forThemOnly) return;
    const emoji = FOR_THEM_EMOJIS[emojiIndex.current % FOR_THEM_EMOJIS.length];
    emojiIndex.current += 1;
    setHoverEmoji({ slug, emoji });
  };
  const handlePostLeave = () => setHoverEmoji({ slug: null, emoji: '' });

  return (
    <Layout>
      <SEO
        title="By Ben Church"
        keywords={['elixir', 'javascript', 'react-native', 'remote', 'digital nomad', 'golang', 'go', 'python', 'swift', 'react']}
        canonicalLink={null}
      />
      <div
        className={`homepage-layout ${forThemOnly ? 'for-them-mode' : ''}`}
        style={forThemCursor ? { '--for-them-cursor': forThemCursor } : undefined}
      >
        <aside className="homepage-sidebar">
          <MainBio forThem={forThemOnly} />
        </aside>
        <div className="homepage-content">
          <div className="filter-bar">
            <button
              type="button"
              className={`filter-toggle ${forThemOnly ? 'filter-toggle--active' : ''}`}
              onClick={toggleForThem}
              aria-pressed={forThemOnly}
              aria-label="Show only letters for them"
              title="For them"
            >
              <span className="emoji" role="img" aria-hidden="true">👧</span>
            </button>
          </div>
          {visibleNodes.map(post => (
            <a
              key={post.fields.slug}
              href={post.fields.slug}
              className="blog-listing"
              onMouseEnter={() => handlePostEnter(post.fields.slug)}
              onMouseLeave={handlePostLeave}
            >
              <h1>
                {post.frontmatter.title}
                {forThemOnly && hoverEmoji.slug === post.fields.slug && hoverEmoji.emoji && (
                  <span className="hover-emoji"> {hoverEmoji.emoji}</span>
                )}
              </h1>
              <p>
                {formatPostDate(post.frontmatter.date)}
                {` • ${formatReadingTime(post.frontmatter.estimatedReadingTime || 5)}`}
              </p>
              <Pills items={post.frontmatter.categories} />
              <p>{post.frontmatter.description}</p>
            </a>
          ))}
        </div>
      </div>
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

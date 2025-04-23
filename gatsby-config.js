/**
 * @type {import('gatsby').GatsbyConfig}
 */

const configuration = {
  // the name of your website
  title: 'Ben Church',
  // the description of the website (eg. what shows on Google)
  description: "A collection of short tutorials and stories on building great products for great companies.",
  // a short bio shown at the bottom of your blog posts
  // It should complete the sentence: Written by Ben Church ...
  shortBio: '',
  // a longer bio showing on the landing page of the blog
  bio: `I'm Ben, an Engineer who just loves to build. Products, processes, teams, front, back, etc. Below is just a collection of what I've been able to write on.`,
  author: 'Ben Church',
  githubUrl: 'https://github.com/bechurch/writing',
  // replace this by the url where your website will be published
  siteUrl: 'https://by.ben.church',
  social: {
    // leave the social media you do not want to appear as empty strings
    twitter: 'bnchrch',
    medium: '@bnchrch',
    facebook: '',
    github: 'bechurch',
    linkedin: 'bnchrch',
    instagram: '',
  },
}

module.exports = {
  siteMetadata: configuration,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              backgroundColor: 'transparent',
              showCaptions: true,
              wrapperStyle: 'margin: 0 auto',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
          {
            resolve: "@weknow/gatsby-remark-twitter",
            options: {
              align: 'center',
            },
          },
          'gatsby-remark-external-links',
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: 'bechurch',
              includeDefaultCss: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              backgroundColor: 'transparent',
              showCaptions: true,
              wrapperStyle: 'margin: 0 auto',
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              // the github handler whose gists are to be accessed
              username: 'bechurch',
              // a flag indicating whether the github default gist css should be included or not
              // default: true
              includeDefaultCss: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              inlineCodeMarker: null,
              // This lets you set up language aliases.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
          {
            resolve: '@weknow/gatsby-remark-twitter',
            options: {
              align: 'center',
            },
          },
          'gatsby-remark-external-links',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ben Church',
        short_name: 'Ben Church',
        start_url: '/',
        background_color: '#001724',
        theme_color: '#001724',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Ben Church's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-135503975-1",
        head: false,
      }
    },
  ],
}
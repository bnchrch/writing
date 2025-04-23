import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

function Bio() {
  const { site, avatar } = useStaticQuery(
    graphql`
      query BioQuery {
        avatar: file(absolutePath: { regex: "/avatar.png/" }) {
          childImageSharp {
            gatsbyImageData(
              width: 50
              height: 50
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
        site {
          siteMetadata {
            author
            shortBio
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const { author, social, shortBio } = site.siteMetadata
  const avatarImage = getImage(avatar)

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '4.375rem',
      }}
    >
      {avatarImage && (
        <GatsbyImage
          image={avatarImage}
          alt={author}
          style={{
            marginRight: '0.875rem',
            marginBottom: 0,
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
          imgStyle={{
            borderRadius: '50%',
          }}
        />
      )}
      <p style={{ margin: 0 }}>
        Written by <strong>{author}</strong>
        {shortBio ? ` ${shortBio}` : ''}.{` `}
        {`Like what you read? Follow me on `}
        {social.twitter ? (
          <a href="https://www.producthunt.com/@bnchrch">
            Product Hunt
          </a>
        ) : null}
        {` or `}
        <a href={`https://twitter.com/${social.twitter}`}>
         Twitter.
        </a>
      </p>
    </div>
  )
}

export default Bio

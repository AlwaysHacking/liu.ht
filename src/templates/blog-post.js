import * as React from "react"
import Emoji from "a11y-react-emoji"
import { graphql } from "gatsby"
import Link from "../components/link"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Discuss from "../components/discuss"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="header">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <Discuss tweetID={post.frontmatter.tweetID} />
      <nav className="blog-post-nav">
        {previous && (
          <div className="prev">
            <Link to={previous.fields.slug} rel="prev">
              <Emoji symbol="👈" label="previous" />
              {`《${previous.frontmatter.title}》`}
            </Link>
          </div>
        )}

        {next && (
          <div className="next">
            <Link to={next.fields.slug} rel="next">
              {`《${next.frontmatter.title}》`}
              <Emoji symbol="👉" label="next" />
            </Link>
          </div>
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tweetID
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

import * as React from "react"
import Link from "./link"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          social {
            twitter
            weibo
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social

  return (
    <>
      <header className="global-header">
        <Link className={`logo ${isRootPath ? "home" : ""}`} to="/">
          {title}
        </Link>
        <div className="bio">
          <Link to={`https://twitter.com/${social?.twitter || ``}`}>
            Twitter
          </Link>
          <Link to={`https://weibo.com/${social?.weibo || ``}`}>Weibo</Link>
          <Link to={`/rss.xml`} external={true}>
            RSS
          </Link>
        </div>
      </header>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout

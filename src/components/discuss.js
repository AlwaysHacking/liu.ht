import * as React from "react"
import Emoji from "a11y-react-emoji"
import Link from "./link"

const Discuss = ({ tweetID }) => {
  const replyUrl = `https://mobile.twitter.com/intent/tweet?in_reply_to=${tweetID}`
  const discussionsUrl = `https://mobile.twitter.com/liuht_eth/status/${tweetID}`
  return (
    <div className="discuss">
      <Link to={replyUrl} className="discuss-link">
        <Emoji symbol="💬" label="reply" /> {"去 Twitter 评论"}
      </Link>
      {` · `}
      <Link to={discussionsUrl} className="discuss-link">
        <Emoji symbol="👀" label="view" /> {"查看评论"}
      </Link>
    </div>
  )
}

export default Discuss

import React from "react"
import PropTypes from "prop-types"
import PostItem from "./PostItem"

const PostFeed = (props) => {
  const { posts } = props
  console.log(props)
  let data = <div></div>
  if (Object.keys(posts).length !== 0) {
    data = posts.map((post) => <PostItem key={post._id} post={post} />)
  }
  return data
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostFeed

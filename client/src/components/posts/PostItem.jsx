import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classnames from "classnames"
import { Link } from "react-router-dom"
import { deletePost, addLike, removeLike } from "../../actions/postActions"

const PostItem = (props) => {
  const { post, auth, showActions } = props

  function handleDeleteClick() {
    props.deletePost(post._id)
  }

  function onLikeClick() {
    props.addLike(post._id)
  }

  function onUnLikeClick() {
    props.removeLike(post._id)
  }

  function findUserLike(likes) {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img className='rounded-circle d-none d-md-block' src={post.avatar} alt='' />
          </a>
          <br />
          <p className='text-center'>{post.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          {showActions && (
            <span>
              <button type='button' className='btn btn-light mr-1' onClick={onLikeClick}>
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-success": findUserLike(post.likes),
                  })}
                ></i>
                <span className='badge badge-light'>{post.likes.length}</span>
              </button>
              <button type='button' className='btn btn-light mr-1' onClick={onUnLikeClick}>
                <i className='text-secondary fas fa-thumbs-down'></i>
              </button>
              <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                Comments
              </Link>
              {post.user === auth.user.id && (
                <button type='button' className='btn btn-danger mr-1' onClick={handleDeleteClick}>
                  <i className='fas fa-times' />
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

PostItem.defaultProps = {
  showActions: true,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)

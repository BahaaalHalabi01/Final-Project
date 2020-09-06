import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { addComment } from "../../actions/postActions"

const CommentForm = (props) => {
  const [state, setState] = useState("")
  const [errors, setErrors] = useState({})
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  function handleSubmit(event) {
    event.preventDefault()
    const { user } = props.auth
    const { postId } = props

    const newComment = {
      text: state,
      name: user.name,
      avatar: user.avatar,
    }

    props.addComment(newComment, postId)

    setState("")
  }

  function handleChange(event) {
    setState(event.target.value)
  }

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Make a comment...</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Reply to post'
                name='text'
                value={state}
                onChange={handleChange}
                error={errors.text}
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { addComment })(CommentForm)

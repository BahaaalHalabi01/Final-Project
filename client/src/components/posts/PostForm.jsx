import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { addPost } from "../../actions/postActions"

const PostForm = (props) => {
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
    const newPost = {
      text: state,
      name: user.name,
      avatar: user.avatar,
    }

    props.addPost(newPost)

    setErrors("")
    setState("")
  }

  function handleChange(event) {
    setState(event.target.value)
  }

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Somthing...</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Create your post'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  erros: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { addPost })(PostForm)

import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

function Register(props) {
  const [state, setState] = useState({})
  const [errors, setErrors] = useState({})
  const firstRender = useRef(true)

  function handleChange(event) {
    const { name, value } = event.target
    setState((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const { auth, history } = props

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (auth.isAuthenticated) {
      history.push("/dashboard")
    }
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors, history, auth])

  function handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, confirmPassword } = state
    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    }
    props.registerUser(newUser, props.history)
  }
  const { name, email, password, confirmPassword } = state
  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup name='name' placeholder='Name' value={name} onChange={handleChange} error={errors.name} />
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={handleChange}
                error={errors.email}
                info='This site uses Gravat so if you want a profile image, use a Gravat email'
              />

              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={handleChange}
                error={errors.password}
              />

              <TextFieldGroup
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

function Register(props) {
  const [state, setState] = useState({ errors: {} })

  function handleChange(event) {
    const { name, value } = event.target
    setState((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const { auth, history, errors } = props

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard")
    }
    if (errors) {
      setState((state) => ({ ...state, errors }))
    }
    return () => {
      console.log("left register")
    }
  }, [errors, history, auth])

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

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                name='name'
                placeholder='Name'
                value={state.name}
                onChange={handleChange}
                error={state.errors.name}
              />
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={state.email}
                onChange={handleChange}
                error={state.errors.email}
                info='This site uses Gravat so if you want a profile image, use a Gravat email'
              />

              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={state.password}
                onChange={handleChange}
                error={state.errors.password}
              />

              <TextFieldGroup
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                value={state.confirmPassword}
                onChange={handleChange}
                error={state.errors.confirmPassword}
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

import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

function Login(props) {
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
    const { email, password } = state
    const userData = {
      email,
      password,
    }
    props.loginUser(userData)
  }
  const { email, password } = state
  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>Sign in to your DevConnector account</p>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={handleChange}
                error={errors.email}
              />

              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Passowrd'
                value={password}
                onChange={handleChange}
                error={errors.password}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)

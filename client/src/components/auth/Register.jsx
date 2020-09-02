import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

function Register(props) {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard")
    }
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props])

  function handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, confirmPassword } = inputs
    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    }
    console.log(newUser)
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
                value={inputs.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={inputs.email}
                onChange={handleChange}
                error={errors.email}
                info='This site uses Gravat so if you want a profile image, use a Gravat email'
              />

              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={inputs.password}
                onChange={handleChange}
                error={errors.password}
              />

              <TextFieldGroup
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                value={inputs.confirmPassword}
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

import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import classnames from "classnames"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"

function Register(props) {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const { user } = props.auth

  function handleChange(event) {
    const { name, value } = event.target
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }))
  }
  function handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, confirmPassword } = inputs
    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    }

    props.registerUser(newUser)
  }

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name,
                  })}
                  placeholder='Name'
                  name='name'
                  value={inputs.name}
                  onChange={handleChange}
                />

                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                />
                <small className='form-text text-muted'>
                  This site uses Gravatar so if you want a profile image, use a Gravatar email
                </small>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={inputs.password}
                  onChange={handleChange}
                />
                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.confirmPassword,
                  })}
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
              </div>
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
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { registerUser })(Register)

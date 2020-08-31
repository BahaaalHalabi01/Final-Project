import React, { useState } from "react"
import axios from "axios"

export default function Register() {
  const [inputs, setInputs] = useState({})

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
    axios
      .post("/api/users/register", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data))
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
                  className='form-control form-control-lg'
                  placeholder='Name'
                  name='name'
                  value={inputs.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='Email Address'
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                />
                <small className='form-text text-muted'>
                  This site uses Gravatar so if you want a profile image, use a Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addExperience } from "../../actions/profileActions"

function AddExperience(props) {
  const [state, setState] = useState({ errors: {} })

  const { addExperience, errors } = props

  useEffect(() => {
    if (errors) {
      setState((state) => ({ ...state, errors }))
    }
    return () => {
      console.log("tried to cleanup")
      setState({ errors: {} })
    }
  }, [errors])

  function handleSubmit(event) {
    event.preventDefault()
    let { errors, ...expData } = state
    addExperience(expData, props.history)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setState((state) => ({ ...state, [name]: value }))
  }

  function onCheck(event) {
    setState({
      ...state,
      disabled: !state.disabled,
      current: !state.current,
    })
  }

  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Experience</h1>
            <p className='lead text-center'>Add any job or position that you have had in the past or currently</p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder='* Company'
                name='company'
                value={state.company}
                onChange={handleChange}
                error={state.errors.company}
              />
              <TextFieldGroup
                placeholder='* Job Title'
                name='title'
                value={state.title}
                onChange={handleChange}
                error={state.errors.title}
              />
              <TextFieldGroup
                placeholder='* Location'
                name='location'
                value={state.location}
                onChange={handleChange}
                error={state.errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name='from'
                type='date'
                value={state.from}
                onChange={handleChange}
                error={state.errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name='to'
                type='date'
                value={state.to}
                onChange={handleChange}
                error={state.errors.to}
                disabled={state.disabled ? "disabled" : ""}
              />
              <div className='form-check mb-4'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='current'
                  value={state.current}
                  checked={state.current}
                  onChange={onCheck}
                  id='current'
                />
                <label className='form-check-label' htmlFor='current'>
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder='Job Description'
                name='description'
                value={state.description}
                onChange={handleChange}
                error={state.errors.description}
                info='Tell us about the position'
              />
              <input type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))

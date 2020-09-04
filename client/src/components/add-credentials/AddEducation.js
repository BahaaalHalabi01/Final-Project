import React, { useState, useEffect, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addEducation } from "../../actions/profileActions"

function AddEducation(props) {
  const [state, setState] = useState({ errors: {} })
  const firstRender = useRef(true)
  const { addEducation, errors } = props

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (errors) {
      setState((state) => ({ ...state, errors }))
    }
  }, [errors])

  function handleSubmit(event) {
    event.preventDefault()
    let { errors, ...eduData } = state
    addEducation(eduData, props.history)
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
    <div className='add-education'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Education</h1>
            <p className='lead text-center'>Add any school, bootcamp, etc that you have attended</p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder='* School'
                name='school'
                value={state.school}
                onChange={handleChange}
                error={state.errors.school}
              />
              <TextFieldGroup
                placeholder='* Degree or Certificate'
                name='degree'
                value={state.degree}
                onChange={handleChange}
                error={state.errors.degree}
              />
              <TextFieldGroup
                placeholder='* Field of study'
                name='fieldofstudy'
                value={state.fieldofstudy}
                onChange={handleChange}
                error={state.errors.fieldofstudy}
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
                  Current Program
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))

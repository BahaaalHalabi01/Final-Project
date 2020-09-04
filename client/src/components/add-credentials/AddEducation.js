import React, { useState, useEffect, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addEducation } from "../../actions/profileActions"

function AddEducation(props) {
  const [state, setState] = useState({})
  const [errors, setErrors] = useState({})
  const firstRender = useRef(true)
  const { addEducation } = props

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
    let eduData = state
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
  const { school, degree, fieldofstudy, from, to, current, description, disabled } = state
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
                value={school}
                onChange={handleChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder='* Degree or Certificate'
                name='degree'
                value={degree}
                onChange={handleChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder='* Field of study'
                name='fieldofstudy'
                value={fieldofstudy}
                onChange={handleChange}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup name='from' type='date' value={from} onChange={handleChange} error={errors.from} />
              <h6>To Date</h6>
              <TextFieldGroup
                name='to'
                type='date'
                value={to}
                onChange={handleChange}
                error={errors.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className='form-check mb-4'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='current'
                  value={current}
                  checked={current}
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
                value={description}
                onChange={handleChange}
                error={errors.description}
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

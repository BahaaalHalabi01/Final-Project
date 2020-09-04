import React, { useState, useEffect, useRef } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import InputGroup from "../common/InputGroup"
import SelectListGroup from "../common/SelectListGroup"
import { createProfile, getCurrentProfile } from "../../actions/profileActions"
import isEmpty from "../../validation/isEmpty"

function EditProfile(props) {
  const [state, setState] = useState({})
  const [errors, setErrors] = useState({})
  const firstRender = useRef(true)
  const firstProfile = useRef(true)

  const { createProfile, getCurrentProfile, history } = props

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  //handling populating the input
  useEffect(() => {
    if (firstProfile.current) {
      getCurrentProfile()
      firstProfile.current = false
      return
    }

    if (props.profile.profile) {
      const profile = props.profile.profile
      profile.skills = profile.skills.join(",")
      profile.company = !isEmpty(profile.company) ? profile.company : ""
      profile.website = !isEmpty(profile.website) ? profile.website : ""
      profile.location = !isEmpty(profile.location) ? profile.location : ""
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ""
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ""
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.twitter : ""
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.facebook : ""
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.linkedin : ""
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.youtube : ""
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.instagram : ""
      setState(profile)
    }
  }, [props.profile.profile])

  function onSubmit(event) {
    event.preventDefault()
    let { displaySocialInputs, ...profileData } = state
    createProfile(profileData, history)
  }

  function onChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const {
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    handle,
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    displaySocialInputs,
  } = state
  let socialInputs
  if (state.displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder='Twitter Profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={twitter}
          onChange={onChange}
          error={errors.twitter}
        />
        <InputGroup
          placeholder='Facebook Profile URL'
          name='facebook'
          icon='fab fa-facebook'
          value={facebook}
          onChange={onChange}
          error={errors.facebook}
        />
        <InputGroup
          placeholder='Linkedin Profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder='Youtube Profile URL'
          name='youtube'
          icon='fab fa-youtube'
          value={youtube}
          onChange={onChange}
          error={errors.youtube}
        />
        <InputGroup
          placeholder='Instagram Profile URL'
          name='instagram'
          icon='fab fa-instagram'
          value={instagram}
          onChange={onChange}
          error={errors.twitter}
        />
      </div>
    )
  }

  //select options for status
  const options = [
    { label: "* Select Professional Status", value: "0" },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student", value: "Student" },
    { label: "Stunder or Learning", value: "Stunder or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ]
  return (
    <div className='create-profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Profile</h1>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* Profile Handle'
                name='handle'
                value={handle}
                onChange={onChange}
                error={errors.handle}
                info='A unique handle for your profile URL. Your full name,company name, nickname,etc'
              />
              <SelectListGroup
                placeholder='Status'
                name='status'
                value={status}
                onChange={onChange}
                error={errors.status}
                options={options}
                info='Give us an idea of where you are at in your career'
              />
              <TextFieldGroup
                placeholder='Company'
                name='company'
                value={company}
                onChange={onChange}
                error={errors.company}
                info='Could be your own company or one you work for'
              />
              <TextFieldGroup
                placeholder='Website'
                name='website'
                value={website}
                onChange={onChange}
                error={errors.website}
                info='Could be your own website or a company'
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
                error={errors.location}
                info='City or city & state suggested (eg. Boston, MA)'
              />
              <TextFieldGroup
                placeholder='*Skills'
                name='skills'
                value={skills}
                onChange={onChange}
                error={errors.skills}
                info='Please use comma separated values (eg. HTML,CSS,JavaScript)'
              />
              <TextFieldGroup
                placeholder='Github Username'
                name='githubusername'
                value={githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info='If you want your latest repos and a Github link, include your username'
              />
              <TextAreaFieldGroup
                placeholder='Short Bio'
                name='bio'
                value={bio}
                onChange={onChange}
                errors={errors.bio}
                info='Tell us a little about yourself'
              />

              <div className='mb-3'>
                <button
                  type='button'
                  onClick={() => setState({ ...state, displaySocialInputs: !displaySocialInputs })}
                  className='btn btn-light'
                >
                  Add Social Network Links
                </button>
                <span className='text-muted'>Optional</span>
              </div>
              {socialInputs}
              <input type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))

import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import ProfileCreds from "./ProfileCreds"
import ProfileGithub from "./ProfileGithub"
import Spinner from "../common/Spinner"
import { getProfileByHandle } from "../../actions/profileActions"

function Profile(props) {
  const {
    history,
    getProfileByHandle,
    profile: { profile, loading },
  } = props

  const [state, setState] = useState({})

  const firstRender = useRef(true)

  let profileContent

  useEffect(() => {
    if (props.match.params.handle) {
      getProfileByHandle(props.match.params.handle)
    }
  }, [props.match.params.handle])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (profile === null && loading) {
      console.log(props)
      props.history.push("/not-found")
    }
  }, [profile, loading])

  if (profile === null || loading) {
    profileContent = <Spinner />
  } else {
    profileContent = (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
              Back To Profiles
            </Link>
          </div>
          <div className='col-md-6'></div>
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds education={profile.education} experience={profile.experience} />
        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
      </div>
    )
  }

  return (
    <div className='profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>{profileContent}</div>
        </div>
      </div>
    </div>
  )
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)

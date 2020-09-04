import React, { useEffect } from "react"
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
  const { getProfileByHandle } = props
  useEffect(() => {
    if (props.match.params.handle) {
      getProfileByHandle(props.match.params.handle)
    }
  }, [props.match.params.handle])

  return (
    <div>
      <ProfileHeader />
      <ProfileAbout />
      <ProfileCreds />
      <ProfileGithub />
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

import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../common/Spinner"
import { getProfiles } from "../../actions/profileActions"

function Profiles(props) {
  const { getProfiles, profile, loading } = props

  useEffect(() => {
    getProfiles()
  }, [])

  console.log(props)
  let profileItems
  if (profile.profiles === null || loading) {
    profileItems = <Spinner />
  } else {
    if (profile.profiles.length > 0) {
      profileItems = <h1>PROFILES HERE</h1>
    } else {
      profileItems = <h4>No profiles found...</h4>
    }
  }

  return (
    <div className='profiles'>
      <div className='container'>
        <div className='col-md-12'>
          <h1 className='display-4 text-center'>Developer Profiles</h1>
          <p className='lead text-center'>Browse and connect with developers</p>
          {profileItems}
        </div>
      </div>
    </div>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)

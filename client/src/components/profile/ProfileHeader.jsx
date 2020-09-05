import React from "react"
import isEmpty from "../../validation/isEmpty"

function ProfileHeader(props) {
  const { profile } = props
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-info text-white mb-3'>
            <div className='row'>
              <div className='col-4 col-md-3 m-auto'>
                <img className='rounded-circle' src={profile.user.avatar} alt='' />
              </div>
            </div>
            <div className='text-center'>
              <h1 className='display-4 text-center'>{profile.user.name}</h1>
              <p className='lead text-center'>
                {profile.status} {isEmpty(profile.company) && <span>@{profile.company}</span>}
              </p>
              {!isEmpty(profile.location) && <p>{profile.location}</p>}
              <p>
                {!isEmpty(profile.website) && (
                  <a
                    className='text-white p-2'
                    rel={"noopener noreferrer"}
                    href={`http://${profile.website}`}
                    target='_blank'
                  >
                    <i className='fas fa-globe fa-2x'></i>
                  </a>
                )}

                {profile.social && !isEmpty(profile.social.twitter) && (
                  <a
                    className='text-white p-2'
                    href={`http://${profile.social.twitter}`}
                    rel={"noopener noreferrer"}
                    target='_blank'
                  >
                    <i className='fab fa-twitter fa-2x'></i>
                  </a>
                )}
                {profile.social && !isEmpty(profile.social.facebook) && (
                  <a
                    className='text-white p-2'
                    href={`http://${profile.social.facebook}`}
                    rel={"noopener noreferrer"}
                    target='_blank'
                  >
                    <i className='fab fa-facebook fa-2x'></i>
                  </a>
                )}
                {profile.social && !isEmpty(profile.social.linkedin) && (
                  <a
                    className='text-white p-2'
                    href={`http://${profile.social.linkedin}`}
                    rel={"noopener noreferrer"}
                    target='_blank'
                  >
                    <i className='fab fa-linkedin fa-2x'></i>
                  </a>
                )}
                {profile.social && !isEmpty(profile.social.youtube) && (
                  <a
                    className='text-white p-2'
                    href={`http://${profile.social.youtube}`}
                    rel={"noopener noreferrer"}
                    target='_blank'
                  >
                    <i className='fab fa-youtube fa-2x'></i>
                  </a>
                )}
                {profile.social && !isEmpty(profile.social.instagram) && (
                  <a
                    className='text-white p-2'
                    href={`http://${profile.social.instagram}`}
                    rel={"noopener noreferrer"}
                    target='_blank'
                  >
                    <i className='fab fa-instagram fa-2x'></i>
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export default function ProfileGithub(props) {
  const [state, setState] = useState({
    clientId: "c1af6f97d93e6efc39c8  ",
    secret: "bdd1dde830985d81660c5b3a7598d6912149713b",
    count: 5,
    sort: "created: asc",
    repos: [],
  })

  const { username } = props
  const { count, sort, clientId, clientSecret } = state

  useEffect(() => {
    const gitUrl = `https://api.github.com/users/${username}/repos?per_page=${count}&soirt=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    fetch(gitUrl)
      .then((res) => res.json())
      .then((data) => {
        setState({ ...state, repos: data })
      })
      .catch((err) => console.log(err))
  }, [username, count, sort, clientId, clientSecret, state])

  const { repos } = state
  const repoItems = repos.map((repo) => (
    <div key={repo.id} className='card card-body mb-2'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>
            <Link to={repo.html_url} className='text-info' target='_blank'>
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className='col-md-6'>
          <span className='badge badge-info mr-1'>Stars:{repo.stargazers_count}</span>
          <span className='badge badge-secondary mr-1'>Watchers:{repo.watchers_count}</span>
          <span className='badge badge-success '>Forks:{repo.forks_count}</span>
        </div>
      </div>
    </div>
  ))

  return (
    <div>
      <hr />
      <h3 className='mb-4'>Latest Github Repos</h3>
      {repoItems}
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
}

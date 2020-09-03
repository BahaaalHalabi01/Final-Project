import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../actions/profileActions"

function Dashboard(props) {
  useEffect(() => {
    props.getCurrentProfile()
  }, [props])

  return (
    <div>
      <h1>fuck this course</h1>
    </div>
  )
}
export default connect(null, { getCurrentProfile })(Dashboard)

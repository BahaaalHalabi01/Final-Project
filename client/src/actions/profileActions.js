import axios from "axios"
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  CLEAR_ERRORS,
} from "./types"

//get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(clearErrors())

  dispatch(setProfileLoading())

  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    )
}

//get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(clearErrors())

  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    )
}

//create profile
export const createProfile = (profileDate, history) => (dispatch) => {
  dispatch(clearErrors())

  axios
    .post("/api/profile", profileDate)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  }
}

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  }
}

//add experience
export const addExperience = (expData, history) => (dispatch) => {
  dispatch(clearErrors())

  axios
    .post("/api/profile/experience", expData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const addEducation = (eduData, history) => (dispatch) => {
  dispatch(clearErrors())

  axios
    .post("/api/profile/education", eduData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    )
}
//get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get("/api/profile/all")
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    )
}

//delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone~")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      )
  }
}

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}

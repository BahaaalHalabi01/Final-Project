import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types"

//register user

export const registerUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors())

  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

//login - get user token

export const loginUser = (userData) => (dispatch) => {
  dispatch(clearErrors())
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save to local storage
      const { token } = res.data
      //set token to local storage
      localStorage.setItem("jwtToken", token)
      //set token to auth header
      setAuthToken(token)
      //decode the token to get user data
      const decodedToken = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decodedToken))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}
//set logged in user

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

//log user out
export const logoutUser = () => (dispatch) => {
  //remove from local storage
  localStorage.removeItem("jwtToken")
  //remove auth header for future requests
  setAuthToken(false)
  //set current user to an empty object which will also set isauth to false
  dispatch(setCurrentUser({}))
}

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}

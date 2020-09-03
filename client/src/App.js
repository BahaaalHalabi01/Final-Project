import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"

import store from "./store"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"

import "./App.css"
import { clearCurrentProfile } from "./actions/profileActions"

if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode the token and get user info and expiration
  const decodedToken = jwt_decode(localStorage.jwtToken)
  //set user annd is authenticated
  store.dispatch(setCurrentUser(decodedToken))
  //check for expired token
  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser())
    //clear current profile
    store.dispatch(clearCurrentProfile())

    //redirect to login
    window.location.href = "/login"
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App

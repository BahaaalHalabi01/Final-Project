import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser } from "./actions/authActions"

import store from "./store"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

import "./App.css"

if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode the token and get user info and expiration
  const decodedToken = jwt_decode(localStorage.jwtToken)
  //set user annd is authenticated
  store.dispatch(setCurrentUser(decodedToken))
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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App

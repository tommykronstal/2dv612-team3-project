import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ auth, userRole, component: Component, ...routeProps }) => {


  return (
  <Route {...routeProps} render={props => {
    console.log(auth, userRole)
    return (
    auth.isAuthenticated && auth.role === userRole ?
      <Component {...props} /> :
      <Redirect to={{ pathname: '/login' }}/>
  )}}/>
)}

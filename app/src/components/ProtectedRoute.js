import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ auth, userRole, component: Component, ...routeProps }) => (
  <Route {...routeProps} render={props => (
    auth.isAuthenticated && auth.role === userRole ?
      <Component {...props} /> :
      <Redirect to={{ pathname: '/login' }}/>
  )}/>
)

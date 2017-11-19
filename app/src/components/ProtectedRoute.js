import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Unauthorized from '../pages/Unauthorized'

const ProtectedRoute = ({ auth, userRole, component: Component, ...routeProps }) => (
  <Route {...routeProps} render={props => {
    if (!auth.isAuthenticated) return <Redirect to={{ pathname: '/login' }} />

    return auth.role === userRole ? <Component {...props} /> : <Unauthorized />
  }} />
)

export default role => withRouter(connect(
  ({auth}) => ({ auth, userRole: role }),
  () => ({})
)(ProtectedRoute))

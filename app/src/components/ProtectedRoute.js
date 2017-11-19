import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const ProtectedRoute = ({ auth, userRole, component: Component, ...routeProps }) => (
  <Route {...routeProps} render={props => {
    console.log(auth)
    if (!auth.isAuthenticated) return <Redirect to={{ pathname: '/login' }} />

    return auth.role === userRole ?
      <Component {...props} /> :
      <div>Unauthorized</div>
  }} />
)

export default role => withRouter(connect(
  ({auth}) => ({ auth, userRole: role }),
  () => ({})
)(ProtectedRoute))

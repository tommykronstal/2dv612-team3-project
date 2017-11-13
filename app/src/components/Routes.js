import React from 'react'
import {Route} from 'react-router-dom'
import {Login} from '../pages/Login'

/**
 * Main Content routes
 * if we want any more endpoints such as /manuals or w/e
 * we can just add another route
 */
export const ContentRoutes = props => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" render={() => <h1>Start Page</h1>} />
  </div>
)

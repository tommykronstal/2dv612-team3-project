import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Login} from '../pages/Login'

/**
 * Placeholder for routes and where the content should be rendered
 * I just made this since I did not know about layout.
 * But this can easily be moved and changed if wanted in the future :)
 */
export class MainContentRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={() => <h1>Start Page</h1>} />
      </div>
    )
  }
}

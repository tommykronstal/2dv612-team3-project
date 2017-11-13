import React from 'react'
import {Route} from 'react-router-dom'
import {Login} from '../pages/Login'
import {Link} from 'react-router-dom'
import Text from './Text'
import styled from 'styled-components'
import Example from './Example'

const SampleContainer = styled.div`
  display: flex;
  flex-direction: row;
`

/**
 * Main Content routes
 * if we want any more endpoints such as /manuals or w/e
 * we can just add another route
 */
export const ContentRoutes = props => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route exact path='/example' component={Example} />
    <Route
      exact
      path="/"
      render={() => {
        return (
          <SampleContainer>
            <Link to="/login">
              <Text>Login</Text>
            </Link>
            <Link to="/">
              <Text>Home</Text>
            </Link>
            <Link to='/example'>
              <Text>
                Example
              </Text>
            </Link>
          </SampleContainer>
        )
      }}
    />
  </div>
)

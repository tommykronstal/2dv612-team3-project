import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Text from './common/Text'
import styled from 'styled-components'

import ProtectedRoute from '../containers/ProtectedRoute'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import AddCompany from '../pages/AddCompany'


const SampleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

/**
 * Main Content routes
 * if we want any more endpoints such as /manuals or w/e
 * we can just add another route
 */
export const ContentRoutes = props => (
  <div>
    <Route exact path='/login' component={Login} />
    <Route exact path='/logout' component={Logout} />
    <ProtectedRoute userRole='ADMIN' exact path='/admin/companies' component={() => <AddCompany/>} />

    <Route
      exact
      path='/'
      render={() => {
        return (
          <SampleContainer>
            <Link to='/admin/companies'>
              <Text>Companies</Text>
            </Link>
          </SampleContainer>
        )
      }}
    />
  </div>
)

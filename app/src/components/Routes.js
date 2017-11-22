import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import USER_TYPES from '../userTypes'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Main from '../pages/Main'
import Welcome from '../pages/Welcome'
import AddCompany from '../pages/AddCompany'
import AddCompanyRep from '../pages/AddCompanyRep'
import NotFound from '../pages/NotFound'
import RegisterConsumer from '../pages/RegisterConsumer'

const AdminRoute = ProtectedRoute(USER_TYPES.ADMIN)
const CompanyAdminRoute = ProtectedRoute(USER_TYPES.COMPANY_ADMIN)
const CompanyUserRoute = ProtectedRoute(USER_TYPES.COMPANY_REP)
const UserRoute = ProtectedRoute(USER_TYPES.USER)

/**
 * Main Content routes
 * if we want any more endpoints such as /manuals or w/e
 * we can just add another route
 */
export const ContentRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <AdminRoute
      exact
      path="/admin"
      component={() => <Redirect to="/admin/companies" />}
    />
    <AdminRoute exact path="/admin/companies" component={AddCompany} />
    <CompanyAdminRoute exact path="/company/admin" component={AddCompanyRep} />
    <CompanyUserRoute exact path="/company/user" component={Welcome} />
    <UserRoute exact path="/user" component={Welcome} />
    <Route exact path="/register" component={RegisterConsumer} />
    <Route component={NotFound} />
  </Switch>
)

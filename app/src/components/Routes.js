import React from 'react'
import {Switch, Route} from 'react-router-dom'

import USER_TYPES from '../userTypes'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Main from '../pages/Main'
import Welcome from '../pages/Welcome'
import AddCompany from '../pages/AddCompany'
import AddCompanyRep from '../pages/AddCompanyRep'
import NotFound from '../pages/NotFound'
import AddProduct from '../pages/AddProduct'
import RegisterConsumer from '../pages/RegisterConsumer'
import NavigationContainer from './common/NavigationContainer'
import NavigationBar from './common/NavigationBar'
import NavigationLink from './common/NavigationLink'
import UpdateProduct from '../pages/UpdateProduct'


const AdminRoutes = ({ match }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/companies`}>Add Company</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <Switch>
      <Route exact path={match.url} component={Welcome} />
      <Route exact path={`${match.url}/companies`} component={AddCompany} />
      <Route component={NotFound} />
    </Switch>
  </NavigationContainer>
)

const CompanyAdminRoutes = ({ match }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/representative`}>Add Representative</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <Switch>
      <Route exact path={match.url} component={Welcome} />
      <Route exact path={`${match.url}/representative`} component={AddCompanyRep} />
      <Route component={NotFound} />
    </Switch>
  </NavigationContainer>
)

const CompanyUserRoutes = ({ match }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/product`} >Add Product</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/product/test`} >Update Product</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <Switch>
      <Route exact path={match.url} component={Welcome} />
      <Route exact path={`${match.url}/product`} component={AddProduct}/>
      <Route exact path={`${match.url}/product/test`} component={UpdateProduct} />
      <Route component={NotFound} />
    </Switch>
  </NavigationContainer>
)

const UserRoutes = ({ match }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <Switch>
      <Route exact path={match.url} component={Welcome} />
      <Route component={NotFound} />
    </Switch>
  </NavigationContainer>
)

const AdminRoute = ProtectedRoute(USER_TYPES.ADMIN)
const CompanyAdminRoute = ProtectedRoute(USER_TYPES.COMPANY_ADMIN)
const CompanyUserRoute = ProtectedRoute(USER_TYPES.COMPANY_REP)
const UserRoute = ProtectedRoute(USER_TYPES.USER)


export const ContentRoutes = () => (
  <Switch>
    <Route exact path='/' component={Main} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/logout' component={Logout} />
    <AdminRoute path='/admin' component={AdminRoutes} />
    <CompanyAdminRoute path='/company/admin' component={CompanyAdminRoutes} />
    <CompanyUserRoute path='/company/user' component={CompanyUserRoutes} />
    <UserRoute path='/user' component={UserRoutes} />
    <Route exact path='/register' component={RegisterConsumer} />
    <Route component={NotFound} />
  </Switch>
)

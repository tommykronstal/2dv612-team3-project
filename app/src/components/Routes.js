import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import USER_TYPES from '../userTypes'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Main from '../pages/Main'
import Welcome from '../pages/Welcome'
import AddCompany from '../pages/AddCompany'
import AddCompanyRep from '../pages/AddCompanyRep'
import AddCategory from '../pages/AddCategory'
import NotFound from '../pages/NotFound'
import AddProduct from '../pages/AddProduct'
import RegisterConsumer from '../pages/RegisterConsumer'
import NavigationContainer from '../containers/NavigationContainer'
import NavigationBar from './common/NavigationBar'
import NavigationLink from './common/NavigationLink'
import UpdateProduct from '../pages/UpdateProduct'
import ListCompanyProducts from '../pages/ListCompanyProducts'
import ListAllProducts from '../pages/ListAllProducts'
import Product from '../pages/Product'
import ProductSearch from '../containers/ProductSearch'

const AdminRoutes = ({ match, location }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/companies`}>Add Company</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/categories`}>Add Category</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>

    <TransitionGroup>
      <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 500, exit: 500 }}>
        <Switch>
          <Route exact path={match.url} component={Welcome} />
          <Route exact path={`${match.url}/companies`} component={AddCompany} />
          <Route exact path={`${match.url}/categories`} component={AddCategory} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>

  </NavigationContainer>
)

const CompanyAdminRoutes = ({ match, location }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/representative`}>Add Representative</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <TransitionGroup>
      <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 500, exit: 500 }}>
        <Switch>
          <Route exact path={match.url} component={Welcome} />
          <Route exact path={`${match.url}/representative`} component={AddCompanyRep} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </NavigationContainer>
)

const CompanyUserRoutes = ({ match, location }) => (
  <NavigationContainer>
    <NavigationBar>
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/product`} >Add Product</NavigationLink>
      <NavigationLink exact={true} to={`${match.url}/products`} >List Products</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <Switch>
      <Route exact path={match.url} component={Welcome} />
      <Route exact path={`${match.url}/product`} component={AddProduct}/>
      <Route exact path={`${match.url}/products`} component={ListCompanyProducts} />
      <Route exact path={`${match.url}/product/:productId`} component={UpdateProduct} />
      <Route component={NotFound} />
    </Switch>
    <TransitionGroup>
      <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 500, exit: 500 }}>
        <Switch>
          <Route exact path={match.url} component={Welcome} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </NavigationContainer>
)

const UserRoutes = ({ match, location }) => (
  <NavigationContainer>
    <NavigationBar>
      <ProductSearch />
      <NavigationLink exact={true} to={match.url}>Start</NavigationLink>
      <NavigationLink exact={false} to={`${match.url}/products`}>All Products</NavigationLink>
      <NavigationLink exact={true} to='/logout'>Logout</NavigationLink>
    </NavigationBar>
    <TransitionGroup>
      <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 500, exit: 500 }}>
        <Switch>
          <Route exact path={match.url} component={Welcome} />
          <Route exact path={`${match.url}/products`} component={ListAllProducts} />
          <Route exact path={`${match.url}/products/:productId`} component={Product} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
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

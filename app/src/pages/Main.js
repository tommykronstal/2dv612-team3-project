import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import USER_TYPES from '../userTypes'

const Main = props => {
  switch (props.auth.role) {
  case USER_TYPES.ADMIN: 
    return <Redirect to='/admin' />
  case USER_TYPES.COMPANY_ADMIN: 
    return <Redirect to='/company/admin' />  
  case USER_TYPES.COMPANY_REP: 
    return <Redirect to='/company/user' />
  case USER_TYPES.USER: 
    return <Redirect to='/user' />  
  default: 
    return <Redirect to='/login' />
  }
} 

export default connect(
  ({auth}) => ({auth}), 
  () => ({})
)(Main)

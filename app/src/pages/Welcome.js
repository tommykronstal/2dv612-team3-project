import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Content from '../components/common/Content'
import Title from '../components/common/Title'

const Welcome = props => (
  <Content>
    <Title>Welcome {props.email}</Title>
    <Link to='/logout'>Logout</Link>
  </Content>
)

export default connect(
  ({auth}) => ({ email: auth.email }), 
  () => ({})
)(Welcome)

import React from 'react'
import {Link} from 'react-router-dom'

import Content from '../components/common/Content'
import Title from '../components/common/Title'

export default () => (
  <Content>
    <Title>Sorry but you dont have access to this content.</Title>
    <Link to='/'>Go to start page</Link>
  </Content>
)

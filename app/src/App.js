import React from 'react'
import Header from './containers/Header'
import StatusModalContainer from './containers/StatusModalContainer'
import { ContentRoutes } from './components/Routes'

export default () => (
  <div>
    <Header />
    <ContentRoutes />
    <StatusModalContainer />
  </div>
)

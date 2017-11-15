import React, {Component} from 'react'
import Header from './components/Header'
import StatusModalContainer from './containers/StatusModalContainer'
import { ContentRoutes } from './components/Routes';

export default class App extends Component {
  render() {

    return (
      <div>
        <Header />
        <ContentRoutes />
        <StatusModalContainer />
      </div>
    )
  }
}

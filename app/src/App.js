import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateText, updateWelcomeMessage} from './actions/example'
import {setStatus} from './actions/status'
import Header from './components/Header'
import Input from './components/Input'
import Button from './components/Button'
import Title from './components/Title'
import Text from './components/Text'
import StatusModalContainer from './containers/StatusModalContainer'
import { ContentRoutes } from './components/Routes';

// Maps the state to App component properties
function mapStateToProps({example}) {
  return example
}

// Maps functions to update state to properties
function mapDispatchToProps(dispatch) {
  return {
    updateText: text => dispatch(updateText(text)),
    updateWelcomeMessage: () => dispatch(updateWelcomeMessage()),
    setStatus: message => dispatch(setStatus(message)),
    updateText: text => dispatch(updateText(text)),
  }
}

class Example extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(Example)

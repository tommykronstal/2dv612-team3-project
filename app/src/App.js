<<<<<<< HEAD
import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {updateText} from './actions/example'
import {MainContentRoutes} from './components/Routes'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const MainContentContainer = styled.div`
  height: 100vh;
  width: 100wv;
`

// Made simple palceholder topbar since I do not know where links should be positioned yet.
const PlaceHolderTopBar = styled.div`
  height: 64px;
  width: 100wv;
`
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateText, updateWelcomeMessage } from './actions/example';
import { setStatus } from './actions/status';

import Header from './components/Header';
import Content from './components/Content';
import Input from './components/Input';
import Button from './components/Button';
import Title from './components/Title';
import Text from './components/Text';
import StatusModalContainer from './containers/StatusModalContainer';
>>>>>>> d0bd8e3ba4596784f21ae791e9e47f5718ae5ec3

// Maps the state to App component properties
function mapStateToProps({example}) {
  return example
}

// Maps functions to update state to properties
function mapDispatchToProps(dispatch) {
  return {
<<<<<<< HEAD
    updateText: text => dispatch(updateText(text)),
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <PlaceHolderTopBar>
          <Link to="/login">
            <p>Login</p>
          </Link>
          <Link to="/">
            <p>Home</p>
          </Link>
        </PlaceHolderTopBar>
        <MainContentContainer>
          <MainContentRoutes />
        </MainContentContainer>
=======
    updateWelcomeMessage: () => dispatch(updateWelcomeMessage()),
    setStatus: (message) => dispatch(setStatus(message)),
    updateText: (text) => dispatch(updateText(text))
  };
}

class App extends Component {

  componentDidMount() {
    this.props.updateWelcomeMessage();
  }

  render() {
    // Received from react-redux connect
    const { text, updateText, message, setStatus } = this.props

    return (
      <div>
        <Header />
        {/* This part should be replaced with react-router */}
        <Content>
          <Title>Result from server<br/>{message}</Title>
          <Text center>{!text ? 'This will change when you write.' : text}</Text>
          <Input type='text' value={text} label='Some text there' onChange={e => updateText(e.target.value)} />
          <Button primary onClick={() => setStatus(text || 'Success')}>Set Status</Button>
        </Content>
        {/* Until here */}
        <StatusModalContainer />
>>>>>>> d0bd8e3ba4596784f21ae791e9e47f5718ae5ec3
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

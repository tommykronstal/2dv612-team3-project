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

// Maps the state to App component properties
function mapStateToProps({example}) {
  return example
}

// Maps functions to update state to properties
function mapDispatchToProps(dispatch) {
  return {
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

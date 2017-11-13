import React, {Component} from 'react'
import styled from 'styled-components'
import {tryLogin} from '../actions/login'
import {connect} from 'react-redux'

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: credentials => dispatch(tryLogin(credentials)),
  }
}

export const Login = connect(state => state, mapDispatchToProps)(
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
      }
    }

    updateField = target => event => {
      this.setState({[target]: event.target.value.trim()})
    }

    handleLogin = () => {
      const payload = {...this.state}
      this.props.tryLogin(payload)
    }

    render() {
      const {username, password} = this.state
      const isDisabled = username.length && password.length ? null : 'disabled'
      const isLoading = this.props.login.isLoading ? <p>SPINNER</p> : null
      return (
        <LoginContainer>
          {isLoading && <p>Spinner</p>}
          <InputContainer>
            <input
              type="text"
              placeholder="username"
              onChange={this.updateField('username')}
            />
            <input
              type="password"
              placeholder="password"
              onChange={this.updateField('password')}
            />
            <input
              type="button"
              disabled={isDisabled}
              value="Login"
              onClick={this.handleLogin}
            />
          </InputContainer>
        </LoginContainer>
      )
    }
  },
)

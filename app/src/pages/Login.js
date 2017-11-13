import React, {Component} from 'react'
import styled from 'styled-components'
import {tryLogin} from '../actions/login'
import {connect} from 'react-redux'
import CenteredForm from '../components/CenteredForm'
import Input from '../components/Input'
import Button from '../components/Button'

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

    handleLogin = async () => {
      const {password, username} = this.state
      if (!password.length && !username.length) return

      const payload = {...this.state}
      this.props.tryLogin(payload)
    }

    render() {
      return (
        <div>
          <Input
            type="text"
            label="Username"
            value={this.state.username}
            onChange={this.updateField('username')}
          />
          <Input
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.updateField('password')}
          />
          <Button
            primary
            loading={this.props.login.isLoading}
            onClick={() => this.handleLogin()}
          >
            Login
          </Button>
        </div>
      )
    }
  },
)

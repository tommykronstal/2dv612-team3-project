import React, {Component} from 'react'
import {tryLogin} from '../actions/login'
import {connect} from 'react-redux'
import CenteredForm from '../components/CenteredForm'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'

class Login extends Component {
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
    if(this.props.login.isLoading) return

    const {password, username} = this.state
    if (!password.length && !username.length) return

    const payload = {...this.state}
    this.props.tryLogin(payload)
  }

  render() {
    return (
      <CenteredForm onSubmit={() => this.handleLogin()}>
        <Title>Login</Title>
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

        >
          Login
        </Button>
      </CenteredForm>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: credentials => dispatch(tryLogin(credentials)),
  }
}

export default connect(state => state, mapDispatchToProps)(Login)

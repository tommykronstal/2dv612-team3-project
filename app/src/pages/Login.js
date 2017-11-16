import React, {Component} from 'react'
import {tryLogin} from '../actions/login'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CenteredForm from '../components/CenteredForm'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  updateField = target => event => {
    this.setState({[target]: event.target.value.trim()})
  }

  handleLogin = async () => {
    if (this.props.loading.isLoading) return

    const {password, email} = this.state
    if (!password.length && !email.length) return

    const payload = {...this.state}
    this.props.tryLogin(payload)
  }

  render() {

    if (this.props.auth.isAuthenticated) return <Redirect to='/' />

    return (
      <CenteredForm onSubmit={() => this.handleLogin()}>
        <Title>Login</Title>
        <Input
          type='email'
          label='E-mail'
          value={this.state.email}
          onChange={this.updateField('email')}
        />
        <Input
          type='password'
          label='Password'
          value={this.state.password}
          onChange={this.updateField('password')}
        />
        <Button
          primary
          loading={this.props.loading.isLoading}

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

export default connect(({auth, loading}) => ({auth, loading}), mapDispatchToProps)(Login)

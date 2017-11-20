import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {LOGIN} from '../formTypes'
import {updateField, submitForm} from '../actions/form'
import {setUserToLoggedIn} from '../actions/auth'
import CenteredForm from '../components/common/CenteredForm'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const Login = ({
  tryLogin,
  updateField,
  form: {email, password},
  loading: {isLoading},
  auth: {isAuthenticated},
}) =>
  isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <CenteredForm onSubmit={tryLogin}>
      <Title>Login</Title>
      <Input
        type="email"
        label="E-mail"
        name="email"
        value={email}
        onChange={updateField}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={updateField}
      />
      <Button primary loading={isLoading}>
        Login
      </Button>
    </CenteredForm>
  )

export default connect(
  ({auth, loading, form}) => ({
    auth,
    loading,
    form: form[LOGIN] || {},
  }),
  dispatch => ({
    tryLogin: () =>
      dispatch(submitForm(LOGIN, '/api/user/login', setUserToLoggedIn, false)),
    updateField: ({target}) =>
      dispatch(updateField(LOGIN, target.name, target.value)),
  }),
)(Login)

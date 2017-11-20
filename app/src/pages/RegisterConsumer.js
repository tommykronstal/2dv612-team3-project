import React, {Component} from 'react'
import CenteredForm from '../components/common/CenteredForm'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import {connect} from 'react-redux'
import {REGISTER_CONSUMER} from '../formTypes'
import {submitForm, updateField} from '../actions/form'
import {setUserToLoggedIn} from '../actions/auth'

const RegisterConsumer = ({
  updateField,
  form: {email, firstname, lastname, password},
}) => (
  <CenteredForm>
    <Title>Register</Title>
    <Input
      type="email"
      label="E-mail"
      name="email"
      value={email}
      onChange={updateField}
    />
    <Input
      type="text"
      label="Firstname"
      name="firstname"
      value={firstname}
      onChange={updateField}
    />
    <Input
      type="text"
      label="Lastname"
      name="lastname"
      value={lastname}
      onChange={updateField}
    />
    <Input
      type="password"
      label="Pasword"
      name="password"
      value={password}
      onChange={updateField}
    />
    <Button primary loading={false}>
      Register
    </Button>
  </CenteredForm>
)

export default connect(
  ({auth, loading, form}) => ({
    auth,
    loading,
    form: form[REGISTER_CONSUMER] || {},
  }),
  dispatch => ({
    tryRegister: () =>
      dispatch(submitForm(REGISTER_CONSUMER, '', setUserToLoggedIn, false)),
    updateField: ({target: {value, name}}) =>
      dispatch(updateField(REGISTER_CONSUMER, name, value)),
  }),
)(RegisterConsumer)

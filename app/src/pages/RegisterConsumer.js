import React from 'react'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import CenteredForm from '../components/common/CenteredForm'
import Button from '../components/common/Button'
import {connect} from 'react-redux'
import {REGISTER_CONSUMER} from '../formTypes'
import {submitForm, updateField} from '../actions/form'
import {setUserToLoggedIn} from '../actions/auth'
import {Redirect} from 'react-router-dom'

export const RegisterConsumer = ({
  updateField,
  tryRegister,
  loading: {isLoading},
  form: {email, firstName, lastName, password},
  auth: {isAuthenticated},
}) =>
  isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <CenteredForm onSubmit={tryRegister}>
      <Title>Register</Title>
      <Input
        type='email'
        label='E-mail'
        name='email'
        value={email}
        onChange={updateField}
      />
      <Input
        type='text'
        label='Firstname'
        name='firstName'
        value={firstName}
        onChange={updateField}
      />
      <Input
        type='text'
        label='Lastname'
        name='lastName'
        value={lastName}
        onChange={updateField}
      />
      <Input
        type='password'
        label='Pasword'
        name='password'
        value={password}
        onChange={updateField}
      />
      <Button primary loading={isLoading}>
        Register
      </Button>
    </CenteredForm>
  )

export const mapStateToProps = ({auth, loading, form}) => ({
  auth,
  loading,
  form: form[REGISTER_CONSUMER] || {},
})

export const mapDispatchToProps = dispatch => ({
  tryRegister: () =>
    dispatch(
      submitForm(
        REGISTER_CONSUMER,
        '/api/user/register',
        setUserToLoggedIn,
        false
      ),
    ),
  updateField: ({target: {value, name}}) =>
    dispatch(updateField(REGISTER_CONSUMER, name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConsumer)

import React from 'react'
import {connect} from 'react-redux'

import {ADD_COMPANY} from '../formTypes'
import {updateField, submitForm} from '../actions/form'
import { setStatus } from '../actions/status'
import Content from '../components/common/Content'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const AddCompany = props => (
  <Content>
    <form onSubmit={event => { 
      event.preventDefault() 
      props.addCompany()
    }}>
      <Title>Add a New Company</Title>
      <Input
        value={props.form.companyName}
        type='text'
        name='companyName'
        label='Company name'
        onChange={props.updateField}
      />
      <Input
        value={props.form.firstName}
        type='text'
        name='firstName'
        label='Administrators First Name'
        onChange={props.updateField}
      />
      <Input
        value={props.form.lastName}
        type='text'
        name='lastName'
        label='Administrators Last Name'
        onChange={props.updateField}
      />
      <Input
        value={props.form.email}
        type='email'
        name='email'
        label='Administrators E-Mail'
        onChange={props.updateField}
      />
      <Input
        value={props.form.password}
        type='password'
        name='password'
        label='Password'
        onChange={props.updateField}
      />
      <Button primary loading={props.loading.isLoading}>
        Add
      </Button>
    </form>
  </Content>
)

export default connect(
  ({loading, form}) => ({
    loading, 
    form: form[ADD_COMPANY] || {}
  }),
  dispatch => ({
    addCompany: () => dispatch(submitForm(
      ADD_COMPANY, 
      '/api/company/register', 
      _ => setStatus('Company Created')
    )),
    updateField: ({target}) => dispatch(updateField(ADD_COMPANY, target.name, target.value))   
  })
)(AddCompany)

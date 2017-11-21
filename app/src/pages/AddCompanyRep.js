import React from 'react'
import {connect} from 'react-redux'

import {ADD_COMPANY_REP} from '../formTypes'
import {updateField, submitForm} from '../actions/form'
import { setStatus } from '../actions/status'
import Content from '../components/common/Content'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const AddCompanyRep = props => (
  <Content>
    <form onSubmit={event => { 
      event.preventDefault() 
      props.addCompanyRep()
    }}>
      <Title>Add a Company Representative</Title>
      <Input
        value={props.form.firstName}
        type='text'
        name='firstName'
        label='Representatives First Name'
        onChange={props.updateField}
      />
      <Input
        value={props.form.lastName}
        type='text'
        name='lastName'
        label='Representatives Last Name'
        onChange={props.updateField}
      />
      <Input
        value={props.form.email}
        type='email'
        name='email'
        label='Representatives E-Mail'
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
    form: form[ADD_COMPANY_REP] || {}
  }),
  dispatch => ({
    addCompanyRep: () => dispatch(submitForm(
      ADD_COMPANY_REP, 
      '/api/company/rep/register', 
      _ => setStatus('Company representative Created')
    )),
    updateField: ({target}) => dispatch(updateField(ADD_COMPANY_REP, target.name, target.value))   
  })
)(AddCompanyRep)

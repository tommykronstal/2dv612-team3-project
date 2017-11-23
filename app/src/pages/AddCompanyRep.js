import React from 'react'
import {connect} from 'react-redux'

import {ADD_COMPANY_REP} from '../formTypes'
import {updateField, submitForm} from '../actions/form'
import { setStatus } from '../actions/status'
import FormSection from '../components/common/FormSection'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

export const AddCompanyRep = props => (
  <FormSection onSubmit={() => props.addCompanyRep(props.companyId)}>
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
    <Input
      value={props.form.password}
      type='password'
      name='password'
      label='Password'
      onChange={props.updateField}
    />
    <Button primary loading={props.isLoading}>
      Add
    </Button>
  </FormSection>
)

export const handleResponse = _ => setStatus('Company representative Created')

export const mapStateToProps = ({loading, auth, form}) => ({
  isLoading: loading.isLoading, 
  companyId: auth.companyId,
  form: form[ADD_COMPANY_REP] || {}
})

export const mapDispatchToProps = dispatch => ({
  addCompanyRep: companyId => dispatch(submitForm(
    ADD_COMPANY_REP, 
    `/api/company/${companyId}`, 
    handleResponse
  )),
  updateField: ({target}) => dispatch(updateField(ADD_COMPANY_REP, target.name, target.value)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyRep)

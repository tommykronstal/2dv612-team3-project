import React from 'react';
import {connect} from 'react-redux';

import {ADD_CATEGORY} from '../formTypes';
import {updateField, submitForm} from '../actions/form'
import {setStatus} from '../actions/status'
import FormSection from '../components/common/FormSection'
import Title from '../components/common/Title'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

export const AddCategory = props => (
  <FormSection onSubmit={props.addCategory}>
    <Title>Add a new category</Title>
    <Input
      value={props.form.categoryName}
      type='text'
      name='categoryName'
      label='Category Name'
      onChange={props.updateField}
    />
    <Button primary loading={props.loading.isLoading}>
      Add
    </Button>
  </FormSection>
)

export const handleResponse = _ => setStatus('Category Added')

export const mapStateToProps = ({ loading, form }) => ({
  loading,
  form: form[ADD_CATEGORY] || {}
})

export const mapDispatchToProps = dispatch => ({
  addCategory: () => dispatch(submitForm(
    ADD_CATEGORY,
    '/api/admin/category',
    handleResponse
  )),
  updateField: ({ target }) => dispatch(updateField(ADD_CATEGORY, target.name, target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
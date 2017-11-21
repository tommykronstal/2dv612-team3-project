import {CLEAR_FORM, SUBMIT_FORM, UPDATE_FIELD} from './types'

export const submitForm = (form, endpoint, action, tokenRequired = true, role = '') => ({
  type: SUBMIT_FORM,
  form,
  endpoint,
  action,
  tokenRequired,
  role
})

export const clearForm = form => ({
  type: CLEAR_FORM,
  form
})

export const updateField = (form, field, value) => ({
  type: UPDATE_FIELD,
  form,
  field,
  value
})

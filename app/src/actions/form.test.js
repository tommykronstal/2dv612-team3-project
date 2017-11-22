import {CLEAR_FORM, SUBMIT_FORM, UPDATE_FIELD} from './types'
import { submitForm, clearForm, updateField } from './form'

const MY_FORM = 'MY_FORM'

describe('submitForm', () => {

  test('should return correct action', () => {
    const expected = { 
      type: SUBMIT_FORM, 
      form: MY_FORM, 
      endpoint: '/a/b',
      action: () => {},
      tokenRequired: false
    }

    expect(submitForm(
      expected.form, 
      expected.endpoint, 
      expected.action, 
      expected.tokenRequired
    )).toEqual(expected)
  })

  test('should have tokenRequired set to true by default', () => {
    const expected = { 
      type: SUBMIT_FORM, 
      form: MY_FORM, 
      endpoint: '/a/b',
      action: () => {},
      tokenRequired: true
    }

    expect(submitForm(
      expected.form, 
      expected.endpoint, 
      expected.action, 
    )).toEqual(expected)
  })
})

describe('clearForm', () => {
  test('should return correct action', () => {
    expect(clearForm('form')).toEqual({ type: CLEAR_FORM, form: 'form'})
  })
})

describe('updateField', () => {
  test('should return correct action', () => {
    expect(updateField('form', 'field', 'value')).toEqual({ 
      type: UPDATE_FIELD, 
      form: 'form',
      field: 'field',
      value: 'value'
    })
  })
})

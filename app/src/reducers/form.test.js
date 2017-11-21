import { CLEAR_FORM, UPDATE_FIELD } from '../actions/types'
import reducer from './form'

const MY_FORM = 'MY_FORM'

test('should return current state if actions is missing', () => {
  const action = { type: 'BAH' }
  const state = { yay: 'woo' }

  expect(reducer(state, action))
    .toEqual(state)
})

test('should have empty object as default state', () => {
  expect(reducer()).toEqual({})
})

test('should be able to clear form', () => {
  const action = { type: CLEAR_FORM, form: MY_FORM }
  const state = { [MY_FORM]: { username: 'kalle' } }

  expect(reducer(state, action))
    .toEqual({ [MY_FORM]: {} })
})

test('should be able to add field', () => {
  const action = { type: UPDATE_FIELD, form: MY_FORM, field: 'username', value: 'kalle' }
  const state = undefined

  expect(reducer(state, action))
    .toEqual({ MY_FORM: { username: 'kalle' } })
})


test('should be able to update field', () => {
  const action = { type: UPDATE_FIELD, form: MY_FORM, field: 'username', value: 'kula' }
  const state = {
    [MY_FORM]: {
      username: 'kalle',
      password: 'secret'
    }
  }

  expect(reducer(state, action))
    .toEqual({ MY_FORM: { username: 'kula', password: 'secret' } })
})


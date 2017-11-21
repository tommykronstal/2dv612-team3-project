import {put, call } from 'redux-saga/effects'
import {TOGGLE_LOADING, SET_STATUS} from '../actions/types'
import { formRequest } from './form'
import { clearForm } from '../actions/form'
import {post} from '../lib/http'

const MY_FORM = 'MY_FORM'

let data
let selectedState
let response
let generator

describe('formRequest with action without authorization', () => {
  beforeAll(() => {
    data = {
      endpoint: '/a/b',
      form: MY_FORM,
      action: response => response,
      tokenRequired: false
    }

    selectedState = {
      token: 'wooo',
      payload: {
        username: 'wah',
        password: 'wah'
      }
    }

    response = {
      status: 200
    }

    generator = formRequest(data)
  })

  test('should show spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })

  test('should call post with correct headers and body', () => {
    generator.next()
    expect(generator.next(selectedState).value).toEqual(call(post, data.endpoint, {
      headers: undefined,
      body: JSON.stringify(selectedState.payload)      
    }))
  })

  test('should call action with response on success', () => {
    expect(generator.next({ status: 200 }).value)
      .toEqual(put(data.action(response)))
  })

  test('should clear form', () => {
    expect(generator.next().value)
      .toEqual(put(clearForm(MY_FORM)))
  })

  test('should stop spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })
})

describe('formRequest with authorization', () => {
  beforeAll(() => {
    data = {
      endpoint: '/a/b',
      form: MY_FORM,
      tokenRequired: true,
      role: 'USER'
    }

    selectedState = {
      token: 'wooo',
      payload: {
        username: 'wah',
        password: 'wah'
      }
    }

    response = {
      status: 200
    }

    generator = formRequest(data)
  })

  test('should show spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })

  test('should call post with correct headers and body', () => {
    generator.next()
    expect(generator.next(selectedState).value).toEqual(call(post, data.endpoint, {
      headers: {
        Authorization: selectedState.token
      },
      body: JSON.stringify(selectedState.payload)      
    }))
  })

  test('should clear form', () => {
    expect(generator.next(response).value)
      .toEqual(put(clearForm(MY_FORM)))
  })

  test('should stop spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })
})

describe('formRequest that fails', () => {
  beforeAll(() => {
    data = {
      endpoint: '/a/b',
      form: MY_FORM,
      tokenRequired: false,
      role: 'USER'
    }

    selectedState = {
      token: 'wooo',
      payload: {
        username: 'wah',
        password: 'wah'
      }
    }

    response = {
      status: 403,
      message: 'Oh no failue'
    }

    generator = formRequest(data)
  })

  test('should show spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })

  test('should call post with correct headers and body', () => {
    generator.next()
    expect(generator.next(selectedState).value).toEqual(call(post, data.endpoint, {
      headers: undefined,
      body: JSON.stringify(selectedState.payload)      
    }))
  })

  test('should set correct error message', () => {
    expect(generator.next(response).value)
      .toEqual(put({ type: SET_STATUS, warning: true, message: response.message}))
  })

  test('should stop spinner', () => {
    expect(generator.next().value)
      .toEqual(put({ type: TOGGLE_LOADING }))
  })
})

import {TRY_LOGIN, TOGGLE_LOADING} from './types'
import {call, put} from 'redux-saga/effects'

export const tryLogin = (credentials) => ({
  type: TRY_LOGIN,
  credentials
})

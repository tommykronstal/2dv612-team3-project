import {TRY_LOGIN} from './types'
import {call, put} from 'redux-saga/effects'

export function tryLogin(credentials) {
  return {
    type: TRY_LOGIN,
    credentials
  }
}

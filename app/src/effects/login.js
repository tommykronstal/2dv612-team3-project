import {put, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {TRY_LOGIN, TOGGLE_LOADING} from '../actions/types'
import {post} from '../lib/http'

export function* watchLogin(...args) {
  yield takeEvery(TRY_LOGIN, tryLogin)
}

export function* tryLogin({credentials: {username, password}}) {

  // Start loading animation after user has clicked login
  yield put({type: TOGGLE_LOADING})

  /**
   * this will need to change when the login functionality for the backend is implemented!
   */
  // const response = yield post('http://localhost:4000/api/login')

  // Stop spinner animation after login response has been handled.
  yield put({type: TOGGLE_LOADING})
}

import {put, takeEvery} from 'redux-saga/effects'
import {
  TRY_LOGIN,
  TOGGLE_LOADING,
  SET_STATUS,
  SET_LOGGED_IN
} from '../actions/types'
import {post} from '../lib/http'

export function* watchLogin(...args) {
  yield takeEvery(TRY_LOGIN, tryLogin)
}

export function* tryLogin({credentials: {email, password}}) {
  // Start loading animation after user has clicked login
  yield put({type: TOGGLE_LOADING})

  /**
   * this will need to change when the login functionality for the backend is implemented!
   */
  const response = yield post('/api/user/login', {
    body: JSON.stringify({ email, password })
  })

  if(response.status !== 200) {
    if(response.message) yield put({type: SET_STATUS, warning: true, message: response.message})
  } else {
    yield put({ type: SET_LOGGED_IN, token: response.token })
  }

  // Stop spinner animation after login response has been handled.
  yield put({type: TOGGLE_LOADING})
}

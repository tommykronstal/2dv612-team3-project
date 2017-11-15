import {put, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {
  TRY_LOGIN,
  TOGGLE_LOADING,
  SET_LOGGED_IN
} from '../actions/types'
import {post} from '../lib/http'

export function* watchLogin(...args) {
  yield takeEvery(TRY_LOGIN, tryLogin)
}

export function* tryLogin({credentials: {username, password}}) {
  // Start loading animation after user has clicked login
  yield put({type: TOGGLE_LOADING})

  // Faking the request and setting a default jwt
  yield delay(1000)
  yield put({ type: SET_LOGGED_IN, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indvb29vIiwicm9sZSI6IkFETUlOIn0.GSQBcHK-oc2nuAeiwn-3Ns3NesRG-t-kbY7Vrpw5AEk'})

  /**
   * this will need to change when the login functionality for the backend is implemented!
   */
  // const response = yield post('http://localhost:4000/api/login', {
  //   body: JSON.stringify({
  //     username,
  //     password,
  //   }),
  // })

  // Stop spinner animation after login response has been handled.
  yield put({type: TOGGLE_LOADING})
}

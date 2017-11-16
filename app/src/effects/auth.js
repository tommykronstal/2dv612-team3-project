import {takeEvery} from 'redux-saga/effects'
import {SET_LOGGED_IN, LOGOUT} from '../actions/types'
import {storeJwtToken, resetJwtToken} from '../lib/jwt'

export function getToken (state) {
  return state.auth.jwt
}

export function* watchAuthenticationActions (...args) {
  yield takeEvery(SET_LOGGED_IN, storeJWT)
  yield takeEvery(LOGOUT, resetJWT)
}

export function* storeJWT ({ token }) {
  yield storeJwtToken(token)
}

export function* resetJWT () {
  yield resetJwtToken()
}

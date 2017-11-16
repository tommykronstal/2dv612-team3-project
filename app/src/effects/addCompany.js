import {put, takeEvery, select} from 'redux-saga/effects'
import {
  TRY_ADD_COMPANY,
  TOGGLE_LOADING,
  SET_STATUS
} from '../actions/types'
import {post} from '../lib/http'
import { getToken } from './auth'

export function* watchCompany(...args) {
  yield takeEvery(TRY_ADD_COMPANY, tryAddCompany)
}

export function* tryAddCompany({companyDetails: {name: companyName, ...companyAdmin}}) {
  // Start loading animation after user has clicked login
  yield put({type: TOGGLE_LOADING})
  const token = yield select(getToken)

  const response = yield post('/api/company/register', {
    headers: { 'Authorization': token },
    body: JSON.stringify({companyName, companyAdmin})
  })

  if(response.status !== 201) {
    return
  }

  // Stop spinner animation after login response has been handled.
  yield put({type: TOGGLE_LOADING})
  yield put({type: SET_STATUS, message: `${companyName} created`})
}

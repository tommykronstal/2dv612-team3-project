import {put, takeEvery} from 'redux-saga/effects'
import {
  TRY_ADD_COMPANY,
  TOGGLE_LOADING,
  SET_LOGGED_IN,
  SET_STATUS
} from '../actions/types'
import {post} from '../lib/http'

export function* watchCompany(...args) {
  yield takeEvery(TRY_ADD_COMPANY, tryAddCompany)
}

export function* tryAddCompany({companyDetails}) {
  // Start loading animation after user has clicked login
  yield put({type: TOGGLE_LOADING})

  const response = yield post('/api/company', {
    body: JSON.stringify(companyDetails)
  })

  if(response.status !== 201) {
    return
  }

  // Stop spinner animation after login response has been handled.
  yield put({type: TOGGLE_LOADING})
  yield put({type: SET_STATUS, message: `${companyDetails.name} created`})
}

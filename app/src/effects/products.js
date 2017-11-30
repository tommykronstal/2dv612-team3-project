import {TOGGLE_LOADING, FETCH_PRODUCTS, SET_PRODUCTS} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get} from '../lib/http'

export function* watchProductActions() {
  yield takeEvery(FETCH_PRODUCTS, fetchProducts)
}

export function* fetchProducts() {

  yield put({type: TOGGLE_LOADING})

  const { token, companyId } = yield select(state => ({ token: state.auth.jwt, companyId: state.auth.companyId }))

  const products = yield call(get, `/api/company/${companyId}/product`, { headers: { Authorization: token }})

  yield put({type: SET_PRODUCTS, products})
  
  yield put({type: TOGGLE_LOADING})
}

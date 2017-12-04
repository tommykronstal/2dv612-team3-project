import {TOGGLE_LOADING, FETCH_PRODUCTS, SET_PRODUCTS, FETCH_PRODUCT} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get} from '../lib/http'

export function* watchProductActions() {
  yield takeEvery(FETCH_PRODUCTS, fetchProducts)
  yield takeEvery(FETCH_PRODUCT, fetchProduct)
}

export function* fetchProducts() {

  yield put({type: TOGGLE_LOADING})

  const { token, companyId } = yield select(state => ({ token: state.auth.jwt, companyId: state.auth.companyId }))

  const endpoint = companyId ?  `/api/company/${companyId}/product` : '/api/product'

  const products = yield call(get, endpoint, { headers: { Authorization: token }})

  yield put({type: SET_PRODUCTS, products})
  
  yield put({type: TOGGLE_LOADING})
}


export function *fetchProduct({productId}) {
  /**
   * Skeleton code for fetch product action
   */
}
import {
  TOGGLE_LOADING,
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCT,
  FETCH_PRODUCT,
  SET_RATING,
  UPDATE_MATERIAL,
} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get, post} from '../lib/http'

export function* watchProductActions() {
  yield takeEvery(FETCH_PRODUCTS, fetchProducts)
  yield takeEvery(FETCH_PRODUCT, fetchProduct)
  yield takeEvery(SET_RATING, setRating)
}

export function* fetchProducts() {
  yield put({type: TOGGLE_LOADING})

  const {token, companyId} = yield select(state => ({
    token: state.auth.jwt,
    companyId: state.auth.companyId,
  }))

  const endpoint = companyId
    ? `/api/company/${companyId}/product`
    : '/api/product'

  const products = yield call(get, endpoint, {headers: {Authorization: token}})

  yield put({type: SET_PRODUCTS, products})
  yield put({type: TOGGLE_LOADING})
}

export function* fetchProduct({productId}) {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(({auth}) => ({
    token: auth.jwt,
  }))

  const product = yield call(get, `/api/product/${productId}`, {
    headers: {
      Authorization: token,
    },
  })

  yield put({type: SET_PRODUCT, product})
  yield put({type: TOGGLE_LOADING})
}

export function* setRating({materialId, rating}) {
  const {token, product} = yield select(({auth, products: {product}}) => ({
    token: auth.jwt,
    product,
  }))

  const material = yield call(
    post,
    `/api/product/material/${materialId}/rating`,
    {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({rating}),
    }
  )

  // annotation is not included in the material resonse
  const {annotation} = product.materials.find(({_id}) => materialId === _id)
  yield put({type: UPDATE_MATERIAL, material: {...material, annotation}})
}

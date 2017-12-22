import {FETCH_CATEGORIES, SET_CATEGORIES, TOGGLE_LOADING} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get} from '../lib/http'

export function* watchCategoriesActions() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategories)
}

export function* fetchCategories() {

  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  const categories = yield call(get, '/api/category', { headers: { Authorization: token }})

  yield put({type: SET_CATEGORIES, categories})
  
  yield put({type: TOGGLE_LOADING})
}

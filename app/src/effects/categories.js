import {get} from '../lib/http'
import {FETCH_CATEGORIES, SET_CATEGORIES} from '../actions/types'
import {put, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'

export function* watchCategoriesActions() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategories)
}

export function* fetchCategories() {
  const categories = [{category: 'Vitvaror'}, {category: 'Elektronik'}]
  yield delay(500)
  yield put({type: SET_CATEGORIES, categories})
}

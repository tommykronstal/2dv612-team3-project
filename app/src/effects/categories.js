import {get} from '../lib/http'
import {FETCH_CATEGORIES, SET_CATEGORIES, UPDATE_FIELD} from '../actions/types'
import {put, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import { ADD_PRODUCT } from '../formTypes';

export function* watchCategoriesActions() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategories)
}

export function* fetchCategories({updateConfig: {form, field}}) {
  const categories = [{category: 'Vitvaror'}, {category: 'Elektronik'}]
  yield delay(500)
  yield put({type: SET_CATEGORIES, categories})

  /**
   * Giving the specific form a default value
   * Doing like this since the addProduct form
   * uses a dropdown for a category and
   * this dropdown should have a default value
   */
  yield put({
    type: UPDATE_FIELD,
    form: form,
    field: field,
    value: categories[0].category
  })
}

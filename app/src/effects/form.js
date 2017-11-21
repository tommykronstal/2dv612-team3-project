import {put, takeEvery, select} from 'redux-saga/effects'
import {SUBMIT_FORM, TOGGLE_LOADING, SET_STATUS} from '../actions/types'
import {clearForm} from '../actions/form'
import {post} from '../lib/http'

export function* watchFormActions() {
  yield takeEvery(SUBMIT_FORM, formRequest)
}

export function* formRequest({endpoint, form, action, tokenRequired, role}) {
  yield put({type: TOGGLE_LOADING})

  const {token, payload} = yield select(state => ({
    token: state.auth.jwt,
    payload: {
      ...role && {role},
      ...state.form[form]
    }
  }))

  const response = yield post(endpoint, {
    headers: tokenRequired && token ? {Authorization: token} : undefined,
    body: JSON.stringify(payload),
  })

  if (response.status === 200 || response.status === 201) {
    if (action) yield put(action(response))


    yield put(clearForm(form))
  } else {
    if (response.message)
      yield put({type: SET_STATUS, warning: true, message: response.message})
  }

  yield put({type: TOGGLE_LOADING})
}

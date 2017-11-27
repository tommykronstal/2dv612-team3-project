import {put, takeEvery, select, call} from 'redux-saga/effects'
import {SUBMIT_FORM, TOGGLE_LOADING, SET_STATUS} from '../actions/types'
import {clearForm} from '../actions/form'
import {post} from '../lib/http'
import {UPDATE_PRODUCT} from '../formTypes'

export function* watchFormActions() {
  yield takeEvery(SUBMIT_FORM, formRequest)
}

export function* formRequest({endpoint, form, action, tokenRequired}) {
  yield put({type: TOGGLE_LOADING})

  const {token, payload} = yield select(state => ({
    token: state.auth.jwt,
    payload: {
      ...state.form[form],
    },
  }))

  // collects special header if form want to send differnt type of data
  const specialHeader = getSpecialHeaders(form)
  const tokenHeader = {...(token && tokenRequired && {Authorization: token})}

  const response = yield call(post, endpoint, {
    headers: {
      ...specialHeader,
      ...tokenHeader,
    },
    body: Object.keys(specialHeader).length ? payload : JSON.stringify(payload),
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

const getSpecialHeaders = form =>
  [UPDATE_PRODUCT].includes(form) ? {'Content-Type': 'multipart/form-data'} : {}

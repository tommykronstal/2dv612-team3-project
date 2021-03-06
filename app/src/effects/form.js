import {put, takeEvery, select, call} from 'redux-saga/effects'
import {SUBMIT_FORM, TOGGLE_LOADING, SET_STATUS} from '../actions/types'
import {clearForm} from '../actions/form'
import {post, put as httpPut} from '../lib/http'
import {UPDATE_PRODUCT} from '../formTypes'

export function* watchFormActions() {
  yield takeEvery(SUBMIT_FORM, formRequest)
}

export function* formRequest({endpoint, form, action, tokenRequired, update}) {
  yield put({type: TOGGLE_LOADING})


  const {token, payload} = yield select(state => ({
    token: state.auth.jwt,
    payload: {
      ...state.form[form],
    },
  }))

  const tokenHeader = {...(token && tokenRequired && {Authorization: token})}

  if (form === UPDATE_PRODUCT) {
    yield sendProductFile(endpoint, token, payload, tokenHeader, action, form, update)
    return
  }

  const response = yield call(update ? httpPut :  post, endpoint, {
    headers: {
      ...tokenHeader,
    },
    body: JSON.stringify(payload)
  })

  yield handleResponse(response, form, action)
}

function* handleResponse(response, form, action) {
  if (response.status === 200 || response.status === 201) {
    if (action) {
      yield put(action(response))
    }
    yield put(clearForm(form))
  } else {
    if (response.message)
      yield put({type: SET_STATUS, warning: true, message: response.message})
  }

  yield put({type: TOGGLE_LOADING})
}


/**
 * Used to send data as a form.
 * Need to send it like this since original function to submit forms
 * assumes that it's JSON. (Maybe needs some tweaking in the future...)
 */
function* sendProductFile(endpoint, token, payload, tokenHeader = {}, action, form, update) {
  const formData = new FormData()

  for (let key in payload) {
    formData.append(key, payload[key])
  }

  const response = yield call(update ? httpPut :  post, endpoint, {
    headers: {
      ...tokenHeader
    },
    isJsonPayload: false,
    body: formData
  })

  yield handleResponse(response, form, action)
}
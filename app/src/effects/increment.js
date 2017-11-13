import {delay} from 'redux-saga'
import {put, takeEvery} from 'redux-saga/effects'

import {INCREMENT, UPDATE_TEXT, TRY_LOGIN, TOGGLE_LOADING} from '../actions/types'

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({type: INCREMENT})
}

export function* toggleLoading() {
  yield put({type: TOGGLE_LOADING })
}




// Our watcher Saga: spawn a new incrementAsync task on each UPDATE_TEXT
export function* watchIncrementAsync() {
  yield takeEvery(UPDATE_TEXT, incrementAsync)
  // yield takeEvery(TRY_LOGIN, toggleLoading)
}

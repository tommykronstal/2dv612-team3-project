import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { SET_STATUS, DISMISS_STATUS } from '../actions/types';

export function* dismissStatusAfter5Seconds() {
  yield delay(5000);
  yield put({ type: DISMISS_STATUS });
}

// Our watcher Saga: spawn a new incrementAsync task on each UPDATE_TEXT
export function* watchNewStatuses() {
  yield takeEvery(SET_STATUS, dismissStatusAfter5Seconds);
}

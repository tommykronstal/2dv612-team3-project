import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { INCREMENT, UPDATE_TEXT } from '../actions/types';

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: INCREMENT });
}

// Our watcher Saga: spawn a new incrementAsync task on each UPDATE_TEXT
export function* watchIncrementAsync() {
  yield takeEvery(UPDATE_TEXT, incrementAsync);
}

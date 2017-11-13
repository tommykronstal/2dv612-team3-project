import { put, takeEvery } from 'redux-saga/effects';
import { UPDATE_WELCOME_MESSAGE } from '../actions/types';

export function* fetchWelcomeMessage() {
  const result = yield fetch('/api');
  const { message } = yield result.json();

  yield put({ type: UPDATE_WELCOME_MESSAGE, message });
}

export function* watchUpdateWelcomeMessage() {
  yield takeEvery(UPDATE_WELCOME_MESSAGE, fetchWelcomeMessage);
}

import { all } from 'redux-saga/effects';
import { watchNewStatuses } from './status';
import { watchUpdateWelcomeMessage } from './welcome';

// single entry point to start all Sagas at once
export default function* effects() {
  yield all([
    watchUpdateWelcomeMessage(),
    watchNewStatuses()
  ]);
}

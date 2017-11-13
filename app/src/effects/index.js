import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from './increment';
import {tryLogin} from './login'
import { watchNewStatuses } from './status';
import { watchUpdateWelcomeMessage } from './welcome';

// single entry point to start all Sagas at once
export default function* effects() {
  yield all([
    watchIncrementAsync(),
    watchUpdateWelcomeMessage(),
    watchNewStatuses()
  ]);
}

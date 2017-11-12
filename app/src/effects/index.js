import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from './increment';
import { watchNewStatuses } from './status';


// single entry point to start all Sagas at once
export default function* effects() {
  yield all([
    watchIncrementAsync(),
    watchNewStatuses()
  ]);
}

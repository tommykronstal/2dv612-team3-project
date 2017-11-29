import { all } from 'redux-saga/effects'
import { watchNewStatuses } from './status'
import { watchAuthenticationActions } from './auth'
import { watchFormActions } from './form'
import { watchCategoriesActions } from './categories';

// single entry point to start all Sagas at once
export default function *effects() {
  yield all([
    watchNewStatuses(),
    watchAuthenticationActions(),
    watchFormActions(),
    watchCategoriesActions(),
  ])
}

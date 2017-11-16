import { all } from 'redux-saga/effects';
import { watchNewStatuses } from './status';
import { watchLogin } from './login';
import { watchAuthenticationActions } from './auth';
import { watchCompany } from './addCompany';

// single entry point to start all Sagas at once
export default function* effects() {
  yield all([
    watchNewStatuses(),
    watchLogin(),
    watchAuthenticationActions(),
    watchCompany()
  ]);
}

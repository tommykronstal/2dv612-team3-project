import {put, takeEvery} from 'redux-saga/effects'
import * as types from '../actions/types'


function* doLogin(args) {
  console.log('(doLogin) args :', args)
  put({
    type: types.TOGGLE_LOADING
  })
}

export function* watchLogin(args) {
  console.log('watch args :', args)
  yield takeEvery(types.TRY_LOGIN, doLogin)
}

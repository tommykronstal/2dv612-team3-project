import {TOGGLE_LOADING, FETCH_NOTIFICATIONS, SET_NOTIFICATIONS, REMOVE_NOTIFICATION} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get, deleteReq} from '../lib/http'

export function* watchNotificationsActions() {
  yield takeEvery(FETCH_NOTIFICATIONS, fetchNotifications)
  yield takeEvery(REMOVE_NOTIFICATION, removeNotification)
}

export function* fetchNotifications() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  const notifications = yield call(get, '/api/notifications', { headers: { Authorization: token }})

  yield put({type: SET_NOTIFICATIONS, notifications})
  
  yield put({type: TOGGLE_LOADING})
}

export function* removeNotification(action) {
  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  yield call(deleteReq, '/api/notifications/' + action.notificationId, { headers: { Authorization: token }})
}

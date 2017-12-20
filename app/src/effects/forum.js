import {
  FETCH_FORUM_THREADS,
  SET_FORUM_THREADS,
  SET_USER_FORUM_THREADS,
  TOGGLE_LOADING,
  FETCH_USER_FORUM_THREADS
} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get} from '../lib/http'

export function* watchForumActions() {
  yield takeEvery(FETCH_FORUM_THREADS, fetchForumThreads)
  yield takeEvery(FETCH_USER_FORUM_THREADS, fetchUserForumThreads)
}

export function* fetchForumThreads() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  const threads = yield call(get, '/api/forum/thread', {headers: {Authorization: token}})

  yield put({type: SET_FORUM_THREADS, threads})
  yield put({type: TOGGLE_LOADING})
}

export function* fetchUserForumThreads() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  const threads = yield call(get, '/api/forum/thread/user', {headers: {Authorization: token}})

  yield put({type: SET_USER_FORUM_THREADS, ...threads})
  yield put({type: TOGGLE_LOADING})
}
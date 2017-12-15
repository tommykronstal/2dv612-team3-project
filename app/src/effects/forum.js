import {
  FETCH_FORUM_THREADS,
  SET_FORUM_THREADS,
  TOGGLE_LOADING
} from '../actions/types'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get, post} from '../lib/http'

export function* watchForumActions() {
  yield takeEvery(FETCH_FORUM_THREADS, fetchForumThreads)
}

export function* fetchForumThreads() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt
  }))

  // const threads = yield call(get, '/api/forum/thread', {headers: {Authorization: token}})
  const threads = [
    {
      _id: 'rgiit904kpoegkeop',
      title: 'Question about an iphone?',
      user: {
        firstName: 'john'
      }
    },
    {
      _id: 'dir392ir9032i0g',
      title: 'Question about something else',
      user: {
        firstName: 'paul'
      }
    }
  ]

  yield put({type: SET_FORUM_THREADS, threads})
  yield put({type: TOGGLE_LOADING})
}
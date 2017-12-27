import {
  FETCH_FORUM_THREADS,
  SET_FORUM_THREADS,
  FETCH_FORUM_THREAD,
  SET_THREAD,
  ADD_ANSWER,
  SAVE_ANSWER,
  SET_USER_FORUM_THREADS,
  TOGGLE_LOADING,
  FETCH_USER_FORUM_THREADS,
} from '../actions/types'
import types from '../userTypes'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get, post} from '../lib/http'
import {getPayloadFromJwtToken} from '../lib/jwt'

export function* watchForumActions() {
  yield takeEvery(FETCH_FORUM_THREADS, fetchForumThreads)
  yield takeEvery(FETCH_FORUM_THREAD, fetchForumThread)
  yield takeEvery(SAVE_ANSWER, saveAnswer)
  yield takeEvery(FETCH_USER_FORUM_THREADS, fetchUserForumThreads)
}

export function* fetchForumThreads({filter}) {
  yield put({type: TOGGLE_LOADING})


  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))

  const threads = yield call(get, '/api/forum/thread', {
    headers: {Authorization: token},
  })

  yield put({type: SET_FORUM_THREADS, threads})
  yield put({type: TOGGLE_LOADING})
}

export function* fetchForumThread({postId}) {
  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))

  const {user: {firstName}, title, posts} = yield call(
    get,
    `/api/forum/thread/${postId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  )

  yield put({
    type: SET_THREAD,
    thread: {
      firstName,
      title,
      posts,
    },
  })
}

export function* saveAnswer({answerDetails: {answer, postId}}) {
  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))
  const {role, firstName} = getPayloadFromJwtToken(token)

  yield call(post, `/api/forum/thread/${postId}/post`, {
    headers: {
      Authorization: token,
    },

    body: JSON.stringify({text: answer}),
  })

  // Adding to answer to currenty showing thread
  yield put({
    type: ADD_ANSWER,
    answer: {
      // Adding representative flag if correct role was found in token
      ...(role === types.COMPANY_REP && {isRepresentative: true}),
      user: {
        firstName,
      },
      date: new Date(),
      text: answer,
    },
  })
}

export function* fetchUserForumThreads() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))

  const threads = yield call(get, '/api/forum/thread/user', {
    headers: {Authorization: token},
  })

  yield put({type: SET_USER_FORUM_THREADS, ...threads})
  yield put({type: TOGGLE_LOADING})
}

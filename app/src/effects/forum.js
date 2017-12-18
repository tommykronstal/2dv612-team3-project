import {
  FETCH_FORUM_THREADS,
  SET_FORUM_THREADS,
  TOGGLE_LOADING,
  FETCH_FORUM_THREAD,
  SET_THREAD,
  ADD_ANSWER,
  SAVE_ANSWER,
} from '../actions/types'
import types from '../userTypes'
import {put, takeEvery, call, select} from 'redux-saga/effects'
import {get, post} from '../lib/http'
import { getPayloadFromJwtToken } from '../lib/jwt';

export function* watchForumActions() {
  yield takeEvery(FETCH_FORUM_THREADS, fetchForumThreads)
  yield takeEvery(FETCH_FORUM_THREAD, fetchForumThread)
  yield takeEvery(SAVE_ANSWER, saveAnswer)
}

export function* fetchForumThreads() {
  yield put({type: TOGGLE_LOADING})

  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))

  // const threads = yield call(get, '/api/forum/thread', {headers: {Authorization: token}})
  const threads = [
    {
      _id: 'rgiit904kpoegkeop',
      title: 'Question about an iphone?',
      user: {
        firstName: 'john',
      },
    },
    {
      _id: 'dir392ir9032i0g',
      title: 'Question about something else',
      user: {
        firstName: 'paul',
      },
    },
  ]

  yield put({type: SET_FORUM_THREADS, threads})
  yield put({type: TOGGLE_LOADING})
}

export function* fetchForumThread({postId}) {
  // const {token} = yield select(state => ({
  //   token: state.auth.jwt,
  // }))
  // const thread = yield call(get, '', {
  //   headers: {
  //     Authorization: token,
  //   },
  // })

  yield put({
    type: SET_THREAD,
    thread: {
      author: 'Steve Harrington',
      question: 'How do I kill the demogorg?',
      answers: [
        {
          name: 'Lucas',
          answer: 'Mad Max can help you.',
        },
        {
          name: 'Hopper',
          isRepresntative: true,
          answer: 'There will be no more tv or eggos, sorry el.',
        },
      ],
    },
  })
}

export function* saveAnswer({answerDetails: {answer, postId}}) {


  /**
   *
   * 1. Store the answer
   * 2. Update the answers presented for the question
   *
   */

  const {token} = yield select(state => ({
    token: state.auth.jwt,
  }))

  const {role} = getPayloadFromJwtToken(token)
  /**
   * INCLUDE THIS LATER WHEN YOU HAVE MORE INFORMATION ABOUT ROUTE
   */
  // const response = yield call(post, '', {
  //   headers: {
  //     Authorization: token,
  //   },
  // })


  /**
   * This is simply to add the answer to the current active thread answers
   */
  yield put({
    type: ADD_ANSWER,
    answer: {
      ...(role === types.COMPANY_REP && {isRepresntative: true}),
      name: 'Kalle',
      answer
    }
  })

}

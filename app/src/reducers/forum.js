import { SET_FORUM_THREADS, SET_USER_FORUM_THREADS } from '../actions/types'

const initialState = {
  threads: [],
  createdThreads: [],
  postedThreads: []
}

export default function forum (state = initialState, action = {}) {
  switch (action.type) {
  case SET_FORUM_THREADS:
    return {
      ...state,
      threads: action.threads
    }
  case SET_USER_FORUM_THREADS:
    return {
      ...state,
      createdThreads: action.created,
      postedThreads: action.posted
    }
  default:
    return state
  }
}

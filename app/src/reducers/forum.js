import {
  SET_FORUM_THREADS,
  SET_THREAD,
  ADD_ANSWER,
  SET_USER_FORUM_THREADS,
} from '../actions/types'

export const initialState = {
  thread: {},
  threads: [],
  createdThreads: [],
  postedThreads: [],
}

export default function forum(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FORUM_THREADS:
      return {
        ...state,
        threads: action.threads,
      }

    case SET_THREAD:
      return {
        ...state,
        thread: action.thread,
      }

    case ADD_ANSWER:
      return {
        ...state,
        thread: {
          ...state.thread,
          posts: [...state.thread.posts, action.answer],
        },
      }
    case SET_USER_FORUM_THREADS:
      return {
        ...state,
        createdThreads: action.created,
        postedThreads: action.posted,
      }
    default:
      return state
  }
}

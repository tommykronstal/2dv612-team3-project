import {
  SET_FORUM_THREADS,
  SET_THREAD,
  ADD_ANSWER,
  SET_USER_FORUM_THREADS,
  SET_FORUM_CATEGORY_FILTER,
} from '../actions/types'

export const initialState = {
  thread: {},
  threads: [],
  allThreads: [],
  createdThreads: [],
  postedThreads: [],
  categoryFilter: null
}

export default function forum(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FORUM_THREADS:
      return {
        ...state,
        allThreads: [...action.threads],
        threads: [...action.threads],
      }

    case SET_THREAD:
      return {
        ...state,
        thread: action.thread,
      }
    
    case SET_FORUM_CATEGORY_FILTER: 
      return {
        ...state,
        categoryFilter: action.id,
        threads: action.id === 'NO_FILTER' ? [...state.allThreads] : state.allThreads.filter(({category}) => category._id === action.id)
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

import { SET_FORUM_THREADS } from '../actions/types'

const initialState = {
  threads: []
}

export default function forum (state = initialState, action = {}) {
  switch (action.type) {
  case SET_FORUM_THREADS:
    return {
      ...state,
      threads: action.threads
    }
  default:
    return state
  }
}

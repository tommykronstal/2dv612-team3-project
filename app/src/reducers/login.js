// import * as t from '../actions/types'

import {TOGGLE_LOADING} from '../actions/types'

const defaultState = {
  isLoading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    default:
      return state
  }
}

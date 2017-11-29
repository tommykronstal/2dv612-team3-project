import {SET_CATEGORIES} from '../actions/types'

const defaultState = {
  categories: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      }
    default:
      return state
  }
}

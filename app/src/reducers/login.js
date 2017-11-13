import * as t from '../actions/types'

const defaultState = {
  isLoading: false,
}

export const login = (state = defaultState, action) => {
  console.log('action :', action)
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

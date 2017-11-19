import { SET_STATUS, DISMISS_STATUS } from '../actions/types'

const initialState = {
  message: '',
  warning: false,
  active: false
}

export default function status (state = initialState, action = {}) {
  switch (action.type) {
  case SET_STATUS:
    return {
      ...state,
      message: action.message,
      active: true,
      warning: !!action.warning
    }
  case DISMISS_STATUS:
    return {
      ...state,
      active: false
    }
  default:
    return state
  }
}

import { TOGGLE_NAVIGATION } from '../actions/types'

const initialState = {
  active: false
}

export default function navigation (state = initialState, action = {}) {
  switch (action.type) {
  case TOGGLE_NAVIGATION:
    return {
      ...state,
      active: !state.active
    }
  default:
    return state
  }
}

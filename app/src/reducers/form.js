import { CLEAR_FORM, UPDATE_FIELD } from '../actions/types'

const initialState = {}

export default function status (state = initialState, action = {}) {
  switch (action.type) {
  case CLEAR_FORM:
    return {}
  case UPDATE_FIELD:
    return {
      ...state,
      [action.form]: {
        ...state[action.form],
        [action.field]: action.value
      }
    }
  default:
    return state
  }
}

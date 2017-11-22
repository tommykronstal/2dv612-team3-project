import { CLEAR_FORM, UPDATE_FIELD } from '../actions/types'
import { REGISTER_CONSUMER } from '../formTypes'
import USER_TYPES from '../userTypes'

const initialState = {
  [REGISTER_CONSUMER]: {
    role: USER_TYPES.USER
  }
}

export default function status (state = initialState, action = {}) {
  switch (action.type) {
  case CLEAR_FORM:
    return {
      ...state,
      [action.form]: initialState[action.form] || {}
    }
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

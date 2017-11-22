import {SET_LOGGED_IN, LOGOUT} from '../actions/types'
import { getJwtToken, getPayloadFromJwtToken } from '../lib/jwt'

const token = getJwtToken()
const data = getPayloadFromJwtToken(token)

const defaultState = {
  isAuthenticated: !!token,
  jwt: token,
  email: data.email,
  role: data.role
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_LOGGED_IN:
    return {
      ...state,
      isAuthenticated: true,
      jwt: action.token,
      email: action.payload.email,
      role: action.payload.role,
      companyId: action.payload.companyId
    }
  case LOGOUT:
    return {
      isAuthenticated: false,
      jwt: null,
      email: null,
      role: null
    }
  default:
    return state
  }
}

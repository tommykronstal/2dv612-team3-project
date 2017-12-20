import {SET_LOGGED_IN, LOGOUT} from '../actions/types'
import { getJwtToken, getPayloadFromJwtToken } from '../lib/jwt'

const token = getJwtToken()
const data = getPayloadFromJwtToken(token)

const defaultState = {
  isAuthenticated: !!token,
  jwt: token,
  email: data.email,
  firstName: data.firstName,
  role: data.role,
  userId: data.userId,
  companyId: data.companyId
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_LOGGED_IN:
    return {
      ...state,
      isAuthenticated: true,
      jwt: action.token,
      email: action.payload.email,
      firstName: action.payload.firstName,
      role: action.payload.role,
      userId: action.payload.userId,
      companyId: action.payload.companyId
    }
  case LOGOUT:
    return {
      isAuthenticated: false,
      jwt: null,
      email: null,
      firstName: null,
      role: null,
      userId: null,
      companyId: null
    }
  default:
    return state
  }
}

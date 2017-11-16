import {SET_LOGGED_IN, LOGOUT} from '../actions/types'
import { getJwtToken, resetJwtToken, getPayloadFromJwtToken } from '../lib/jwt'

//storeJwtToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indvb29vIiwicm9sZSI6IkFETUlOIn0.GSQBcHK-oc2nuAeiwn-3Ns3NesRG-t-kbY7Vrpw5AEk')
//resetJwtToken()

const token = getJwtToken()
const data = getPayloadFromJwtToken(token)

const defaultState = {
  isAuthenticated: !!token,
  jwt: token,
  username: data.username,
  role: data.role
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      const payload = getPayloadFromJwtToken(action.token)

      return {
        ...state,
        isAuthenticated: true,
        jwt: action.token,
        username: payload.username,
        role: payload.role
      }
    case LOGOUT:
      return {
        isAuthenticated: false,
        jwt: null,
        username: null,
        role: null
      }
    default:
      return state
  }
}

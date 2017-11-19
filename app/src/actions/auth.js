import { SET_LOGGED_IN, LOGOUT } from './types'
import { getPayloadFromJwtToken } from '../lib/jwt'

export const setUserToLoggedIn = response => ({ 
  type: SET_LOGGED_IN, 
  token: response.token, 
  payload: getPayloadFromJwtToken(response.token) 
})

export const logout = () => ({ type: LOGOUT })

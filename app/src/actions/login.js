import {TRY_LOGIN} from './types'

export const tryLogin = (credentials) => ({
  type: TRY_LOGIN,
  credentials
})

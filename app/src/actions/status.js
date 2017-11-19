import { SET_STATUS, DISMISS_STATUS } from './types'

export const setStatus = (message, warning = false) => ({
  type: SET_STATUS,
  message,
  warning
})

export const dismissStatus = () => ({ type: DISMISS_STATUS })

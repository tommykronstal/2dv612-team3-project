import { SET_STATUS, DISMISS_STATUS } from './types'

export function setStatus (message, warning = false) {
  return {
    type: SET_STATUS,
    message,
    warning
  }
}

export function dismissStatus () {
  return { type: DISMISS_STATUS }
}

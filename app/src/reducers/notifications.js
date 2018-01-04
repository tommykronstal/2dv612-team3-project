import {SET_NOTIFICATIONS, REMOVE_NOTIFICATION} from '../actions/types'

const defaultState = {
  notifications: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.notifications],
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n._id !== action.notificationId)
      }
    default:
      return state
  }
}

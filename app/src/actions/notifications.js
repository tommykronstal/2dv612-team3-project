import {FETCH_NOTIFICATIONS, REMOVE_NOTIFICATION} from './types'

export const fetchNotifications = () => ({ type: FETCH_NOTIFICATIONS })

export const removeNotification = notificationId => ({ type: REMOVE_NOTIFICATION, notificationId })

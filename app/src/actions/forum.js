import {
	FETCH_FORUM_THREADS,
	FETCH_USER_FORUM_THREADS
} from './types'

export const fetchUserForumThreads = () => ({type: FETCH_USER_FORUM_THREADS})

export const fetchForumThreads = () => ({type: FETCH_FORUM_THREADS})
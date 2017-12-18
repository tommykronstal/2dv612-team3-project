import {
  FETCH_FORUM_THREADS,
  SET_FORUM_THREADS,
  FETCH_FORUM_THREAD,
  SET_THREAD,
  ADD_ANSWER,
	SAVE_ANSWER,
} from './types'

export const fetchForumThreads = () => ({type: FETCH_FORUM_THREADS})

export const fetchThread = postId => ({
  type: FETCH_FORUM_THREAD,
  postId,
})

export const setThread = thread => ({
  type: SET_THREAD,
  thread,
})

export const addAnswer = answerInfo => ({
  type: ADD_ANSWER,
  answerInfo,
})

export const saveAnswer = answerDetails => ({
	type: SAVE_ANSWER,
	answerDetails
})

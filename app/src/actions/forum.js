import {
  FETCH_FORUM_THREADS,
  FETCH_FORUM_THREAD,
  SET_THREAD,
  ADD_ANSWER,
  SAVE_ANSWER,
  FETCH_USER_FORUM_THREADS,
  SET_FORUM_CATEGORY_FILTER,
  SEARCH_FORUM_THREADS,
  SET_FORUM_SEARCH_QUERY,
  SET_FORUM_SEARCH_RESULTS,
} from './types'

export const fetchForumThreads = () => ({
  type: FETCH_FORUM_THREADS,
})

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
  answerDetails,
})

export const fetchUserForumThreads = () => ({type: FETCH_USER_FORUM_THREADS})

export const setForumCategoryFilter = id => ({
  type: SET_FORUM_CATEGORY_FILTER,
  id,
})

export const searchForum = () => ({
  type: SEARCH_FORUM_THREADS,
})

export const setForumSearchQuery = query => ({
  type: SET_FORUM_SEARCH_QUERY,
  query,
})

export const setForumSearchResults = results => ({
  type: SET_FORUM_SEARCH_RESULTS,
  results
})

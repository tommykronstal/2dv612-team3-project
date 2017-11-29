import {FETCH_CATEGORIES, SET_CATEGORIES} from './types'

export const fetchCategories = (updateConfig) => ({
  type: FETCH_CATEGORIES,
  updateConfig
})

export const setCategories = categories => ({
  type: SET_CATEGORIES, categories
})

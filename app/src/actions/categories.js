import {FETCH_CATEGORIES, SET_CATEGORIES} from './types'

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
})

export const setCategories = categories => ({
  type: SET_CATEGORIES, categories
})

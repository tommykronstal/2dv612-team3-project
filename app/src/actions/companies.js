import {ADD_COMPANY} from './types'

export const addCompany = (company) => ({
  type: ADD_COMPANY,
  payload: company
})

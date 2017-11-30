import {SET_PRODUCTS} from '../actions/types'

const defaultState = {
  products: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...action.products]
      }
    default:
      return state
  }
}

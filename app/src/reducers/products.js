import {SET_PRODUCTS, SET_PRODUCT} from '../actions/types'
const defaultState = {
  products: [],
  product: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...action.products]
      }

      case SET_PRODUCT:
        return {
          ...state,
          product: {...action.product}
        }
    default:
      return state
  }
}

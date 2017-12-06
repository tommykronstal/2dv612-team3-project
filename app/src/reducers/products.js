import {SET_PRODUCTS, SET_PRODUCT, UPDATE_MATERIAL} from '../actions/types'
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

      case UPDATE_MATERIAL:
        const materialIndex = state.product.materials.findIndex(m => m._id === action.material._id)

        return {
          ...state,
          product: {
            ...state.product,
            materials: [
              ...state.product.materials.slice(0, materialIndex),
              action.material,
              ...state.product.materials.slice(materialIndex + 1)              
            ] 
          }
        }

    default:
      return state
  }
}

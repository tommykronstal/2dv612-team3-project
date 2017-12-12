import {SET_SEARCH_RESULTS, SET_SEARCH_QUERY, SET_PRODUCTS, SET_PRODUCT, UPDATE_MATERIAL, UPDATE_PRODUCT_MATERIAL_ANNOTATION} from '../actions/types'
const defaultState = {
  products: [],
  product: {},
  searchQuery: '',
  searchResults: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults
      }

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      }

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

      case UPDATE_PRODUCT_MATERIAL_ANNOTATION:
        const {product} = state
        // Finding material that we want to update
        const targetMaterial = product.materials.find(({_id}) => action.materialId === _id)
        // collecting all materials except the one we want to update
        const productMaterials = product.materials.filter(({_id}) => action.materialId !== _id)
        return {
          ...state,
          product: {
            ...product,
            materials: [...productMaterials, {
              ...targetMaterial,
              annotation: action.annotation

            }]
          }
        }

    default:
      return state
  }
}

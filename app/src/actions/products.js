import {
	FETCH_PRODUCTS,
	FETCH_PRODUCT,
	SET_RATING,
	UPDATE_PRODUCT_MATERIAL_ANNOTATION,
	SET_SEARCH_QUERY,
	FETCH_SEARCH_RESULTS,
} from './types'

export const fetchProducts = () => ({type: FETCH_PRODUCTS})

export const fetchProduct = productId => ({
	type: FETCH_PRODUCT,
	productId,
})

export const setRating = (materialId, rating) => ({
	type: SET_RATING,
	materialId,
	rating,
})

export const updateProductAnnotationMaterial = (productId, annotaion) => ({
	type: UPDATE_PRODUCT_MATERIAL_ANNOTATION,
})

export const setSearchQuery = searchQuery => ({ type: SET_SEARCH_QUERY, searchQuery})
export const fetchSearchResults = () => ({type: FETCH_SEARCH_RESULTS})
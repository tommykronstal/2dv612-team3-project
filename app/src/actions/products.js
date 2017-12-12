import {
	FETCH_PRODUCTS,
	FETCH_PRODUCT,
	SET_RATING,
	UPDATE_PRODUCT_MATERIAL_ANNOTATION,
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

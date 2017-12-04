import { FETCH_PRODUCTS, FETCH_PRODUCT } from './types'

export const fetchProducts = () => ({ type: FETCH_PRODUCTS })

export const fetchProduct = productId => ({
	type: FETCH_PRODUCT,
	productId
})
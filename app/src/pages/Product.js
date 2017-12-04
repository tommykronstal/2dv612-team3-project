import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../actions/products'

class Product extends Component {
	componentDidMount() {
		const {match: {params: {productId}}} = this.props
		this.props.tryFetchProduct(productId)
	}

	render() {
		return (
			<div></div>
		)
	}
}

const mapStateToProps = ({products}) => ({
	product: products.product,
})

const mapDispatchToProps = dispatch => ({
	tryFetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)

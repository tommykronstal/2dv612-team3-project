import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../actions/products'
import Loading from '../components/common/Loading'
import Content from '../components/common/Content'
import styled from 'styled-components'
import Section from '../components/common/Section'
import Headline from '../components/common/Headline'
import Material from '../components/Material'

class Product extends Component {
	componentDidMount() {
		const {match: {params: {productId}}} = this.props
		this.props.tryFetchProduct(productId)
	}

	render() {
		const {isLoading} = this.props
		const {product} = this.props
		return (
			<div>
				{!Object.keys(product).length || isLoading ? (
					<Content>
						<Loading />
					</Content>
				) : (
					<Content>
						<Headline>{product.name}</Headline>
						<Headline style={{
							color: '#9E9E9E'
						}}>{product.companyName}</Headline>
						{product.materials.length ? (
							product.materials.map((material, i) => (
								<Material {...material} key={i} />
							))
						) : (
							<Headline>
								There are currently no materials stored for this product.
							</Headline>
						)}
					</Content>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({products, loading}) => ({
	loading: loading.isLoading,
	product: products.product,
})

const mapDispatchToProps = dispatch => ({
	tryFetchProduct: productId => dispatch(fetchProduct(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)

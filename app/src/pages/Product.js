import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../actions/products'
import Loading from '../components/common/Loading'
import Content from '../components/common/Content'
import styled from 'styled-components'
import Section from '../components/common/Section'
import Headline from '../components/common/Headline'
import Material from '../components/Material'

const StyledHeadline = styled(Headline)`
	color: ${props => (props.color ? props.color : 'initial')};
`

class Product extends Component {
	componentDidMount() {
		const {match: {params: {productId}}} = this.props
		this.props.tryFetchProduct(productId)
	}

	render() {
		const {product, isLoading} = this.props
		return (
			<div>
				{!Object.keys(product).length || isLoading ? (
					<Content>
						<Loading />
					</Content>
				) : (
					<Content>
						<StyledHeadline>
							{product.name} ({product.category.categoryName})
						</StyledHeadline>
						<StyledHeadline color="#9E9E9E">
							{product.companyName}
						</StyledHeadline>
						{product.materials.length ? (
							product.materials.map((material, i) => (
								<Material {...material} key={i} />
							))
						) : (
							<StyledHeadline>
								There are currently no materials stored for this product.
							</StyledHeadline>
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

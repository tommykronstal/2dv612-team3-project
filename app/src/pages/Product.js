import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct, setRating} from '../actions/products'
import Loading from '../components/common/Loading'
import Content from '../components/common/Content'
import styled from 'styled-components'
import Section from '../components/common/Section'
import Headline from '../components/common/Headline'
import Material from '../components/Material'
import {withOverlay} from '../components/withOverlay'

const StyledHeadline = styled(Headline)`
  color: ${props => (props.color ? props.color : 'initial')};
`

class Product extends Component {
  componentDidMount() {
    const {match: {params: {productId}}} = this.props
    this.props.tryFetchProduct(productId)
  }

  render() {
    const {product, isLoading, userId, setRating} = this.props

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
              product.materials.map(material => {
                const EnhancedMaterial = withOverlay(Material)
                return (
                  <EnhancedMaterial
                    {...material}
                    setRating={setRating(material._id)}
                    key={material._id}
                    userId={userId}
                  />
                )
              })
            ) : (
              <StyledHeadline>
                There are currently no available materials for this product.
              </StyledHeadline>
            )}
          </Content>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({products, loading, auth}) => ({
  loading: loading.isLoading,
  product: products.product,
  userId: auth.userId,
})

const mapDispatchToProps = dispatch => ({
  tryFetchProduct: productId => dispatch(fetchProduct(productId)),
  setRating: materialId => rating => dispatch(setRating(materialId, rating)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)

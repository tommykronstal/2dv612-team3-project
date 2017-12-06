import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import {fetchProducts} from '../actions/products'
import styled from 'styled-components'
import Link from '../components/common/Link'

const ProductInforContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(240,240,240);
`

class ListAllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {match} = this.props
    return (
      <Section>
        <Title>Products</Title>
        <List>
          {this.props.products.map(({name, _id: productId}) => (
            <ProductInforContainer key={productId}>
              <Item>{name}</Item>
              <Link to={`${match.url}/${productId}`}>View Product</Link>
            </ProductInforContainer>
          ))}
        </List>
      </Section>
    )
  }
}

export default connect(
  ({auth, products}) => ({
    email: auth.email,
    products: products.products,
  }),
  dispatch => ({
    fetchProducts: _ => dispatch(fetchProducts()),
  }),
)(ListAllProducts)

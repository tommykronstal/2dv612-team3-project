import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Link from '../components/common/Link'
import { fetchProducts } from '../actions/products'


const List = styled.ul`
padding: 0;
border-bottom: 1px solid rgb(240,240,240);
`
const Item = styled.li`
list-style-type: none;
padding: 0.8rem 0;
border-top: 1px solid rgb(240,240,240);
color: 
`

class ListCompanyProducts extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <Section>
        <Title>My products</Title>
        <List>
          {
            this.props.products.map(product => (
              <Item key={product._id}>
                <Link to={`/company/user/product/${product._id}`} >{product.name}</Link>
              </Item>
            ))
          }
        </List>
      </Section>
    )
  }
}

export default connect(
  ({auth, products}) => ({ 
    email: auth.email,
    products: products.products
  }), 
  (dispatch) => ({
    fetchProducts: _ => dispatch(fetchProducts())
  })
)(ListCompanyProducts)

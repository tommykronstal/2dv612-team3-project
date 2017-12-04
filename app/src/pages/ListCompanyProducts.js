import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Link from '../components/common/Link'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import {fetchProducts} from '../actions/products'

class ListCompanyProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <Section>
        <Title>My products</Title>
        <List>
          {this.props.products.map(product => (
            <Item key={product._id}>
              <Link to={`/company/user/product/${product._id}`}>
                {product.name}
              </Link>
            </Item>
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
)(ListCompanyProducts)

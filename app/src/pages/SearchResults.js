import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import styled from 'styled-components'
import Link from '../components/common/Link'
import A from '../components/common/A'


const ProductInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(240,240,240);
`

class SearchResults extends Component {
  render() {
    return (
      <Section>
        <Title>SearchResults</Title>
        <List>
          {this.props.searchResults.map(({item}, i) => item.isMaterial ? 
            (
              <ProductInfoContainer key={i + item._id}>
                <Item>{item.name} for {item.companyName} {item.productName}</Item>
                <A href={`/uploads/${item.filename}`} target="_blank">View Manual</A>
              </ProductInfoContainer>              
            ) : (
              <ProductInfoContainer key={i + item._id}>
                <Item>{item.companyName} {item.name}</Item>
                <Link to={`/user/products/${item.productId}`}>View Product</Link>
              </ProductInfoContainer>
          ))}
        </List>
      </Section>
    )
  }
}

export default connect(
  ({products}) => ({
    searchResults: products.searchResults
  })
)(SearchResults)

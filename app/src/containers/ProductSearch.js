import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SearchBar from '../components/common/SearchBar'
import { setSearchQuery, fetchSearchResults } from '../actions/products'

export const Form = styled.form`
  display
  margin: 0;
  padding: 0;
`

export default connect(
  ({products}) => products,
  dispatch => ({
    updateSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery)),
    doSearch: () => dispatch(fetchSearchResults())
  })
)((props) => (
  <Form onSubmit={(e) => {
    e.preventDefault()
    props.router.history.push('/user/search')
    props.doSearch()
  }}>
    <SearchBar
      onChange={(e) => props.updateSearchQuery(e.target.value)}
      value={props.searchQuery}
      label='Search for a product 🔍' />
  </Form>
))

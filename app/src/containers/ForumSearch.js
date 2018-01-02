import React from 'react'
import {connect} from 'react-redux'
import {Form} from './ProductSearch'
import SearchBar from '../components/common/SearchBar'
import {searchForum, setForumSearchQuery, setForumSearchResults} from '../actions/forum'

const mapStateToProps = state => ({
  forumSearchQuery: state.forum.forumSearchQuery
})

const mapDispatchToProps = dispatch => ({
  updateSearchQuery: query => dispatch(setForumSearchQuery(query)),
  doSearch: () => dispatch(searchForum()),
  removePosts: () => dispatch(setForumSearchResults([]))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  ({router, doSearch, updateSearchQuery, forumSearchQuery, removePosts, ...props}) => (
    <Form
      onSubmit={e => {
        e.preventDefault()
        removePosts()
        router.history.push('/user/forum/search')
        doSearch()
      }}
    >
      <SearchBar
        onChange={e => updateSearchQuery(e.target.value)}
        value={forumSearchQuery}
        label='Search in forum 🔍'
      />
    </Form>
  ),
)

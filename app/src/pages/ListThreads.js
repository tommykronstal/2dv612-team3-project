import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Headline from '../components/common/Headline'
import Link from '../components/common/Link'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import Dropdown from '../components/common/Dropdown'
import Input from '../components/common/Input'
import {fetchCategories} from '../actions/categories'
import {fetchForumThreads, setForumCategoryFilter, searchForum} from '../actions/forum'

class ListThreads extends Component {
  state = {searchFilter: ''}

  componentDidMount() {
    const {categories} = this.props

    // Only fetching categories if they are not previously fetched
    if (!categories.length) {
      this.props.fetchCategories()
    }

    this.props.fetchForumThreads()
  }

  render() {
    return (
      <Section>
        <Title>Forum</Title>
        <Headline>Ask Question</Headline>
        <Link to={`${this.props.match.url}/create`}>Create new thread</Link>
        <Headline>Asked Questions</Headline>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Dropdown
            label="Select a filter"
            name="categoryFilter"
            onClick={event => this.props.setFilter(event.target.value)}
            options={[
              {key: 'NO_FILTER', value: 'No Filter'},
              ...this.props.categories.map(({_id, categoryName}) => ({
                key: _id,
                value: categoryName,
              })),
            ]}
            value={this.props.categoryFilter}
          />
        </div>
        <List>
          {this.props.threads.map(thread => (
            <Item displayBorder key={thread._id}>
              <Link to={`${this.props.match.url}/thread/${thread._id}`}>
                {thread.title}
              </Link>{' '}
              <em style={{color: 'rgb(140,140,140)'}}>
                - asked by {thread.creator.firstName}
              </em>
            </Item>
          ))}
        </List>
      </Section>
    )
  }
}

export default connect(
  ({forum, categories}) => ({
    categories: categories.categories || [],
    threads: forum.threads,
    categoryFilter: forum.categoryFilter,
  }),
  dispatch => ({
    fetchCategories: updateConfig => dispatch(fetchCategories(updateConfig)),
    setFilter: id => dispatch(setForumCategoryFilter(id)),
    fetchForumThreads: () => dispatch(fetchForumThreads()),
  }),
)(ListThreads)

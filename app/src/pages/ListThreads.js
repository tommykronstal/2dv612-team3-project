import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Headline from '../components/common/Headline'
import Link from '../components/common/Link'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import { fetchForumThreads } from '../actions/forum'

class ListThreads extends Component {
  componentDidMount() {
    this.props.fetchForumThreads()
  }

  render() {
    return (
      <Section>
        <Title>Forum</Title>
        <Headline>Ask Question</Headline>
        Add logic for adding a question?
        <Headline>Asked Questions</Headline>
        <List>
          {this.props.threads.map(thread => (
            <Item displayBorder key={thread._id}>
              <Link to={`${this.props.match.url}/${thread._id}`}>
                {thread.title}
              </Link> <em style={{color: 'rgb(140,140,140)'}}>- asked by {thread.creator.firstName}</em>  
            </Item>
          ))}
        </List>
      </Section>
    )
  }
}

export default connect(
  ({forum}) => ({
    threads: forum.threads
  }),
  dispatch => ({
    fetchForumThreads: _ => dispatch(fetchForumThreads()),
  }),
)(ListThreads)

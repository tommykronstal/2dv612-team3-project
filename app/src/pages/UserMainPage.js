import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Headline from '../components/common/Headline'
import Link from '../components/common/Link'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import { fetchUserForumThreads } from '../actions/forum'

class UserMainPage extends Component {
  componentDidMount() {
    this.props.fetchUserForumThreads()
  }

  render() {
    return (
      <Section>
        <Title>Welcome {this.props.firstName}</Title>

        <Headline>Forum threads that I have created</Headline>
        <List>
          {this.props.createdThreads.map(thread => (
            <Item displayBorder key={thread._id}>
              <Link to={`${this.props.match.url}/${thread._id}`}>
                {thread.title}
              </Link> <em style={{color: 'rgb(140,140,140)'}}>- asked by {thread.creator.firstName}</em>  
            </Item>
          ))}
        </List>
        <Headline>Forum threads that I have posted in</Headline>
        <List>
          {this.props.postedThreads.map(thread => (
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
  ({auth, forum}) => ({
    firstName: auth.firstName,
    createdThreads: forum.createdThreads,
    postedThreads: forum.postedThreads
  }),
  dispatch => ({
    fetchUserForumThreads: _ => dispatch(fetchUserForumThreads()),
  }),
)(UserMainPage)

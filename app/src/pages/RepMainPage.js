import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Text from '../components/common/Text'
import Headline from '../components/common/Headline'
import Link from '../components/common/Link'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import { fetchNotifications, removeNotification } from '../actions/notifications'

class RepMainPage extends Component {
  componentDidMount() {
    this.props.fetchNotifications() 
  }

  render() {
    return (
      <Section>
        <Title>Welcome {this.props.firstName}</Title>

        <Headline>Notifications ({this.props.notifications.length})</Headline>
        <Text>New forum threads created for your companies categories.</Text>
        <List>
          {this.props.notifications.map(notification => (
            <Item displayBorder key={notification._id}>
              <Link to={`${this.props.match.url}/forum/thread/${notification.threadId}`} onClick={() => this.props.removeNotification(notification._id)}>
                {notification.threadTitle}
              </Link>
            </Item>
          ))}
        </List>
      </Section>
    )
  }
}

export default connect(
  ({auth, notifications}) => ({
    firstName: auth.firstName,
    notifications: notifications.notifications
  }),
  dispatch => ({
    fetchNotifications: _ => dispatch(fetchNotifications()),
    removeNotification: notificationId => dispatch(removeNotification(notificationId))
  }),
)(RepMainPage)

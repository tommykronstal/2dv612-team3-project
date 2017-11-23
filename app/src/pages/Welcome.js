import React from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import Text from '../components/common/Text'

const Welcome = props => (
  <Section>
    <Title>Welcome {props.email}</Title>
    <Text>Here you can find some stuff.</Text>
    <Text>/ RTFM </Text>
  </Section>
)

export default connect(
  ({auth}) => ({ email: auth.email }), 
  () => ({})
)(Welcome)

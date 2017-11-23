import React from 'react'
import styled from 'styled-components'
import Section from './Section'

const Form = styled.form`
  text-align: center;
`

export default ({ onSubmit, children, ...props}) => (
  <Section>
    <Form onSubmit={event => {
      event.preventDefault()
      onSubmit(event)
    }} {...props}>
      {children}    
    </Form>
  </Section>
)

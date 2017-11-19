import React from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Section from './Section'

const Div = styled.div`
  margin: 2rem 1rem 4rem 1rem;
  text-align: center
`

export default (props) => (
  <Div>
    <Wrapper>
      <Section>{props.children}</Section>
    </Wrapper>
  </Div>
)


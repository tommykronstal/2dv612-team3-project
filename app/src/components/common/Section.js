import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  box-sizing: border-box;
  padding: 1rem 1rem;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 1px 2px 0 rgba(100,100,100,0.3);
  border-radius: 8px;
`

export default props => (<Section>{props.children}</Section>)

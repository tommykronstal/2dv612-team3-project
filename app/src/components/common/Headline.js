import React from 'react'
import styled from 'styled-components'

const Headline = styled.h1`
  font-family: 'Nunito', Helvetica, arial, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  text-align: ${props => props.center ? 'center' : undefined};
  color: rgb(60, 60, 60);
`

export default props => (<Headline {...props}>{props.children}</Headline>)

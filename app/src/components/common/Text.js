import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-family: Helvetica, arial, sans-serif;
  font-weight: ${props => props.bold ? '700' : '400'};
  text-align: ${props => props.center ? 'center' : undefined};
  font-size: 1rem;
  line-height: 1.4em;
  padding-bottom: 1rem;
  color: ${props => props.white ? 'white' : 'rgb(60, 60, 60)'};
`

export default props => (<Text {...props}>{props.children}</Text>)


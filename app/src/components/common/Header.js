import React from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import Wrapper from './Wrapper'

const Header = styled.header`
  box-sizing: border-box;
  padding: 1rem 1rem;
  background: rgb(110, 160, 220);
`

const Img = styled.img`
  height: 2.5rem;
  padding: 0;
  margin: 0;
`

export default props => (
  <Header>
    <Wrapper>
      <Img src={logo} />
      {props.children}
    </Wrapper>
  </Header>
)

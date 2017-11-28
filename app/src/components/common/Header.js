import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from './logo.svg'
import Wrapper from './Wrapper'
import NavigationToggle from './NavigationToggle'

const HeaderWrapper = Wrapper.extend`
  display: flex;
  justify-content: space-between;
`

const Header = styled.header`
  box-sizing: border-box;
  padding: 1rem 1rem;
  background: rgb(110, 160, 220);
`

const Img = styled.img`
  height: 2.2rem;
  width: 2.2rem;
  padding: 0;
  margin: 0;
`

const Div = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0;
  margin: 0;
`

export default props => (
  <Header>
    <HeaderWrapper>
      <NavigationToggle show={!props.isAuthenticated} menuActive={props.menuActive} toggleNavigation={props.toggleNavigation} />
      <Link to='/'><Img src={logo} /></Link>
      <Div/>
    </HeaderWrapper>
  </Header>
)

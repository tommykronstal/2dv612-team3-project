import React from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'

const NavigationWrapper = Wrapper.extend`
  display: flex;
  min-height: 100%; 
  padding: 2rem 1rem 4rem 1rem;
`

const Navigation = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-right: 0.5rem;
  width: 30%;
  z-index: 4;
  height: 90%;

  @media(max-width: 700px) {
    position:absolute;
    max-width: 700px;
    width: 100%;
    padding: 0 1rem;
    margin-right: 0;
    left: -720px;
    transition: transform 0.3s;
    transform-origin: left center;
    transform: translateX(${props => props.menuActive ? 720 : 0 }px) scale(${props => props.menuActive ? 1.0 : 0.5 });
  }
`
const Content = styled.div`
  margin-left: 0.5rem;
  width: 70%;

  @media(max-width: 700px) {
    margin: 0;
    width: 100%;
    transition: transform 0.3s;

    transform: translateX(${props => props.menuActive ? 240 : 0 }px) scale(${props => props.menuActive ? 0.8 : 1.0 });
    transform-origin: left center;
  }
`

const Blur = styled.div`
  display: none;

  @media(max-width: 700px) {
    transition: opacity 0.3s;
    display: block;
    position: absolute;
    top: 0.4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(100, 100, 100);
    opacity: ${props => props.menuActive ? 0.6 : 0};
    z-index: 3;
    pointer-events: none;
  }
`

const Div = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
`

export default ({ children, menuActive, toggleNavigation}) => (
  <Div>
    <Blur menuActive={menuActive} />
    <NavigationWrapper>
      <Navigation onClick={toggleNavigation} menuActive={menuActive}>{children[0]}</Navigation>
      <Content menuActive={menuActive}>{children[1]}</Content>
    </NavigationWrapper>
  </Div>
)
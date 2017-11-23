import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 100%; 
  padding: 2rem 1rem 4rem 1rem;
`

const Navigation = styled.div`
  position: relative;
  margin-right: 0.5rem;
  width: 30%;

  @media(max-width: 700px) {
    position:absolute;
    width: 300px;
    left: -320px;
    transition: transform 0.3s;

    transform: translateX(${props => props.active ? 340 : 0 }px) scale(${props => props.active ? 1.0 : 0.8 });
  }
`
const Content = styled.div`
  margin-left: 0.5rem;
  width: 70%;

  @media(max-width: 700px) {
    margin: 0;
    width: 100%;
    transition: transform 0.3s;

    transform: translateX(${props => props.active ? 320 : 0 }px) scale(${props => props.active ? 0.8 : 1.0 });
    transform-origin: left center;
  }
`

const Div = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
`

export default ({ children }) => (
  <Div>
    <Wrapper>
      <Navigation>{children[0]}</Navigation>
      <Content>{children[1]}</Content>
    </Wrapper>
  </Div>
)
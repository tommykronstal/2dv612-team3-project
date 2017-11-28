import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.div`
  display: inline-block;
  border: none;
  border-radius: 0;
  background-color: transparent;
  width: 2.4rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  line-height: 0;

  ${props => props.show && css`display:none;`}

  @media(min-width: 700px) {
    display: none;
  }
`
const Line = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 0.4rem;
  margin: 0;
  border-radius: 1rem;
  background-color: white;
  transform-origin: center center;
  transform: translateY(0) rotate(0) scale(1);
  transition: transform 0.3s;  
`

const FirstLine = Line.extend`
  margin-bottom: 0.4rem;
  ${props => props.menuActive && css`
    transform: translateY(0.97rem) rotate(45deg);  
  `}
`

const SecondLine = Line.extend`
  margin-bottom: 0.4rem;
  transform: scaleX(${props => props.menuActive ? 0 : 1});
`

const ThirdLine = Line.extend`
  ${props => props.menuActive && css`
    transform: translateY(-0.7rem) rotate(-45deg);  
  `}
`


export default props => (
  <Button show={props.show} onClick={props.toggleNavigation}>
    <FirstLine menuActive={props.menuActive}/>
    <SecondLine menuActive={props.menuActive} />
    <ThirdLine menuActive={props.menuActive}  />
  </Button>
)

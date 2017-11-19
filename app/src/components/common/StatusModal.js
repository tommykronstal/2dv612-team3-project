import React from 'react'
import styled, { css } from 'styled-components'
import confirmSymbol from './confirmed.svg'
import errorSymbol from './error.svg'

const Div = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  background: rgb(120, 180, 50);
  border-radius: 6px;
  transition: transform 0.3s;
  transform: translateY(0);

  @media (max-width: 480px) {
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }

  ${props => props.warning && css`
    background: rgb(240, 100, 100);
  `}

  ${props => !props.active && css`
    transform: translateY(100px);
	`}
`

const Img = styled.img`
  display: inline-block;
  height: 1.5rem;
  padding: 0;
  margin: 0 0.5rem 0 0;
  vertical-align: middle;
`

const P = styled.p`
  font-family: 'Nunito', Helvetica, arial, sans-serif;
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 1rem;
  color: white;
  display: inline-block;
  text-align: center;
`

export default props => (
  <Div warning={props.warning} active={props.active}>
    <Img src={props.warning ? errorSymbol : confirmSymbol} />
    <P white>
      {props.message}
    </P>
  </Div>
)


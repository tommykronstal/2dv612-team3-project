import React from 'react'
import styled, { css } from 'styled-components'

import Loading from './Loading'

const Button = styled.button`
  font-family: 'nunito', Helvetica, arial, sans-serif;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  display: block;
	border-radius: 4px;
	padding: 1rem 1rem;
	margin: 1.5rem auto;
  text-align: center;
	max-width: 22rem;
  min-width: 8rem;
  width: 100%;
  outline: none;
	background: rgb(110, 160, 220);
	color: white;
  user-select: none;
  cursor: ${props => props.disabled ? 'wait' : 'pointer'};

  :not([disabled]):active {
    background: ${props => props.primary ? 'rgb(100, 150, 200)' : 'rgba(110, 160, 220, 0.1)'};
  }

	${props => !props.primary && css`
	  border: 2px solid rgb(110, 160, 220);
		background: transparent;
		color: rgb(110, 160, 220);
	`}

`

export default props => (
  <Button
    primary={props.primary}
    onClick={event => props.onClick && props.onClick(event)}
    disabled={props.loading}
  >
    {props.loading ? <Loading small white={props.primary} /> : props.children}
  </Button>
)


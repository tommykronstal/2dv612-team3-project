import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Loading from './Loading';

const Button = styled.button`
  font-family: Helvetica, arial, sans-serif;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  display: block;
	border-radius: 4px;
	padding: 1rem 1rem;
	margin: 1rem 0rem;
  text-align: center;
	max-width: 32rem;
  min-width: 8rem;
  width: 100%;
	background: rgb(110, 160, 220);
	color: white;
  user-select: none;
  cursor: pointer;

  :not([disabled]):active {
    background: ${props => props.primary ? 'rgb(100, 150, 200)' : 'rgba(110, 160, 220, 0.1)'}
  }

	${props => !props.primary && css`
	  border: 2px solid rgb(110, 160, 220);
		background: transparent;
		color: rgb(110, 160, 220);
	`}

`

export default (props) => {
  return (
    <Button
      primary={props.primary}
      onClick={(e) => props.onClick && props.onClick(e)}
      disabled={props.loading}
    >
      {props.loading ? <Loading small white={props.primary} /> : props.children}
    </Button>
  )
};

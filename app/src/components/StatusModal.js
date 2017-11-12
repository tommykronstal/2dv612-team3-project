import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Text from './Text';

const Div = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  box-sizing: border-box;
  padding: 0 1rem;
  background: rgb(180, 220, 140);
  border-radius: 6px;
  transition: transform 0.3s;
  transform-origin: right bottom;
  transform: scale(1) translateY(0);

  ${props => !props.active && css`
    transform: scale(0) translateY(100px);
	`}
`

const Img = styled.img`
  height: 2.5rem;
  padding: 0;
  margin: 0;
`

export default (props, state) => {
  console.log(props, state)
  return (
    <Div active={props.active}>
      <Text white>{props.message}</Text>
    </Div>
  )
};

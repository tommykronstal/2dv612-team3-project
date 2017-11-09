import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const hideShow = keyframes`
	from {opacity: 1;}
	to   {opacity: 0;}
`;

const Circle = styled.div`
  width: ${props => props.size}rem;
  height: ${props => props.size}rem;
  display: inline-block;
  margin: ${props => props.size / 5}rem;
  background: ${props => props.white ? 'white' : 'rgb(60, 60, 60)'};
  border-radius: ${props => props.size / 2}rem;
  animation: ${hideShow};
  animation-duration: 1s;
  animation-delay: ${props => props.delay}s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
`

export default (props) => {

  const circleProps = {
    size: props.small ? 0.5 : 1,
    white: props.white
  }

  return (
    <div>
      <Circle {...circleProps} delay={0} />
      <Circle {...circleProps} delay={0.33} />
      <Circle {...circleProps} delay={0.66} />
    </div>
  )
};

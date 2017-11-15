import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Nunito', Helvetica, arial, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  text-align: ${props => props.center ? 'center' : undefined};
  color: rgb(60, 60, 60);
`

export default (props) => {
  return (
    <Title {...props}>{props.children}</Title>
  )
};

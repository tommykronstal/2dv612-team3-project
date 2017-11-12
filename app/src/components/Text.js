import React, { Component } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-family: Helvetica, arial, sans-serif;
  font-weight: ${props => props.bold ? '700' : '400'};
  font-size: 1rem;
  color: ${props => props.white ? 'white' : 'rgb(60, 60, 60)'};
`;

export default (props) => {
  return (
    <Text {...props}>{props.children}</Text>
  )
};

export const textStyles = Text;

import React, { Component } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-family: Helvetica, arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: rgb(60, 60, 60);
`;

export default (props) => {
  return (
    <Text {...props}>{props.children}</Text>
  )
};

export const textStyles = Text;

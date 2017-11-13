import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Nunito', Helvetica, arial, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  color: rgb(60, 60, 60);
  text-align: center;
`

export default (props) => {
  return (
    <Title>{props.children}</Title>
  )
};

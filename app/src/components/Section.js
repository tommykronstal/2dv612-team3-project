import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Section = styled.section`
  padding: 1rem 1rem;
  background: #FFFFFF;
  box-shadow: 0 1px 2px 0 rgba(100,100,100,0.4);
  border-radius: 8px;
`

export default (props) => {
  return (<Section>{props.children}</Section>)
};

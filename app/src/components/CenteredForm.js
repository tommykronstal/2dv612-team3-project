import React from 'react';
import styled from 'styled-components';

import Section from './Section'

const Div = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Child = styled.div`
  width: 320px;
`

export default (props) => {
  return (
    <Div>
      <Child>
        <Section>{props.children}</Section>
      </Child>
    </Div>
  )
};

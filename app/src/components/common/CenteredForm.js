import React from 'react';
import styled from 'styled-components';

import Section from './Section'

const Div = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-height: 400px) {
    display: block;
    width: 100%;
    position: relative;
  }
`

const Child = styled.form`
  width: 340px;
  text-align: center;
  @media(max-height: 400px) { margin: 0 auto; }
`

export default (props) => {
  return (
    <Div>
      <Child onSubmit={(e) => !e.preventDefault() && props.onSubmit && props.onSubmit(e)}>
        <Section>{props.children}</Section>
      </Child>
    </Div>
  )
};

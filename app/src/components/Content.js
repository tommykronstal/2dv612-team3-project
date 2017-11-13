import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Section from './Section';

const Div = styled.div`
  margin: 2rem 1rem 4rem 1rem;
`

export default (props) => {
  return (
    <Div>
      <Wrapper>
        <Section>{props.children}</Section>
      </Wrapper>
    </Div>
  )
};

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import logo from '../../public/logo.png';

const Header = styled.header`
  box-sizing: border-box;
  padding: 1rem 1rem;
  background: rgb(110, 160, 220);
`

const Img = styled.img`
  height: 2.5rem;
  padding: 0;
  margin: 0;
`

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export default (props) => {
  return (
    <Header>
      <Wrapper>
        <Img src={logo} />
        {props.children}
      </Wrapper>
    </Header>
  )
};

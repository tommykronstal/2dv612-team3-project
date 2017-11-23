import React from 'react'
import styled from 'styled-components'
import Section from './Section'
import Headline from './Headline'

const NavSection = Section.extend`
  padding: 0;
  height: 100%;
`

const List = styled.ul`
  padding: 0;
`

const Div = styled.div`
  padding: 0.1rem 0.8rem 0 0.8rem;
`

const Item = styled.li`
  list-style-type: none;
  padding: 0.8rem;
  border-top: 1px solid rgb(240,240,240);
  color: 
`

export default ({ children }) => (
  <NavSection>
    <Div>
      <Headline>Navigation</Headline>      
    </Div>
    <List>
      {
        children.map((Link, i) => (
          <Item key={i}>{Link}</Item>
        ))
      }
    </List>
  </NavSection>
)
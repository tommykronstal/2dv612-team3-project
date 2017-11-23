import React from 'react'
import {Route, Link} from 'react-router-dom'
import styled, {css} from 'styled-components'

const StyledLink = styled(Link)`
  font-family: Helvetica, arial, sans-serif;
  font-weight: ${props => props.bold ? '700' : '400'};
  text-align: ${props => props.center ? 'center' : undefined};
  font-size: 1rem;
  text-decoration: none;
  line-height: 1.4em;
  color: rgb(60, 60, 60);

  ${props => props.match && css`
    color: rgb(110, 160, 220);
    font-weight: 700;
  `}
`

export default ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
      <StyledLink to={to} match={match}>{children}</StyledLink>
  )}/>
)

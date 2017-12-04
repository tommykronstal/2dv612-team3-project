import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
  font-family: Helvetica, arial, sans-serif;
  font-weight: ${props => props.bold ? '700' : '400'};
  text-align: ${props => props.center ? 'center' : undefined};
  font-size: 1rem;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  line-height: 1.4em;
  color: rgb(110, 160, 220);
`

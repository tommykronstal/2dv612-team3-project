import React from 'react'
import styled from 'styled-components'

import Star from './Star'
import Text from './Text'

const Label = styled(Text)`
  color: rgb(210, 210, 210);
  display: inline-block;
  font-style: italic;
  font-weight: 100;
  vertical-align: top;
  padding-left: 0.2rem;
  padding-top: 0;
  padding-bottom: 0;
  
`

export default props => (
  <div>
    {
      [1,2,3,4,5].map(n => (
        <Star 
          key={n}
          fill={props.avg >= n} 
          outline={props.rating >= n} 
          onClick={() => props.onClick && props.onClick(n)} 
          size={props.small ? '20' : '40'}
        />
      ))
    }
    <Label>({props.amount})</Label>
  </div>
)

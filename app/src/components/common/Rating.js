import React from 'react'
import Star from './Star'

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
  </div>
)

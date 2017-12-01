import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  transition: transform 0.2s;
  transform-origin: center;
  display: inline-block;

  :active {
    transform: scale(0.5);
  }

`


export default ({onClick, size = '40', fill, outline}) => (
  <Container onClick={(e) => onClick && onClick(e)}>
    <svg viewBox='0 0 46 44' width={size} height={size}>
      <g className='star'>
        <polygon points='
          24.000,34.000
          35.756,40.180
          33.511,27.090
          43.021,17.820
          29.878,15.910
          24.000,4.000
          18.122,15.910
          4.979,17.820
          14.489,27.090
          12.244,40.180
          24.000,34.000
        '
        fill={fill ? 'rgb(250,210,50)' : 'transparent'} 
        stroke={outline ? 'rgb(250,210,50)' : 'rgb(255,240,200)'} 
        strokeWidth='3'
        />
      </g>
    </svg>
  </Container>
)

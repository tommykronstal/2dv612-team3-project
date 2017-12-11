import React, {Component} from 'react'
import styled from 'styled-components'

const OverlayShadow = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 100000;
  background-color: rgba(1, 1, 1, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
`

export const Dialog = ({Component, onOverlayClick}) => {
  return (
    <OverlayShadow
      onClick={e => {
        e.stopPropagation()
        onOverlayClick()
      }}
    >
    <div onClick={e => e.stopPropagation()}>
      <Component />
    </div>
    </OverlayShadow>
  )
}

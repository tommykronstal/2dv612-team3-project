import React from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input`
  box-sizing: border-box;
  font-family: Helvetica, arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  width: 100%;
  color: rgb(140, 140, 140);
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  border-radius: 0;
  -webkit-appearance: none;

  :focus + label {
    opacity: 0;
  }
`

const Label = styled.label`
  font-family: Helvetica, arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  position: absolute;
  top: -0.3rem;
  left: 0rem;
  right: 0;
  color: rgb(200,200,200);
  pointer-events: none;
  user-select: none;
  text-align: left;

  ${props => props.value && css`
    opacity: 0;
  `}
`

const Div = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  max-width: 22rem;
  min-width: 8rem;
  width: 100%;
  position: relative;
`

export default props => {
  const value = props.value || ''
  const label = props.label || 'Search'

  return (
    <Div>
      <Input name='search-bar' onChange={e => props.onChange(e)} type='text' value={value} />
      <Label for='search-bar' value={value}>{label}</Label>
    </Div>
  )
}

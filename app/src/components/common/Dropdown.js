import React from 'react'
import styled from 'styled-components'

const Dropdown = styled.select`
  padding: 8px;
  margin-bottom: 1rem;
  background: white;
  width: ${props => (props.width ? props.width : 128)}px;
  height: ${props => (props.height ? props.height : 32)}px;

  .styled-select: focus {
    outline: 0 !important;
  }
`

const DropDownItem = styled.option`
  padding: 8px;
`

export default ({label = 'Select a category', options, name, onClick, width, height, value}) => (
  <Dropdown className="styled-select" name={name} value={value || 'default'} onChange={e => onClick(e)}>
    <option disabled value='default'>{label}</option>
    {options.map(({key, value}) => (
      <DropDownItem key={key} value={key}>
        {value}
      </DropDownItem>
    ))}
  </Dropdown>
)

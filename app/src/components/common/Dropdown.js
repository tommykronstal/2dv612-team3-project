import React from 'react'
import styled from 'styled-components'

const Dropdown = styled.select`
  padding: 8px;
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

export default ({options, name, onClick, width, height}) => (
  <Dropdown className="styled-select" name={name} onClick={e => onClick(e)}>
    {options.map(({category}, i) => (
      <DropDownItem key={i} value={category}>
        {category}
      </DropDownItem>
    ))}
  </Dropdown>
)

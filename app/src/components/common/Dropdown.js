import React from 'react'
import styled from 'styled-components'

const Dropdown = styled.select`
  padding: 8px;
  background: white;

  .select-elem: focus {
    outline: 0;
  }
`

const DropDownItem = styled.option``

export default ({options, name, onClick}) => (
  <Dropdown name={name} onClick={e => onClick(e)}>
    {options.map(({category}, i) => (
      <DropDownItem key={i} value={category}>
        {category}
      </DropDownItem>
    ))}
  </Dropdown>
)

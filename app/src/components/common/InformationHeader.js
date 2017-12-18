import React from 'react'
import styled from 'styled-components'
import Headline from './Headline'
import Text from './Text'

const StyledText = styled(Text)`
  color: ${props =>
    props.fadedColor ? props.fadedColor : 'rgb(145, 145, 145)'} !important;

  font-style: ${props =>
    props.fadedTextStyle ? props.fadedTextStyle : 'none'};
`

const InformationContainer = styled.div`
  border-bottom: ${props =>
    props.showUnderline ? '1px solid rgb(145, 145, 145)' : 'none'};

  margin-bottom: 24px;
`

export default ({
  mainText,
  fadedText,
  fadedColor,
  showUnderline = false,
  fadedTextStyle = 'none',
}) => (
  <InformationContainer showUnderline>
    <Headline>{mainText}</Headline>
    <StyledText fadedTextStyle={fadedTextStyle} fadedColor={fadedColor}>
      {fadedText}
    </StyledText>
  </InformationContainer>
)

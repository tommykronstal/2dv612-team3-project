import React from 'react'
import styled from 'styled-components'
import A from '../components/common/A'
import Text from './common/Text'
import Rating from './common/Rating'
import {Dialog} from './Dialogs'
import Annotation from './Annotation'

/**
 * Ignoring predefined padding
 * set from original styled component
 */
const StyledText = styled(Text)`
  color: rgb(210, 210, 210);
  padding-bottom: 0px !important;
  text-align: start;
`
const StyledLabel = styled(Text)`
  color: rgb(210, 210, 210);
  padding-bottom: 0px !important;
  display: inline-block;
`

const MaterialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid rgb(240, 240, 240);
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default ({
  name,
  filename,
  mimetype,
  avgRating,
  userId,
  setRating,
  displayOverlay,
  toggleOverlay,
  ...props
}) => {
  const [_, type] = mimetype.split('/')
  const myRating = props.rating.find(r => r.userid === userId)
  const rating = myRating ? myRating.rating : 0

  return (
    <MaterialContainer>
      {displayOverlay && (
        <Dialog
          Component={() => (
            <Annotation
              annotation={'Page 7 was good'}
              toggleOverlay={toggleOverlay}
            />
          )}
          onOverlayClick={() => toggleOverlay()}
        />
      )}

      <input
        type="button"
        onClick={() => toggleOverlay()}
        value="Display Overlay"
      />
      <ColumnContainer>
        <A href={`/uploads/${filename}`} target="_blank">
          {name}
        </A>
        <StyledText>{type}</StyledText>
      </ColumnContainer>
      <Rating
        small
        avg={avgRating}
        rating={rating}
        onClick={setRating}
        amount={props.rating.length}
      />
    </MaterialContainer>
  )
}

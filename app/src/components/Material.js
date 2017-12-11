import React from 'react'
import styled from 'styled-components'
import A from '../components/common/A'
import Text from './common/Text'
import Rating from './common/Rating'
import {Dialog} from './Dialogs'
import Annotation from './Annotation'
import MaterialIcon from 'material-icons-react'

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
  border-radius: 8px;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

// Could not get hover effect on <MaterialIcon />
// so put it on container instead
const IconContainer = styled.div`
  display: flex;
  margin-left: 6px;
  justify-content: center;
  :hover {
    cursor: pointer !important;
  }
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
  _id: materialId,
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
              annotation={''}
              toggleOverlay={toggleOverlay}
              materialId={materialId}
            />
          )}
          onOverlayClick={() => toggleOverlay()}
        />
      )}
      <ColumnContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 32,
          }}
        >
          <A href={`/uploads/${filename}`} target="_blank">
            {name}
          </A>
          <IconContainer onClick={() => toggleOverlay()}>
            <MaterialIcon icon="comment" size={20} color={'#9E9E9E)'}/>
          </IconContainer>
        </div>
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

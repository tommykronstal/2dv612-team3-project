import React from 'react'
import styled from 'styled-components'
import A from '../components/common/A'
import Text from './common/Text'
import Rating from './common/Rating'

/**
 * Ignoring predefined padding
 * set from original styled component
 */
const StyledText = styled(Text)`
	color: ${props => (props.color ? props.color : 'initial')};
	padding-bottom: 0px !important;
	text-align: start;
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

export default ({name, filename, mimetype, avgRating, userId, setRating, ...props}) => {
	const [_, type] = mimetype.split('/')
	const myRating = props.rating.find(r => r.userid = userId) 

	console.log(props)

	const rating = myRating ? myRating.rating : 0

	return (
		<MaterialContainer>
			<ColumnContainer>
				<A href={`/uploads/${filename}`} target='_blank'>{name}</A>
				<StyledText color="#9E9E9E">{type}</StyledText>
			</ColumnContainer>
			<Rating small avg={avgRating} rating={rating} onClick={setRating} />
		</MaterialContainer>
	)
}

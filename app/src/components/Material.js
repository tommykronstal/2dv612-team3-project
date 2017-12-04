import React from 'react'
import styled from 'styled-components'
import Link from './common/Link'
// import {Link} from 'react-router-dom'
import Text from './common/Text'

/**
 * Ignoring predefined padding
 * set from original component
 */
const StyledText = styled(Text)`
	color: ${props => (props.color ? props.color : 'initial')};
	padding-bottom: 0px !important;
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

export default ({name, originalname, mimetype, ...props}) => {
	const [_, type] = mimetype.split('/')
	return (
		<MaterialContainer>
			<ColumnContainer>
				<StyledText>{name}</StyledText>
				<StyledText color="#9E9E9E">{type}</StyledText>
			</ColumnContainer>
			<Link to='/'>View Material</Link>
		</MaterialContainer>
	)
}

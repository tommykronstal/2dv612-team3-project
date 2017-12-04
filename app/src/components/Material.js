import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Text from './common/Text'

// const MaterialContainer = styled.div`
// 	height: 32px;
// 	width: 100%;
// 	background-color: white;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	transition: all ease 0.3s;
// 	background-color: #FAFAFA;
// 	border-radius: 8px;
// 	padding: 6px;

// 	:hover {
// 		background-color: #BDBDBD;
// 	}
// `
// const StyledText = styled(Text)`
// 	padding-bottom: 0 !important;
// `

// const ItemContainer = styled.div`
// 	margin: 0;
// 	padding: 0;
// `

const StyledText = styled(Text)`
	color: ${props => (props.color ? props.color : 'initial')};
`

export default ({name, originalname, mimetype, ...props}) => {
	const [_, type] = mimetype.split('/')
	return (
		<div
			className="material-container"
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<div
				className="right-column"
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<StyledText>{name}</StyledText>
				<StyledText color="#9E9E9E">{type}</StyledText>
			</div>
			<div className="left-column">
				<Link to="">View</Link>
			</div>
		</div>
	)
}

// <MaterialContainer>
// 	<ItemContainer>
// 		<StyledText>{`Name: ${name}`}</StyledText>
// 	</ItemContainer>
// 	<ItemContainer>
// 		<StyledText>{`Type: ${type}`}</StyledText>
// 	</ItemContainer>
// </MaterialContainer>

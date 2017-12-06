import styled from 'styled-components'

export default styled.li`
	list-style-type: none;
	padding: 0.8rem 0;
	border-top: ${props => props.displayBorder ? '1px solid rgb(240,240,240)' : 'none'};
`
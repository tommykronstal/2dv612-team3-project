import React, {Component} from 'react'
import styled from 'styled-components'

const UploadContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

class FileUpload extends Component {
	handleChange = () => {
		const file = this.refs.fileRef.files[0]
		const fr = new FileReader()

		if (file) {
			fr.onloadend = () => {
				this.props.onFileReady(file)
			}
		}
		fr.readAsDataURL(file)
	}

	render() {
		return (
			<UploadContainer>
				<input
					type="file"
					accept={this.props.accepting || ''}
					ref="fileRef"
					onChange={this.handleChange}
				/>
			</UploadContainer>
		)
	}
}

export default FileUpload

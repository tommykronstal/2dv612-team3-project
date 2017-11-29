import React, {Component} from 'react'
import Content from '../components/common/Content'
import Input from '../components/common/Input'
import {UPDATE_PRODUCT} from '../formTypes'
import {updateField} from '../actions/form'
import {connect} from 'react-redux'
import Button from '../components/common/Button'
import FileUpload from '../components/FileUpload'
import {setStatus} from '../actions/status'
import {submitForm} from '../actions/form'

class UpdateProduct extends Component {
	state = {displayWarning: false}

	handleUpload = e => {
		e.preventDefault()
		const {
			form: {name, pdf},
			companyId,
			match: { params: { productId }}
		} = this.props

		if (!name || !pdf) {
			return this.setState(() => ({displayWarning: true}))
		}

		this.props.tryUpdateProduct(companyId, productId)
	}

	onFileReady = file => {
		this.props.dispatch(updateField(UPDATE_PRODUCT, 'pdf', file))
	}

	render() {
		const {
			form: {name, productFile},
			loading: {isLoading},
			updateField: _updateField,
		} = this.props
		return (
			<Content>
				<form
					onSubmit={e => this.handleUpload(e)}
					onChange={() => {
						if (name && productFile && this.state.displayWarning) {
							this.setState(() => ({displayWarning: false}))
						}
					}}
				>
					<FileUpload
						accepting="application/pdf"
						warningMessage="Please provide a PDF."
						onFileReady={this.onFileReady}
					/>

					<Input
						warning={
							this.state.displayWarning
								? 'Please select a name and a file.'
								: null
						}
						type="text"
						label="Material Name"
						name="name"
						value={name}
						onChange={_updateField}
					/>
					<Button primary loading={isLoading}>
						Save
					</Button>
				</form>
			</Content>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	tryUpdateProduct: (companyId, productId) =>
		dispatch(
			submitForm(
				UPDATE_PRODUCT,
				`/api/company/${companyId}/product/${productId}`,
				() => setStatus('Product updated'),
				true,
				true
			)
		),
	updateField: ({target}) =>
		dispatch(updateField(UPDATE_PRODUCT, target.name, target.value)),
	dispatch,
})

const mapStateToProps = ({loading, form, auth}) => ({
	loading,
	form: form[UPDATE_PRODUCT] || {},
	companyId: auth.companyId
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)

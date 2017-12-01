import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateField, submitForm} from '../actions/form'
import {ADD_PRODUCT} from '../formTypes'
import {fetchCategories} from '../actions/categories'
import Button from '../components/common/Button'
import Dropdown from '../components/common/Dropdown'
import Input from '../components/common/Input'
import Loading from '../components/common/Loading'
import FormSection from '../components/common/FormSection'
import {setStatus} from '../actions/status'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
  margin: 10rem auto;
`

class AddProduct extends Component {
  componentDidMount() {
    const {categories} = this.props

    // Only fetching categories if they are not previously fetched
    if (!categories.length) {
      this.props.fetchCategories({form: ADD_PRODUCT, field: 'category'})
    }
  }

  storeProduct = e => {
    const {name} = this.props.form
    if (!name || this.props.isLoading) return

    this.props.tryRegisterProduct(this.props.companyId)
  }

  render() {
    const {categories, form: {name, category}, isLoading} = this.props

     return (
      <FormSection onSubmit={e => this.storeProduct(e)}>
        {isLoading ? (
          <SpinnerContainer>
            <Loading />
          </SpinnerContainer>
        ) : (
          <div>
            <Dropdown
              name="category"
              onClick={this.props.updateField}
              options={categories.map(({ _id, categoryName}) => ({ key: _id, value: categoryName }))}
              value={category}
            />
            <Input
              value={name}
              type="text"
              name="name"
              label="Product Name"
              onChange={this.props.updateField}
            />
            <Button disabled={!(category && name)} loading={isLoading} primary>Save Product</Button>
          </div>
        )}
      </FormSection>
    )
  }
}

const mapStateToProps = ({
  loading: {isLoading},
  categories: {categories},
  form,
  auth
}) => ({
  categories,
  form: form[ADD_PRODUCT] || {},
  companyId: auth.companyId,
  isLoading
})

const mapDispatchToProps = dispatch => ({
  updateField: ({target}) =>
    dispatch(updateField(ADD_PRODUCT, target.name, target.value)),

  fetchCategories: updateConfig => dispatch(fetchCategories(updateConfig)),
  tryRegisterProduct: companyId =>
    dispatch(
      submitForm(
        ADD_PRODUCT,
        `/api/company/${companyId}/product`,
        () => setStatus('Product Created.'),
        true,
      ),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateField, submitForm} from '../actions/form'
import {ADD_PRODUCT} from '../formTypes'
import {fetchCategories} from '../actions/categories'
import Button from '../components/common/Button'
import Content from '../components/common/Content'
import Dropdown from '../components/common/Dropdown'
import Input from '../components/common/Input'
import {setStatus} from '../actions/status'
import Spinner from 'react-spinkit'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
    e.preventDefault()

    const {name} = this.props.form
    if (!name) return

    this.props.tryRegisterProduct(this.props.companyId)
  }

  render() {
    const {categories, form: {name}} = this.props
    return (
      <Content>
        {!categories.length ? (
          <SpinnerContainer>
            <Spinner name="wave" fadeIn='none' color={'#6ea0dc'}/>
          </SpinnerContainer>
        ) : (
          <div>
            <form onSubmit={e => this.storeProduct(e)}>
              <Dropdown
                name="category"
                onClick={this.props.updateField}
                options={categories}
              />
              <Input
                value={name}
                type="text"
                name="name"
                label="Product Name"
                onChange={this.props.updateField}
              />
              <Button disabled={this.props.isLoading} primary>Save Product</Button>
            </form>
          </div>
        )}
      </Content>
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

import React, {Component} from 'react'
import {get} from '../lib/http'
import {connect} from 'react-redux'
import {updateField} from '../actions/form'
import {ADD_PRODUCT} from '../formTypes'
import {fetchCategories} from '../actions/categories'
import Button from '../components/common/Button'
import Content from '../components/common/Content'
import Dropdown from '../components/common/Dropdown'
import Input from '../components/common/Input'

class AddProduct extends Component {
  componentDidMount() {
    const {categories, form: {category}} = this.props

    // Only fetching categories if they are not previously fetched
    if (!categories.length) {
      this.props.fetchCategories({form: ADD_PRODUCT, field: 'category'})
    }
  }

  tryRegisterProduct = (e) => {
    e.preventDefault()

    const {productName, category} = this.props.form
    if (!productName) return

    /**
     * TODO: dispatch submit for data here
     *       try to figure if there is a posibility
     *       to redirect when the request is done.
     */

  }

  render() {
    const {categories, form: {productName}} = this.props
    return (
      <Content>
        {!categories.length ? (
          <p>Spinner...</p>
        ) : (
          <div>
            <form onSubmit={e => this.tryRegisterProduct(e)}>
              <Dropdown
                name="category"
                onClick={this.props.updateField}
                options={categories}
              />
              <Input
                value={productName}
                type="text"
                name="productName"
                label="Product Name"
                onChange={this.props.updateField}
              />
              <Button primary>Save Product</Button>
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
}) => ({
  categories,
  form: form[ADD_PRODUCT] || {},
})

const mapDispatchToProps = dispatch => ({
  updateField: ({target}) =>
    dispatch(updateField(ADD_PRODUCT, target.name, target.value)),

  fetchCategories: (updateConfig) => dispatch(fetchCategories(updateConfig)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)

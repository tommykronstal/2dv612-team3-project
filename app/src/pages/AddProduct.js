import React, {Component} from 'react'
import {get} from '../lib/http'
import {connect} from 'react-redux'
import {updateField} from '../actions/form'
import {ADD_PRODUCT} from '../formTypes'
import {fetchCategories} from '../actions/categories'

import Content from '../components/common/Content'
import Dropdown from '../components/common/Dropdown'
import Input from '../components/common/Input'

class AddProduct extends Component {
  componentDidMount() {
    const {categories} = this.props

    // Only fetching categories if they are not previously fetched
    if (!categories.length) {
      this.props.fetchCategories()
    }
  }

  render() {
    const {categories, form: {productName}} = this.props
    return (
      <Content>
        {!categories.length ? (
          <p>Spinner...</p>
        ) : (
          <div>
            <Dropdown
              name="category"
              onClick={this.props.updateField}
              options={categories}
            />
            <Input
              value={productName}
              type="text"
              name="productName"
              label="Name of Product"
              onChange={this.props.updateField}
            />
          </div>
        )}
      </Content>
    )
  }
}

const mapStateToProps = ({categories: {categories}, form}) => ({
  categories,
  form: form[ADD_PRODUCT] || {},
})

const mapDispatchToProps = dispatch => ({
  updateField: ({target}) =>
    dispatch(updateField(ADD_PRODUCT, target.name, target.value)),
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)

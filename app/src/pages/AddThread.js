import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateField, submitForm} from '../actions/form'
import {ADD_THREAD} from '../formTypes'
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

class AddThread extends Component {
  componentDidMount() {
    const {categories} = this.props

    // Only fetching categories if they are not previously fetched
    if (!categories.length) {
      this.props.fetchCategories({form: ADD_THREAD, field: 'category'})
    }
  }

  storeThread = e => {
    const {name} = this.props.form
    if (!name || this.props.isLoading) return

    this.props.tryRegisterProduct(this.props.companyId)
  }

  render() {
    const {categories, form: {name, category, question, title}, isLoading} = this.props

     return (
      <FormSection onSubmit={e => this.storeThread(e)}>
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
              value={title}
              type="text"
              name="title"
              label="Thread Title"
              onChange={this.props.updateField}
            />
            <Input
              value={question}
              type="text"
              name="question"
              label="Question"
              onChange={this.props.updateField}
            />
            <Button disabled={!(category && title)} loading={isLoading} primary>Create Thread</Button>
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
  form: form[ADD_THREAD] || {},
  companyId: auth.companyId,
  isLoading
})

const mapDispatchToProps = dispatch => ({
  updateField: ({target}) =>
    dispatch(updateField(ADD_THREAD, target.name, target.value)),

  fetchCategories: updateConfig => dispatch(fetchCategories(updateConfig)),
  tryRegisterProduct: companyId =>
    dispatch(
      submitForm(
        ADD_THREAD,
        `/api/thread/`,
        () => setStatus('Thread Created.'),
        true,
      ),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddThread)

import React from 'react'
import renderer from 'react-test-renderer'

// todo not sure how to use mapStateToProps in test
import { AddCategory, mapStateToProps, mapDispatchToProps, handleResponse } from './AddCategory'
import { ADD_CATEGORY } from '../formTypes'
import { submitForm, updateField } from '../actions/form'

describe('AddCategory', () => {

  describe('component', () => {
    it('renders correctly, initial', () => {
      const props = {
        addCategory: jest.fn(),
        updateField: jest.fn(),
        form: {},
        loading: false
      }

      const tree = renderer.create(<AddCategory {...props} />).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('renders correctly, with data', () => {
      const props = {
        addCompany: jest.fn(),
        updateField: jest.fn(),
        form: {
          category: 'new category',
        },
        loading: true
      }

      const tree = renderer.create(<AddCategory {...props} />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('actions', () => {
    it('should be able to dispatch submit form actions', () => {
      const dispatch = jest.fn()

      const props = mapDispatchToProps(dispatch)
      props.addCategory()

      expect(dispatch).toBeCalledWith(submitForm(
        ADD_CATEGORY,
        '/api/category',
        handleResponse
      ))
    })
  })
})

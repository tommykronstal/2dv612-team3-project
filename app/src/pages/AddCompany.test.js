import React from 'react'
import renderer from 'react-test-renderer'

import { AddCompany, mapStateToProps, mapDispatchToProps, handleResponse } from './AddCompany'
import { ADD_COMPANY } from '../formTypes'
import { submitForm, updateField } from '../actions/form'

describe('AddCompany', () => {

  describe('component', () => {
    it('renders correctly, initial', () => {
      const props = {
        addCompany: jest.fn(),
        updateField: jest.fn(),
        form: {},
        loading: false
      }
  
      const tree = renderer.create(<AddCompany {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  
    it('renders correctly, with data', () => {
      const props = {
        addCompany: jest.fn(),
        updateField: jest.fn(),
        form: {
          companyName: 'company!', 
          firstName: 'kalle',
          lastName: 'kula',
          email: 'woo@woo.com', 
          password: 'aaa' 
        },
        loading: true
      }
  
      const tree = renderer.create(<AddCompany {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  })

  describe('state', () => {
    it('should have access to representative form and loading state', () => {
      const state = {
        loading: { isLoading: false },
        form: { [ADD_COMPANY]: {username: 'woooo'}}
      }
    
      expect(mapStateToProps(state)).toEqual({ 
        loading: state.loading, 
        form: state.form[ADD_COMPANY] 
      })
    })
  })

  describe('actions', () => {
    it('should be able to dispatch submit form actions', () => {
      const dispatch = jest.fn()
    
      const props = mapDispatchToProps(dispatch)
      props.addCompany()
    
      expect(dispatch).toBeCalledWith(submitForm(
        ADD_COMPANY, 
        '/api/company', 
        handleResponse
      ))
    })

    it('should be able to dispatch update field actions', () => {
      const dispatch = jest.fn()
      const event = {
        target: {
          name: 'user',
          value: 'kalle'
        }
      }
    
      const props = mapDispatchToProps(dispatch)
      props.updateField(event)
    
      expect(dispatch).toBeCalledWith(updateField(ADD_COMPANY, event.target.name, event.target.value))
    })
  })
})

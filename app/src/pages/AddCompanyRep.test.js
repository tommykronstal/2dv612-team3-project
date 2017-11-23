import React from 'react'
import renderer from 'react-test-renderer'

import { AddCompanyRep, mapStateToProps, mapDispatchToProps, handleResponse } from './AddCompanyRep'
import { ADD_COMPANY_REP } from '../formTypes'
import { submitForm, updateField } from '../actions/form'

describe('AddCompanyRep', () => {

  describe('component', () => {
    it('renders correctly, initial', () => {
      const props = {
        addCompanyRep: jest.fn(),
        updateField: jest.fn(),
        form: {},
        loading: false,
        auth: { companyId: '1234' }
      }
  
      const tree = renderer.create(<AddCompanyRep {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  
    it('renders correctly, with data', () => {
      const props = {
        addCompanyRep: jest.fn(),
        updateField: jest.fn(),
        form: { 
          firstName: 'kalle',
          lastName: 'kula',
          email: 'woo@woo.com', 
          password: 'aaa' 
        },
        loading: true,
        auth: { companyId: '1234' }
      }
  
      const tree = renderer.create(<AddCompanyRep {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  })

  describe('state', () => {
    it('should have access to company id, representative form and isLoading state', () => {
      const state = {
        auth: { companyId: '1234' },
        loading: { isLoading: false },
        form: { [ADD_COMPANY_REP]: {username: 'woooo'}}
      }
    
      expect(mapStateToProps(state)).toEqual({ 
        companyId: state.auth.companyId, 
        isLoading: state.loading.isLoading, 
        form: state.form[ADD_COMPANY_REP] 
      })
    })
  })

  describe('actions', () => {
    it('should be able to dispatch submit form actions', () => {
      const dispatch = jest.fn()
      const companyId = '1245'
    
      const props = mapDispatchToProps(dispatch)
      props.addCompanyRep(companyId)
    
      expect(dispatch).toBeCalledWith(submitForm(
        ADD_COMPANY_REP, 
        `/api/company/${companyId}`, 
        handleResponse,
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
    
      expect(dispatch).toBeCalledWith(updateField(ADD_COMPANY_REP, event.target.name, event.target.value))
    })
  })
})

import React from 'react'
import renderer from 'react-test-renderer'

import { RegisterConsumer, mapStateToProps, mapDispatchToProps } from './RegisterConsumer'
import { setUserToLoggedIn } from '../actions/auth'
import { REGISTER_CONSUMER } from '../formTypes'
import { submitForm, updateField } from '../actions/form'

describe('RegisterConsumer', () => {

  describe('component', () => {
    it('renders correctly, initial', () => {
      const props = {
        tryRegister: jest.fn(),
        updateField: jest.fn(),
        form: {},
        loading: { isLoading: false },
        auth: { isAuthenticated: false }
      }
  
      const tree = renderer.create(<RegisterConsumer {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  
    it('renders correctly, with data', () => {
      const props = {
        tryRegister: jest.fn(),
        updateField: jest.fn(),
        form: {
          firstName: 'Kalle',
          lastName: 'Kula', 
          email: 'woo@woo.com', 
          password: 'aaa' 
        },
        loading: { isLoading: true },
        auth: { isAuthenticated: false }
      }
  
      const tree = renderer.create(<RegisterConsumer {...props} />).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  })

  describe('state', () => {
    it('should have access to auth, register form and loading state', () => {
      const state = {
        auth: { token: 'wooo' },
        loading: { isLoading: false },
        form: { [REGISTER_CONSUMER]: {username: 'woooo'}}
      }
    
      expect(mapStateToProps(state)).toEqual({ 
        auth: state.auth, 
        loading: state.loading, 
        form: state.form[REGISTER_CONSUMER] 
      })
    })
  })

  describe('actions', () => {
    it('should be able to dispatch submit form actions', () => {
      const dispatch = jest.fn()
    
      const props = mapDispatchToProps(dispatch)
      props.tryRegister()
    
      expect(dispatch).toBeCalledWith(submitForm(REGISTER_CONSUMER, '/api/user/register', setUserToLoggedIn, false))
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
    
      expect(dispatch).toBeCalledWith(updateField(REGISTER_CONSUMER, event.target.name, event.target.value))
    })
  })
})

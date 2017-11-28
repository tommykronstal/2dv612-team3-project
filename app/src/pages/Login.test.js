import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import { Login, mapStateToProps, mapDispatchToProps } from './Login'
import { setUserToLoggedIn } from '../actions/auth'
import { LOGIN } from '../formTypes'
import { submitForm, updateField } from '../actions/form'

describe('Login', () => {

  describe('component', () => {
    it('renders correctly, initial', () => {
      const props = {
        tryLogin: jest.fn(),
        updateField: jest.fn(),
        form: {},
        loading: { isLoading: false },
        auth: { isAuthenticated: false }
      }
  
      const tree = renderer.create(<MemoryRouter><Login {...props} /></MemoryRouter>).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  
    it('renders correctly, with data', () => {
      const props = {
        tryLogin: jest.fn(),
        updateField: jest.fn(),
        form: { email: 'woo@woo.com', password: 'aaa' },
        loading: { isLoading: true },
        auth: { isAuthenticated: false }
      }
  
      const tree = renderer.create(<MemoryRouter><Login {...props} /></MemoryRouter>).toJSON()
  
      expect(tree).toMatchSnapshot()
    })
  })

  describe('state', () => {
    it('should have access to auth, login form and loading state', () => {
      const state = {
        auth: { token: 'wooo' },
        loading: { isLoading: false },
        form: { [LOGIN]: {username: 'woooo'}}
      }
    
      expect(mapStateToProps(state)).toEqual({ 
        auth: state.auth, 
        loading: state.loading, 
        form: state.form[LOGIN] 
      })
    })
  })

  describe('actions', () => {
    it('should be able to dispatch submit form actions', () => {
      const dispatch = jest.fn()
    
      const props = mapDispatchToProps(dispatch)
      props.tryLogin()
    
      expect(dispatch).toBeCalledWith(submitForm(LOGIN, '/api/user/login', setUserToLoggedIn, false))
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
    
      expect(dispatch).toBeCalledWith(updateField(LOGIN, event.target.name, event.target.value))
    })
  })
})

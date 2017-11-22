import React from 'react'
import renderer from 'react-test-renderer'

import { Logout, mapStateToProps, mapDispatchToProps } from './Logout'
import { logout } from '../actions/auth'

describe('Logout', () => {
  it('renders correctly', () => {
    const auth = { isAuthenticated: true }
    const logout = jest.fn()

    const tree = renderer
      .create(<Logout auth={auth} logout={logout} />)
      .toJSON()

    expect(logout).toHaveBeenCalled()
      
    expect(tree).toMatchSnapshot()
  })

  describe('state', () => {
    it('should have access to auth state', () => {
      const state = {
        auth: { token: 'wooo' }
      }
    
      expect(mapStateToProps(state)).toEqual({ auth: state.auth })
    })
  })

  describe('actions', () => {
    it('should be able to dispatch logout actions', () => {
      const dispatch = jest.fn()
    
      const props = mapDispatchToProps(dispatch)
      props.logout()
    
      expect(dispatch).toBeCalledWith(logout())
    })
  })
})

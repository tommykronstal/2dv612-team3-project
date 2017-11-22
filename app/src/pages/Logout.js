import React, {Component} from 'react'
import {logout} from '../actions/auth'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CenteredForm from '../components/common/CenteredForm'
import Loading from '../components/common/Loading'

export class Logout extends Component {

  componentWillMount() {
    this.props.logout()
  }

  render() {
    if (!this.props.auth.isAuthenticated) return <Redirect to='/login' />

    return (
      <CenteredForm>
        <Loading />
      </CenteredForm>
    )
  }
}

export const mapStateToProps = state => ({
  auth: state.auth
})

export const mapDispatchToProps = dispatch => ({
  logout: _ => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)

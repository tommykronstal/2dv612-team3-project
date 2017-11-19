import React, {Component} from 'react'
import {logout} from '../actions/auth'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CenteredForm from '../components/common/CenteredForm'
import Loading from '../components/common/Loading'

class Logout extends Component {

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

function mapDispatchToProps(dispatch) {
  return {
    logout: _ => dispatch(logout()),
  }
}

export default connect(({auth}) => ({auth}), mapDispatchToProps)(Logout)

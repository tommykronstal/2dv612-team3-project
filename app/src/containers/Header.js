import { connect } from 'react-redux'
import Header from '../components/common/Header'
import { toggleNavigation } from '../actions/navigation'

export default connect(
  ({navigation, auth}) => ({
    isAuthenticated: auth.isAuthenticated,
    menuActive: navigation.active
  }), 
  dispatch => ({ toggleNavigation: () => dispatch(toggleNavigation()) })
)(Header)

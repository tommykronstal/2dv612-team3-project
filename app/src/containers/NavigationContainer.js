import { connect } from 'react-redux'
import NavigationContainer from '../components/common/NavigationContainer'
import { toggleNavigation } from '../actions/navigation'

export default connect(
  ({navigation}) => ({ menuActive: navigation.active }), 
  dispatch => ({ toggleNavigation: () => dispatch(toggleNavigation()) })
)(NavigationContainer)

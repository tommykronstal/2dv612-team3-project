import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';

function mapStateToProps ({auth}) {
  return {auth}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

import { connect } from 'react-redux';
import StatusModal from '../components/common/StatusModal';
import { dismissStatus } from '../actions/status';

function mapStateToProps ({status}) {
  return status;
}

// Maps functions to update state to properties
function mapDispatchToProps (dispatch) {
  return {
    dismissStatus: () => dispatch(dismissStatus())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusModal);

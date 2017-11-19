import { connect } from 'react-redux'
import StatusModal from '../components/common/StatusModal'
import { dismissStatus } from '../actions/status'

export default connect(
  ({status}) => status, 
  dispatch => ({ dismissStatus: () => dispatch(dismissStatus()) })
)(StatusModal)

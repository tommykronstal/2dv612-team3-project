import { UPDATE_COMPANY_NAME} from '../actions/types';

const initialState = {
  companyName: 'Hello',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_COMPANY_NAME:
      
      return {
        ...state,
        companyName: action.companyName
      };
    default:
      return state;
  }
}

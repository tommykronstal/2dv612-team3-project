import { UPDATE_TEXT, UPDATE_WELCOME_MESSAGE } from '../actions/types';

const initialState = {
  text: '',
  message: ''
};

// Function that updates the state
export default function example (state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TEXT:
      // Always create a copy of the state
      return {
        ...state,
        text: action.text
      };
    case UPDATE_WELCOME_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
}

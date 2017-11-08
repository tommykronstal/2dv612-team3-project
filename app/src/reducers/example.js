import { UPDATE_TEXT, INCREMENT } from '../actions/types';

const initialState = {
  text: '',
  counter: 0
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
    case INCREMENT:
      // Always create a copy of the state
      return {
        ...state,
        counter: state.counter + 1
      };
    default:
      return state;
  }
}

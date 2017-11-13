import { UPDATE_TEXT, UPDATE_WELCOME_MESSAGE } from './types';

export function updateText (text) {
  return {
      type: UPDATE_TEXT,
      text: text
  };
}

export function updateWelcomeMessage () {
  return { type: UPDATE_WELCOME_MESSAGE };
}

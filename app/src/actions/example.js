import { UPDATE_TEXT } from './types';

export function updateText (text) {
  return {
      type: UPDATE_TEXT,
      text: text
  };
}

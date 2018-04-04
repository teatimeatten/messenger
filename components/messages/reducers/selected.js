import { SELECTED_CONVERSATION } from '../actions';

const initialState = {
  id: null,
};

export default function selected(state=initialState, action) {
  switch(action.type) {
  case SELECTED_CONVERSATION:
    return Object.assign({}, state, {
      id: action.conversation_id,
    });
  default:
    return state;
  }
}
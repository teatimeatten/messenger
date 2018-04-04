import { LOAD_CONVERSATION_MESSAGES, RECEIVE_MESSAGE } from '../actions';

const initialState = {
};

export default function messages(state=initialState, action) {
  switch(action.type) {
  case LOAD_CONVERSATION_MESSAGES:
    return Object.assign({}, state, {
      [action.conversation_id]: action.messages,
    });
    break;
  case RECEIVE_MESSAGE:
    return Object.assign({}, state, {
      [action.conversation_id]: [...state[action.conversation_id], action.message],
    });
  default:
    return state;
  }
}
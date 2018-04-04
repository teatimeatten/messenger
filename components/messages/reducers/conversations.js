import {
  START_CREATE_CONVERSATION, LOAD_CONVERSATIONS,
  FINISH_CREATE_CONVERSATION
} from '../actions';

const initialState = {};

export default function conversations(state=initialState, action) {
  switch(action.type) {
  case LOAD_CONVERSATIONS:
    let conversations = {};
    action.conversations.map(conversation => {
      conversations[conversation.id] = conversation;
    });
    return conversations;
  case FINISH_CREATE_CONVERSATION:
    if (action.conversation) {
      return Object.assign({}, state, {
        [action.conversation.id]: action.conversation
      });
    }
    return state;
  default:
    return state;
  }
}
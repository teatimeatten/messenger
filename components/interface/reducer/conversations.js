import { LOAD_CONVERSATIONS, DELETE_CONVERSATION, ADD_CONVERSATION, UPDATE_CONVERSATION } from '../actions/conversations';

const initialState = {};

export default function(state=initialState, action) {
  switch(action.type) {
  case LOAD_CONVERSATIONS:
    return Object.assign({}, state,
      action.conversations.reduce((conversations, conversation) => {
        conversations[conversation.id] = conversation;
        return conversations;
      }, {}));
  case DELETE_CONVERSATION:
    return Object.values(state).reduce((conversations, conversation)=>{
      if (conversation.id != action.conversation_id) {
        conversations[conversation.id] = conversation;
      } // Filter out all conversations that dont match the id.
      return conversations;
    }, {});
  case ADD_CONVERSATION:
  case UPDATE_CONVERSATION:
    return Object.assign({}, state, {
      [action.conversation.id]: action.conversation,
    });
  default:
    return state;
  }
}
import {
  NEW_MESSAGE, LOAD_MESSAGES,
  DELETE_MESSAGE, UPDATE_MESSAGE,
} from '../actions/messages';

// Mapping from conversation id to a mapping of message id to message
const initialState = {};

export default function(state=initialState, action) {
  switch(action.type) {
  case NEW_MESSAGE:
  case UPDATE_MESSAGE:
    return Object.assign({}, state, {
      [action.conversation_id]: Object.assign({}, state[action.conversation_id], {
        [action.message.id]: action.message,
      }),
    });
  case LOAD_MESSAGES:
    return Object.assign({}, state, {
      [action.conversation_id]: Object.assign(
        {}, state[action.conversation_id],
        action.messages.reduce((messages, message)=> {
          messages[message.id] = message;
          return messages;
        }, {}),
      ),
    });
  case DELETE_MESSAGE:
    return Object.assign({}, state, {
      [action.conversation_id]: Object.values(state[action.conversation_id]).reduce(
        (messages, message) => {
          if (message.id != action.message_id) {
            messages[message.id] = message;
          }
          return messages;
        }, {}),
    });
  default:
    return state;
  }
}
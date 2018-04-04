import io from 'socket.io-client';

import { SELECTED_CONVERSATION, SEND_MESSAGE } from '../actions';

let socket = io('/messages');

socket.on('connect', () => console.log('connected'));
socket.on('disconnect', () => console.log('connected'));

const initialState = socket;

export default function socket(state=initialState, action) {
  switch(action.type) {
  case SELECTED_CONVERSATION:
    state.emit('join_conversation', action.conversation_id);
    return state;
  case SEND_MESSAGE:
    state.emit('new_message', action.conversation_id, action.message);
    return state;
  default:
    return state
  }
}
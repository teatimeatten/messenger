import { combineReducers, applyMiddleware } from 'redux';

import modal from './modal';
import users from './users';
import conversations from './conversations';
import self from './self';
import messages from './messages';
import socket from './socket';
import details from './details';

import { SELECTED_CONVERSATION } from '../actions';

function selected_id(state = null, action) {
  switch(action.type){
  case SELECTED_CONVERSATION:
    return action.conversation_id;
  default:
    return state;
  }
}

export default combineReducers({
  selected_id,
  conversations,
  modal,
  users,
  self,
  messages,
  socket,
  details,
});
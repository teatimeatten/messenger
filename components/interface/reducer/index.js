import { combineReducers } from 'redux';

import conversations from './conversations';
import messages from './messages';
import modal from './modal';
import online from './online';
import self from './self';
import users from './users';

import { SELECT_CONVERSATION, REQUEST_CREATE_CONVERSATION, FINISH_CREATE_CONVERSATION } from '../actions/conversations';

const selected_id = (state=null, action) => {
  switch(action.type) {
  case SELECT_CONVERSATION:
    return action.conversation_id;
  default:
    return state;
  }
}

const submitting = (state=false, action) => {
  switch(action.type) {
  case REQUEST_CREATE_CONVERSATION:
    return true;
  case FINISH_CREATE_CONVERSATION:
    return false;
  default:
    return state;
  }
}

export default combineReducers({
  conversations,
  messages,
  modal,
  online,
  selected_id,
  self,
  submitting,
  users,
});
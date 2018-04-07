import axios from 'axios';

export const LOAD_CONVERSATIONS = 'LOAD-CONVERSATIONS';
export function loadConversations(conversations) {
  return {
    type: LOAD_CONVERSATIONS,
    conversations,
  };
}

export const DELETE_CONVERSATION = 'DELETE-CONVERSATION';
export function deleteConversation(conversation_id) {
  return {
    type: DELETE_CONVERSATION,
    conversations_id,
  };
}

export const UPDATE_CONVERSATION = 'UPDATE-CONVERSATION';
export function updateConversation(conversation) {
  return {
    type: UPDATE_CONVERSATION,
    conversation,
  };
}

export const ADD_CONVERSATION = 'ADD-CONVERSATION';
export function addConversation(conversation) {
  return {
    type: ADD_CONVERSATION,
    conversation,
  }
}

export const REQUEST_CREATE_CONVERSATION = 'REQUEST-CREATE-CONVERSATION';
export function requestCreateConversation() {
  return {
    type: REQUEST_CREATE_CONVERSATION,
  };
}

export const FINISH_CREATE_CONVERSATION = 'FINISH-CREATE-CONVERSATION';
export function finishCreateConversation() {
  return {
    type: FINISH_CREATE_CONVERSATION,
  };
}

export function createConversation(conversation) {
  return dispatch => {
    dispatch(requestCreateConversation());
    axios.post('/conversations', conversation)
      .then(({data}) => {
        dispatch(addConversation(data.conversation));
      }).finally(()=>{
        dispatch(finishCreateConversation());
      });
  }
}

export const CHANGE_CONVERSATION_NAME = 'CHANGE-CONVERSATION-NAME';
export function changeConversationName(conversation_id, name) {
  return {
    type: CHANGE_CONVERSATION_NAME,
    conversation_id,
    name,
  };
}

export const SELECT_CONVERSATION = 'SELECT-CONVERSATION';
export function selectConversation(conversation_id) {
  return {
    type: SELECT_CONVERSATION,
    conversation_id,
  };
}
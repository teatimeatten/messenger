import axios from 'axios';
import io from 'socket.io-client';

export const SELECTED_CONVERSATION = 'SELECTED-CONVERSATION';
export function selectConversation(conversation_id) {
  return {
    type: SELECTED_CONVERSATION,
    conversation_id: conversation_id,
  };
}

export const START_REQUEST_MESSAGES = 'START-REQUEST-MESSAGES';
export function startRequestMessages() {
  return {
    type: START_REQUEST_MESSAGES,
  };
}

export const LOAD_CONVERSATION_MESSAGES = 'LOAD-CONVERSATION-MESSAGES';
export function loadConversationMessages(conversation_id, messages) {
  return {
    type: LOAD_CONVERSATION_MESSAGES,
    conversation_id: conversation_id,
    messages: messages,
  };
}

export function requestConversationMessages(conversation_id) {
  return dispatch => {
    dispatch(startRequestMessages());
    axios.get(`/conversations/${conversation_id}/messages`)
      .then(({data}) => {
        console.log(data);
        dispatch(loadConversationMessages(conversation_id, data));
      });
  };
}

export const START_LOAD_CONVERSATION_DETAILS = 'START-LOAD-CONVERSATION-DETAILS';
export function startLoadConversationDetails(conversation_id) {
  return {
    type: START_LOAD_CONVERSATION_DETAILS,
    conversation_id,
  };
}

export const CONVERSATION_DETAILS = 'CONVERSATION-DETAILS';
export function conversationDetails(conversation_id, details) {
  return {
    type: CONVERSATION_DETAILS,
    conversation_id,
    details,
  };
}

export function requestConversationDetails(conversation_id) {
  return dispatch => {
    dispatch(startLoadConversationDetails(conversation_id));

    axios.get(`/conversations/${conversation_id}`)
      .then( ({data}) => {
        dispatch(conversationDetails(conversation_id, data));
      });
  }
}

export const OPEN_CREATE_CONVERSATION_MODAL = 'OPEN-CREATE-CONVERSATION-MODAL';
export function openCreateConversationModal() {
  return {
    type: OPEN_CREATE_CONVERSATION_MODAL,
  };
}

export const CLOSE_CREATE_CONVERSATION_MODAL = 'CLOSE-CREATE-CONVERSATION-MODAL';
export function closeCreateConversationModal() {
  return {
    type: CLOSE_CREATE_CONVERSATION_MODAL,
  };
}

export const START_REQUEST_CONVERSATION = 'START-REQUEST-CONVERSATION';
export function startRequestConversation() {
  return {
    type: START_REQUEST_CONVERSATION,
  };
}

export const LOAD_CONVERSATIONS = 'LOAD-CONVERSATIONS';
export function loadConversations(conversations) {
  return {
    type: LOAD_CONVERSATIONS,
    conversations: conversations,
  };
}

export function requestConversations() {
  return dispatch => {
    dispatch(startRequestConversation());

    return axios.get('/conversations/json')
      .then(({data}) => {
        console.log(data);
        dispatch(loadConversations(data));
      });
  };
}

export const START_REQUEST_USERS = 'REQUEST-USERS';
export function startRequestUsers() {
  return {
    type: START_REQUEST_USERS,
  };
}

export const LOAD_USERS = 'LOAD-USERS';
export function loadUsers(users) {
  return {
    type: LOAD_USERS,
    users: users,
  };
}

export function requestUsers() {
  return dispatch => {
    dispatch(startRequestUsers());

    return axios.get('/users')
      .then(({data}) => {
        let users = {};
        data.map(u => users[u.id] = u);
        dispatch(loadUsers(users));
      });
  }
}

export const START_REQUEST_SELF = 'START-REQUEST-SELF';
export function startRequestSelf() {
  return {
    type: START_REQUEST_SELF,
  };
}

export const LOAD_SELF = 'LOAD-SELF';
export function loadSelf(self) {
  return {
    type: LOAD_SELF,
    self: self,
  };
}

export function requestSelf() {
  return dispatch => {
    dispatch(startRequestSelf());

    return axios.get('/users/self')
      .then( ({data}) => {
        console.log('data');
        dispatch(loadSelf(data))
      });
  }
}

export const RECEIVE_MESSAGE = 'RECEIVE-MESSAGE';
export function receiveMessage(conversation_id, message) {
  return {
    type: RECEIVE_MESSAGE,
    conversation_id: conversation_id,
    message: message
  };
}

export const SUBSCRIBE_CONVERSATION = 'SUBSCRIBE-CONVERSATION';
export function subscribeConversation(conversation_id) {
  return {
    type: SUBSCRIBE_CONVERSATION,
    conversation_id: conversation_id,
  };
}

export const START_CREATE_CONVERSATION = 'START-CREATE-CONVERSATION';
export function startCreateConversation() {
  return {
    type: START_CREATE_CONVERSATION,
  };
}

export const FINISH_CREATE_CONVERSATION = 'FINISH-CREATE-CONVERSATION';
export function finishCreateConversation(conversation) {
  return {
    type: FINISH_CREATE_CONVERSATION,
    conversation: conversation,
  };
}

export function createConversation(name, user_ids) {
  return dispatch => {
    dispatch(startCreateConversation());
    return axios.post('/conversations', {
      name: name,
      user_ids: user_ids,
    }).then(({data}) => {
      console.log(data);
      dispatch(finishCreateConversation(data.conversation));
    });
  }
}

export function connectSocket() {
  return (dispatch, getState) => {
    let { socket } = getState();
    socket.on('new_message', (conversation_id, message) => {
      dispatch(receiveMessage(conversation_id, message));
    });

    return socket;
  }
}

export const SEND_MESSAGE = 'SEND-MESSAGE';
export function sendMessage(conversation_id, message){
  return {
    type: SEND_MESSAGE,
    conversation_id: conversation_id,
    message: message,
  };
}
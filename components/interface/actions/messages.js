export const NEW_MESSAGE = 'NEW-MESSAGE';
export function newMessage(conversation_id, message) {
  return {
    type: NEW_MESSAGE,
    conversation_id,
    message,
  };
} // ADD MESSAGE TO LIST TO DISPLAY

export const LOAD_MESSAGES = 'LOAD-MESSAGES';
export function loadMessages(conversation_id, messages) {
  return {
    type: LOAD_MESSAGES,
    conversation_id,
    messages,
  };
}

export const SEND_MESSAGE = 'SEND-MESSAGE';
export function sendMessage(conversation_id, message) {
  return {
    type: SEND_MESSAGE,
    conversation_id,
    message,
  };
} // SOCKET IO SEND MESSAGE

export const DELETE_MESSAGE = 'DELETE-MESSAGE';
export function deleteMessage(conversation_id, message_id) {
  return {
    type: DELETE_MESSAGE,
    conversation_id,
    message_id,
  };
}

export const UPDATE_MESSAGE = 'UPDATE-MESSAGE';
export function updateMessage(conversation_id, message) {
  return {
    type: UPDATE_MESSAGE,
    conversation_id,
    message,
  };
}
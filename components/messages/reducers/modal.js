import {
  OPEN_CREATE_CONVERSATION_MODAL, CLOSE_CREATE_CONVERSATION_MODAL,
  START_CREATE_CONVERSATION, FINISH_CREATE_CONVERSATION,
} from '../actions';

const initialState = {
  open: false,
  submitting: false,
}

export default function modal(state = initialState, action) {
  switch(action.type) {
  case OPEN_CREATE_CONVERSATION_MODAL:
    return Object.assign({}, state, {
      open: true,
    });
  case CLOSE_CREATE_CONVERSATION_MODAL:
    return Object.assign({}, state, {
      open: false,
    });
  case START_CREATE_CONVERSATION:
    return Object.assign({}, state, {
      submitting: true,
    });
  case FINISH_CREATE_CONVERSATION:
    return Object.assign({}, state, {
      submitting: false,
      open: false,
    });
  default:
    return state;
  }
}
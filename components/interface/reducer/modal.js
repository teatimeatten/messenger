import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
  open: false,
  content: null,
};

export default function(state=initialState, action) {
  switch(action.type) {
  case OPEN_MODAL:
    return Object.assign({}, state, {
      open: true,
      content: action.content,
    });
  case CLOSE_MODAL:
    return Object.assign({}, state, {
      open: false,
      content: null,
    });
  default:
    return state;
  }
}


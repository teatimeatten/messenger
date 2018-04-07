import { LOAD_ONLINE, REMOVE_ONLINE, ADD_ONLINE } from '../actions/online';

const initialState = [];

export default function(state=initialState, action) {
  switch (action.type) {
    case LOAD_ONLINE:
      return [...new Set(action.online)];
    case REMOVE_ONLINE:
      return [...state].filter((id)=> id != action.user_id);
    case ADD_ONLINE:
      return [...new Set([...state, action.user_id])];
    default:
      return state;
  }
}
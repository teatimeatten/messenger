import { LOAD_USERS } from '../actions';

const initialState = {
};

export default function users(state=initialState, action) {
  switch(action.type) {
  case LOAD_USERS:
    return action.users;
  default:
    return state
  }
}
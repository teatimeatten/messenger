import { START_REQUEST_SELF, LOAD_SELF } from '../actions';

const initialState = {

};

export default function self(state=initialState, action) {
  switch(action.type) {
  case LOAD_SELF:
    return action.self;
  default:
    return state;
  }
}
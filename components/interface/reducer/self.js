import { LOAD_SELF } from '../actions/self';

const initialState = null;

export default function(state=initialState, action) {
  switch (action.type) {
    case LOAD_SELF:
      return action.self;
    default:
      return state;
  }
}
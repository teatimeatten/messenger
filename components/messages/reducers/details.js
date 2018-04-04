import { CONVERSATION_DETAILS } from '../actions';

const initialState = {};

export default function(state=initialState, action) {
    switch(action.type){
    case CONVERSATION_DETAILS:
        return Object.assign({}, state, {
            [action.conversation_id]: action.details,
        });
    default:
        return state;
    }
}
import { LOAD_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/users';

const initialState = {};

export default function(state=initialState, action) {
  switch(action.type) {
  case LOAD_USERS:
    return Object.assign({}, state, action.users.reduce((users, user) => {
      users[user.id] = user;
      return users;
    }, {})); // BULK INSERT
  case ADD_USER:
  case UPDATE_USER:
    return Object.assign({}, state, {
      [action.user.id]: action.user,
    }); // ADD and UPDATE just overwrite anyways
  case DELETE_USER:
    return Object.values(state).reduce((users, user)=> {
      if (user.id != action.user_id) {
        users[user.id] = user;
      } // Filter out all users that dont match the actions id
      return users;
    }, {});
  default:
    return state;
  }
}
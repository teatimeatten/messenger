export const LOAD_USERS = 'LOAD-USERS';
export function loadUsers(users) {
  return {
    type: LOAD_USERS,
    users,
  };
}

export const ADD_USER = 'ADD-USER';
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export const UPDATE_USER = 'UPDATE-USER';
export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export const DELETE_USER = 'DELETE_USER';
export function deleteUser(user_id) {
  return {
     type: DELETE_USER,
     user_id,
  };
}
export const LOAD_ONLINE = 'LOAD-ONLINE';
export function loadOnline(online) {
  return {
    type: LOAD_ONLINE,
    online,
  };
}

export const REMOVE_ONLINE = 'REMOVE-ONLINE';
export function removeOnline(user_id) {
  return {
    type: REMOVE_ONLINE,
    user_id,
  };
}

export const ADD_ONLINE = 'ADD_ONLINE';
export function addOnline(user_id) {
  return {
    type: ADD_ONLINE,
    user_id,
  };
}
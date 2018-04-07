export const OPEN_MODAL = 'OPEN-MODAL';
export const CREATE_CONVERSATION_MODAL = 'CREATE-CONVERSATION';
export function openCreateModal() {
  return {
    type: OPEN_MODAL,
    content: CREATE_CONVERSATION_MODAL,
  };
}


export const CLOSE_MODAL = 'CLOSE-MODAL';
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
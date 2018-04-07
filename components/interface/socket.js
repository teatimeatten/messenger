import io from 'socket.io-client';

import { newMessage, SEND_MESSAGE, loadMessages } from './actions/messages';
import { addConversation, DELETE_CONVERSATION, SELECT_CONVERSATION, loadConversations, deleteConversation, updateConversation, CHANGE_CONVERSATION_NAME } from './actions/conversations';
import { addUser, deleteUser, loadUsers } from './actions/users';
import { loadSelf } from './actions/self';
import { addOnline, loadOnline, removeOnline } from './actions/online';

export default class Socket {
  constructor() {
    this.socket = io('/messages');

    this.socket.on('new_message', (conversation_id, message) => {
      this.store.dispatch(newMessage(conversation_id, message));
    });

    this.socket.on('new_conversation', (conversation) => {
      this.store.dispatch(addConversation(conversation));
    });

    this.socket.on('delete_conversation', (conversation_id) => {
      this.store.dispatch(deleteConversation(conversation_id));
    });

    this.socket.on('update_conversation', (conversation) => {
      this.store.dispatch(updateConversation(conversation));
    })

    this.socket.on('user_connected', (user) => {
      this.store.dispatch(addUser(user));
      this.store.dispatch(addOnline(user.id));
    });

    this.socket.on('user_disconnected', (user_id)=>{
      this.store.dispatch(deleteUser(user_id));
      this.store.dispatch(removeOnline(user_id));
    });

    this.socket.on('online_users', (online) => {
      this.store.dispatch(loadOnline(online));
    })

    this.socket.on('self', (self) => {
      this.store.dispatch(loadSelf(self));
    });

    this.socket.on('conversations', (conversations) => {
      this.store.dispatch(loadConversations(conversations));
    });

    this.socket.on('messages', (conversation_id, messages) => {
      this.store.dispatch(loadMessages(conversation_id, messages));
    });

    this.socket.on('users', (users) => {
      this.store.dispatch(loadUsers(users));
    });

    this.addStore = this.addStore.bind(this);
    this.middleware = this.middleware.bind(this);
  }

  addStore(store) {
    this.store = store;
  }

  middleware({dispatch}) {
    return next => action => {
      switch(action.type) {
      case SEND_MESSAGE:
        let { conversation_id, message } = action;
        this.socket.emit('new_message', conversation_id, message);
        break;
      case DELETE_CONVERSATION:
        this.socket.emit('delete_conversation', action.conversation_id);
        break;
      case SELECT_CONVERSATION:
        this.socket.emit('join_conversation', action.conversation_id);
        break;
      case CHANGE_CONVERSATION_NAME:
        this.socket.emit('rename_conversation', action.conversation_id, action.name);
        break;
      }
      return next(action);
    }
  }
}

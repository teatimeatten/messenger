import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Socket from './socket';
import Reducer from './reducer';
import Root from './components';

let loggerMiddleware = createLogger();
let socket = new Socket();

let store = createStore(
  Reducer,
  applyMiddleware(
    thunkMiddleware,
    socket.middleware,
    loggerMiddleware,
  ),
);

socket.addStore(store);

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('react-container'),
);

import { sendMessage } from './actions/messages';
import React from 'react';

import ConversationsTab from './conversationstab';
import MessagePane from './messagepane';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <ConversationsTab />
        <MessagePane />
      </div>
    );
  }
}
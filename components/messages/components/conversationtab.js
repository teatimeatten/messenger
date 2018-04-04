import React from 'react';

import Sidebar from 'react-sidebar';

export default class ConversationSidebar extends React.Component {
  render() {
    let { sidebar, docked, children } = this.props;
    return (
      <Sidebar {...this.props}>
        {children}
      </Sidebar>
    );
  }
}
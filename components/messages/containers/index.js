import React from 'react';
import { connect } from 'react-redux';

import ConversationTab from './conversationtab';

import {
  requestUsers, requestConversations, requestSelf, connectSocket
} from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (
      <div>
        <ConversationTab />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(requestUsers());
      dispatch(requestConversations());
      dispatch(requestSelf());
      dispatch(connectSocket());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
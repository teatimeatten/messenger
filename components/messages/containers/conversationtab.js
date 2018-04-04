import React from 'react';
import { connect } from 'react-redux';

import ConversationSidebar from '../components/conversationtab';

import ConversationRow from './conversationrow';
import ModalRoot from './modalroot';
import Conversation from './conversation';

import { openCreateConversationModal } from '../actions';

class ConversationTab extends React.Component {
  render() {
    let { conversations } = this.props;
    let { openModal } = this.props;

    let sidebarContent = (
      <div className="list-group list-group-flush">
        <button className="list-group-item" onClick={openModal}>
          Create Conversation <i className="fa fa-plus" />
        </button>
        {Object.values(conversations).map(conversation =>
          <ConversationRow key={conversation.id}
            {...conversation} />
        )}
      </div>
    );

    return (
      <div>
        <ConversationSidebar
          docked={true}
          sidebar={sidebarContent}
          styles={{
            root: {
              top: 50,
            },
          }}>
          <Conversation />
        </ConversationSidebar>
        <ModalRoot />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversations: state.conversations,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(openCreateConversationModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationTab);
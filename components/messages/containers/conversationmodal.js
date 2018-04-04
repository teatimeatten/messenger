import React from 'react';
import { connect } from 'react-redux';

import { createConversation } from '../actions';

import ConversationModal from '../components/conversationmodal';

class ConversationModalContainer extends React.Component {
  render() {
    const { requestClose, createConversation } = this.props;
    const { users, submitting } = this.props;

    return (
      <div>
        <ConversationModal
          requestClose={requestClose}
          createConversation={createConversation}
          users={users}
          submitting={submitting}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  submitting: state.modal.submitting,
});

const mapDispatchToProps = dispatch => ({
  createConversation: (name, user_ids) => dispatch(createConversation(name, user_ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationModalContainer);
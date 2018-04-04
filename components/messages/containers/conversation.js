import React from 'react';
import { connect} from 'react-redux';

import Conversation from '../components/conversation';

import { sendMessage } from '../actions';

class ConversationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { messages } = this.props;

    if (messages == null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <h3>Select or create a conversation on the side</h3>
            </div>
          </div>
        </div>
      );
    }

    const { createMessage } = this.props;
    const { conversation } = this.props;

    return (
      <div className="container">
        <Conversation messages={messages}
          conversation={conversation}
          submitMessage={createMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversation: state.selected_id ? state.conversations[state.selected_id] || null : null,
    messages: state.selected_id ? state.messages[state.selected_id] || null : null,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createMessage: (conversation_id, message) => dispatch(sendMessage(conversation_id, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationContainer);
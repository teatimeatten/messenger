import React from 'react';
import { connect } from 'react-redux';

import { changeConversationName } from '../../actions/conversations';
import { sendMessage } from '../../actions/messages';

import './style.scss';

class MessagePane extends React.Component {
  render() {
    let { selected_id } = this.props;
    if (selected_id === null) {
      return (
        <div id="message-pane">
          <h4>Select or create a conversation</h4>
        </div>
      );
    }

    return (
      <div id="message-pane">
        <MessagesTopBar {...this.props} />
        <Messages {...this.props} />
        <CreateMessage {...this.props} />
      </div>
    );
  }
}

class MessagesTopBar extends React.Component {
  constructor(props) {
    super(props);

    let { conversation } = this.props;

    this.state = {
      id: conversation.id,
      display_name: conversation.display_name,
    };
  }

  componentWillReceiveProps() {
    const { id } = this.state;
    let { conversation } = this.props;
    if (conversation.id != id) {
      this.setState({
        id: conversation.id,
        display_name: conversation.display_name,
      });
    }
  }

  render() {
    const { display_name } = this.state;
    let { conversation } = this.props;
    const { changeConversationName } = this.props;

    let changeName = (e) => {
      e.preventDefault();
      changeConversationName(conversation.id, this.state.display_name);
    };

    return (
      <div id="message-top-bar">
        <form onSubmit={changeName}>
          <input type="text" className="form-control" value={display_name} onChange={(e)=>this.setState({display_name: e.target.value})}/>
        </form>
      </div>
    );
  }
}

class Messages extends React.Component {
  render() {
    const { messages, self } = this.props;

    if (messages == undefined) {
      return (
        <div id="messages">
          <i className="fa fa-spinner fa-spin" />
        </div>
      );
    }

    return (
      <div id="messages">
        {Object.values(messages).map(message =>(
          <div key={message.id}>
            {message.user.display_name}: {message.text}
          </div>
        ))}
      </div>
    );
  }
}

class CreateMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }
  render() {
    const { message } = this.state;
    const { conversation } = this.props;
    let { sendMessage } = this.props;

    let finishMessage = (e) => {
      e.preventDefault();
      sendMessage(conversation.id, message);
      this.setState({message: ''});
    };

    return (
      <div id="create-message">
        <form onSubmit={finishMessage}>
          <input type="text" className="form-control" value={message} onChange={e=>this.setState({message: e.target.value})} placeholder="Type here" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({conversations, messages, selected_id, self}) => {
  return {
    conversation: conversations[selected_id],
    messages: messages[selected_id],
    selected_id,
    self,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeConversationName: (conversation_id, name) => dispatch(changeConversationName(conversation_id, name)),
    sendMessage: (conversation_id, message) => dispatch(sendMessage(conversation_id, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePane);
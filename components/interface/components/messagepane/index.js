import React from 'react';
import { connect } from 'react-redux';

import { changeConversationName } from '../../actions/conversations';

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
      </div>
    );
  }
}

class MessagesTopBar extends React.Component {
  constructor(props) {
    super(props);

    let { conversation } = this.props;

    this.state = {
      display_name: conversation.display_name,
    };
  }

  render() {
    const { display_name } = this.state;
    const { changeConversationName } = this.props;

    let changeName = (e) => {
      e.preventDefault();
      changeConversationName(this.state.display_name);
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


    return (
      <div id="messages">

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

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeConversationName: (name) => dispatch(changeConversationName(props.conversation.id, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePane);
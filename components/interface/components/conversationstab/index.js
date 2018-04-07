import React from 'react';
import { connect } from 'react-redux';

import { selectConversation } from '../../actions/conversations';

class ConversationsTab extends React.Component {
  render() {

    const { conversations } = this.props;
    const { selectConversation } = this.props;

    return (
      <div id="conversations-tab">
        {Object.values(conversations).map(conversation=>(
          <div key={conversation.id}>
            <Conversation {...conversation} onClick={(e)=>selectConversation(conversation.id)}/>
          </div>
        ))}
      </div>
    );
  }
}

class Conversation extends React.Component {
  render() {
    let { display_name, id } = this.props;
    const { onClick } = this.props;

    return (
      <div className="conversation" onClick={onClick}>
        {display_name}
      </div>
    );
  }
}

const mapStateToProps = ({conversations, self}) => {
  return {
    conversations,
    self,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectConversation: (conversation_id) => dispatch(selectConversation(conversation_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsTab);
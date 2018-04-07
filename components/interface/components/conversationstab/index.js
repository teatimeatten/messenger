import React from 'react';
import { connect } from 'react-redux';

import { selectConversation } from '../../actions/conversations';
import { openCreateModal } from '../../actions/modal';

import './styles.scss';

class ConversationsTab extends React.Component {
  render() {

    const { conversations, selected_id } = this.props;
    const { openCreateModal, selectConversation } = this.props;

    return (
      <div id="conversations-tab">
        <button className="btn btn-primary" onClick={openCreateModal}>
          Create Conversation <i className="fa fa-plus" />
        </button>
        <div id="conversations" className="list-group">
          {Object.values(conversations).map(conversation=>(
            <button key={conversation.id} className={"list-group-item " + (selected_id == conversation.id ? "active" : "")} onClick={(e)=>selectConversation(conversation.id)}>
              <Conversation {...conversation} selected_id={selected_id} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}

class Conversation extends React.Component {
  render() {
    let { display_name, id , selected_id } = this.props;
    const { onClick } = this.props;

    return (
      <div className="conversation">
        {selected_id == id
          ? <span><b>{display_name}</b></span>
          : <span>{display_name}</span>
        }
      </div>
    );
  }
}

const mapStateToProps = ({conversations, self, selected_id}) => {
  return {
    conversations,
    self,
    selected_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectConversation: (conversation_id) => dispatch(selectConversation(conversation_id)),
    openCreateModal: () => dispatch(openCreateModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsTab);
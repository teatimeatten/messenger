import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class GroupConversation extends React.Component {
  render() {

    const { conversation, messages, self } = this.props;

    return(
      <div id="group-conversation-window">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-9">
            </div>
            <div className="col-md-2 col-lg-3">
              <SettingsPane {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SettingsPane extends React.Component {
  render() {
    const { conversation, messages, self } = this.props;

    let updateSettings = e => {
      e.preventDefault();
    };

    const { users } = this.conversation;

    return (
      <div id="settings-pane">
        <form onSubmit={updateSettings}>
          <div className="title">
            <h3>Settings</h3>
          </div>
          <div className="section">
          </div>
          <div className="section">
            <div className="section-title">
              <h4>Members</h4>
            </div>
            <div className="section-body">
              {users.map(user => (
                <div key={user.id}>
                  
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ conversations, messages, self }, { conversation_id }) => {
  return {
    conversation: conversations[conversation_id],
    messages: messages[conversation_id],
    self,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupConversation);
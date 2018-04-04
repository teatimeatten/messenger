import React from 'react';

import Searchbar from './searchbar';

export default class ConversationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      added_users: [],
    };
  }
  render() {
    let { users, submitting } = this.props;
    let { requestClose, createConversation } = this.props;
    let { name, added_users } = this.state;

    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create Conversation</h5>
          <button type="button" className="close" aria-label="Close" onClick={requestClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name" className="form-control-label">Conversation Name</label>
              <input type="text" className="form-control"
                onChange={(e)=>this.setState({name: e.target.value})}
                value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="added_users" className="form-control-label">Added Users</label>
              <div className="list-group">
                {added_users.map(user_id =>
                  <button key={user_id}
                    className="list-group-item"
                    onClick={() => {
                      this.setState({
                        added_users: added_users.filter(id => id != user_id),
                      });
                    }}>
                    {users[user_id].display_name}
                  </button>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit"
                disabled={submitting}
                onClick={()=>createConversation(name, added_users)}
                className="btn btn-primary">
                {submitting
                  ? <i className="fa fa-spinner fa-spin" />
                  : <span>Create Conversation</span>
                }
              </button>
              <button type="button" className="btn btn-secondary" onClick={requestClose}>Close</button>
            </div>
            <Searchbar
              list={users}
              filter={qs => user => {
                if (qs !== '' && !user.display_name.toLowerCase().includes(qs.toLowerCase())) {
                  return false;
                }
                if (added_users.includes(user.id)) {
                  return false;
                }
                return true;
              }}
              addItem={(id) => this.setState({added_users: [...added_users, id]})}
              />
          </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={requestClose}>Close</button>
        </div>
      </div>
    );
  }
}
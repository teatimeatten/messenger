import React from 'react';
import { connect } from 'react-redux';

import { createConversation } from '../../actions/conversations';
import { closeModal } from '../../actions/modal';

class CreateConversationModal extends React.Component {
  render() {
    return (
      <CreateConversationModalContent {...this.props} />
    )
  }
}

import { WithContext as ReactTags } from 'react-tag-input';
import './createconversation.scss';

class CreateConversationModalContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      added_ids: [],
      querystring: '',
    };
  }

  render() {
    const { users } = this.props;
    const { name, added_ids } = this.state;
    let { createConversation, requestClose, submitting } = this.props;

    let submitConversationForm = (e) => {
      e.preventDefault();
      createConversation(name, added_ids);
    }

    let tags = added_ids.map(id => ({id: id.toString(), text: users[id].display_name, user_id: id}));
    let suggestions = Object.values(users).filter(({id}) => !added_ids.includes(id)).map(({id, display_name}) => ({id: id.toString(), text: display_name, user_id: id}));
    let deleteTag = (i) => this.setState({ added_ids: added_ids.filter((_, index) => index != i)});
    let addTag = ({user_id}) => this.setState({ added_ids: [...added_ids, user_id] });

    return (
      <form onSubmit={submitConversationForm}>
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
              <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={deleteTag}
                handleAddition={addTag}
                placeholder="Add a user..." />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" disabled={submitting} className="btn btn-primary">
                {submitting
                  ? <i className="fa fa-spinner fa-spin" />
                  : <span>Create</span>
                }
            </button>
            <button type="button" className="btn btn-secondary" onClick={requestClose}>Close</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ users, submitting }) => {
  return {
    users,
    submitting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createConversation: (name, added_ids)=>dispatch(createConversation({name, user_ids: added_ids})),
    requestClose: ()=>dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateConversationModal);
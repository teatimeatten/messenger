import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import ConversationModal from './conversationmodal';

import { closeCreateConversationModal } from '../actions';

Modal.setAppElement(document.getElementById('react-container'));
class ModalRoot extends React.Component {
  render() {
    const { open } = this.props;
    const { requestClose } = this.props;
    return (
      <div style={{
        height: '90vh',
      }}>
        <Modal isOpen={open}
          className="Modal_Bootstrap modal-dialog fade show"
          >
          <ConversationModal requestClose={requestClose} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.modal);
};

const mapDispatchToProps = dispatch => {
  return {
    requestClose: () => dispatch(closeCreateConversationModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
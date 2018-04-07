import React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import { CREATE_CONVERSATION_MODAL, closeModal } from '../../actions/modal';

import CreateConversationModal from './createconversationmodal';

Modal.setAppElement(document.getElementById('react-container'));
class ModalRoot extends React.Component {

  render() {
    let { open, content } = this.props.modal;
    let { closeModal } = this.props;
    if (!open) {
      return null;
    }

    let modal_content = null;
    if (content == CREATE_CONVERSATION_MODAL) {
      modal_content = (
        <CreateConversationModal />
      );
    };

    return (
      <Modal isOpen={open} className="Modal_Bootstrap modal-dialog fade show" onRequestClose={closeModal}>
        {modal_content}
      </Modal>
    )
  }
}

const mapStateToProps = ({modal}) => {
  return {
    modal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: ()=>dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);

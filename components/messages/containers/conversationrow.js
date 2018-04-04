import React from 'react';
import { connect } from 'react-redux';

import { requestConversationMessages, selectConversation, requestConversationDetails } from '../actions';

class ConversationRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick } = this.props;
    const { display_name } = this.props;

    return (
      <button className="list-group-item list-group-item-action"
        onClick={onClick}>
        <span style={{
            'padding': 5,
        }}>
          {display_name}
        </span>
      </button>
      // <span className="badge badge-primary badge-pill">14</span>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selected: props.id == state.selected_id,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: () => {
      dispatch(requestConversationMessages(props.id));
      dispatch(selectConversation(props.id));
      dispatach(requestConversationDetails(props.id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationRow);
import React from 'react';

import './style.scss'

import ConversationsTab from '../conversationstab';
import ActiveUsers from '../activeusers';

const GROUP_CONVERSATIONS = 'GROUP-CONVERSATIONS';
const PRIVATE_MESSAGES = 'PRIVATE-MESSAGES';

const TABS = [GROUP_CONVERSATIONS, PRIVATE_MESSAGES];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_tab: GROUP_CONVERSATIONS,
    };
  }

  render() {
    const { selected_tab } = this.state;

    let sidebar_content = null;
    switch(selected_tab) {
    case GROUP_CONVERSATIONS:
      sidebar_content = <ConversationsTab />;
      break;
    case PRIVATE_MESSAGES:
      sidebar_content = <ActiveUsers />;
      break;
    default:
      sidebar_content = <ConversationsTab />;
    }

    return (
      <div id="sidebar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            {/*
              <div className="btn-group">
                <button className={"btn btn-secondary " + (selected_tab == GROUP_CONVERSATIONS ? "active" : "")} onClick={()=>this.setState({selected_tab: GROUP_CONVERSATIONS})}>
                  Group
                </button>
                <button className={"btn btn-secondary " + (selected_tab == PRIVATE_MESSAGES ? "active" : "")} onClick={()=>this.setState({selected_tab: PRIVATE_MESSAGES})}>
                  Private Messages
                </button>
              </div>
            */}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              {sidebar_content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
import React from 'react';

import MessagePane from './messagepane';
import Modal from './modal';
import Sidebar from './sidebar';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Modal />
        <div className="container" style={{padding: '0px', margin: '0px'}}>
          <div className="row">
            <div className="col-md-2 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-md-8 col-lg-9">
              <MessagePane />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
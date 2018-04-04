import React from 'react';
import { connect } from 'react-redux';

class Message extends React.Component {

  render() {
    return (
      <div className="message">
        Hlelo
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
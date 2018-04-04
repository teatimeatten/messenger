import React from 'react';


export default class Message extends React.Component {
  render() {
    const { display_name } = this.props;
    const { name } = this.props.user;
    return (
      <div>
        <div>{name}</div>
        <div>{display_name}</div>
      </div>
    );
  }
}


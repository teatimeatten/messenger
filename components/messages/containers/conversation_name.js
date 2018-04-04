import React, { Component } from 'react';
import { connect } from 'react-redux';

//import 'conversation_name.scss';

class ConversationName extends Component {
  render() {
    return (
      <span>

      </span>
    );
  }
}

class EditNameField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }
  render() {
    const { name } = this.state;
    const { changeName } = this.props;
    return (
      <form onSubmit={(e)=>{
        e.preventDefault();
        changeName(name);
      }}>
        <input type="text" value={name} onChange={(e)=>this.setState({name: e.target.value})} />
      </form>
    );
  }
}
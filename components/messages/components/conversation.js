import React from "react";
import io from "socket.io-client";

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.messages_window.scrollTop = this.messages_window.scrollHeight;
  }
  componentDidUpdate() {
    this.messages_window.scrollTop = this.messages_window.scrollHeight;
  }
  render() {
    const { messages, self, conversation } = this.props;
    const { submitMessage } = this.props;

    return (
      <div className="container">
        <h2>{conversation.display_name}</h2>
        <hr/>
        <div
          style={{
            height: "80vh",
            overflow: "scroll"
          }}
          ref={ref => (this.messages_window = ref)}
        >
          {messages.map(message => (
            <div key={message.id}>
              {message.user.display_name}: {message.text}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <MessageInput
              onSubmit={message => submitMessage(conversation.id, message)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_message: ""
    };
  }
  render() {
    const { new_message } = this.state;
    const { onSubmit } = this.props;

    return (
      <div className="form-group">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!new_message) return;
            onSubmit(new_message);
            this.setState({
              new_message: ""
            });
          }}
        >
          <input
            type="text"
            className="form-control"
            value={new_message}
            placeholder="New Message"
            style={{
              display: "inline-block",
              width: "80%"
            }}
            onChange={e => this.setState({ new_message: e.target.value })}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              display: "inline-block",
              paddingLeft: "3px",
              paddingRight: "3px",
              width: "10%"
            }}
          >
            <i className="fa fa-arrow-right" />
          </button>
        </form>
      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <span>User: {this.props.message.UserId}</span><br />
        <span>Message: {this.props.message.message_text}</span><br />
        <span>Event: {this.props.message.EventId}</span><br />
        <br /><br />
      </div>
    )
  }
}

export default ChatMessage;


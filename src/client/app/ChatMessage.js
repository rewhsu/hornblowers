import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.message.userId,
      username: this.props.username,
      userVis: true,
      userData: {}
    }
    this.toggleMessage = this.toggleMessage.bind(this);
  }

  toggleMessage() {
    console.log('message toggled');
    this.setState({msgVis: !this.state.msgVis});
  }

  render() {
    var showUser;
    if (!this.state.userVis) {
      showUser = {display: "none"};
    }
    return (
      <div className="chat-group-outer" onClick={this.toggleMessage} >
        <div className="chat-group">
          <span className="chat-user-self" style={showUser}>{this.props.message.User.user_name}<br /></span>
          <span className="chat-message-other">{this.props.message.message_text}<br /></span>
        </div>
      </div>
    )
  }
}

export default ChatMessage;


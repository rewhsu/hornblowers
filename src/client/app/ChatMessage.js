import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.message.UserId,
      username: null,
      userVis: false,
      className: null
    }
    this.toggleUsername = this.toggleUsername.bind(this);
  }

  toggleUsername() {
    console.log('username toggled');
    this.setState({userVis: !this.state.userVis});
  }

  getUsername() {
    var context = this;
    axios
      .get('/api/db/eventMembers', {
        params: {
          userId: context.state.userId
        }
      }).then(function(response) {
        context.setState({username: response.data});
      });
  }

  render() {
    var showUser;
    var chatGroupClass;
    if (!this.state.userVis) {
      showUser = {display: "none"};
    //   chatGroupClass = "chat-group-single";
    // } else {
    //   chatGroupClass = "chat-group-double";
    // }
    }
    return (
      <div className="chat-group-outer" onClick={this.toggleUsername} >
        <div className="chat-group">
          <span className="chat-user-self" style={showUser}>User{this.props.message.UserId}<br /></span>
          <span className="chat-message-other">{this.props.message.message_text}<br /></span>
        </div>
      </div>
    )
  }
}

export default ChatMessage;


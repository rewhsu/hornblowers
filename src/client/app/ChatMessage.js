import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.message.userId,
      username: null,
      userVis: true,
      userData: {}
    }
    this.toggleUsername = this.toggleUsername.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  toggleUsername() {
    console.log('username toggled');
    this.setState({userVis: !this.state.userVis});
  }

  getUsername(e) {
    console.log('msg',this.props.message)
    var context = this;
    axios
      .get('/api/db/users', {
        params: {
          userId: this.props.message.userId
        }
      }).then(function(response) {
        context.setState({
          userData: response.data,
          username: response.data.user_name
        })
      });
  }

  componentDidMount() {
    this.getUsername();
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
          <span className="chat-user-self" style={showUser}>{this.state.username}<br /></span>
          <span className="chat-message-other">{this.props.message.message_text}<br /></span>
        </div>
      </div>
    )
  }
}

export default ChatMessage;


import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import ChatMessage from './ChatMessage';

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatMessage: "Enter Message",
      messages: null,
      chatVisible: false,
      userId: null,
      username: null,
      userData: null,
      eventId: 3
    }
    this.onBlur = this.onBlur.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  getUser() {
    var context = this;
    axios
      .post('/api/db/check')
      .then(function(response) {
        context.setState({
          userId: response.data,
        });
      });
  }

  getMessages(event) {
    var context = this;
    axios
      .get('/api/db/messages')
      .then(function(response) {
        context.setState({messages: response.data.reverse()});
      })
      .then(function() {
        if (!context.state.chatVisible) {
          context.setState({chatVisible: true});
        }
      });
  }

  sendMessage() {
    var context = this;
    axios
      .post('/api/db/messages', {
        text: this.state.chatMessage,
        eventid: this.state.eventId
      })
      .then(function(response) {
        context.getMessages();
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  handleChatMessageChange(event) {
    console.log('handleChatMessageChange');
    this.setState({chatMessage: event.target.value});
  }

  onBlur() {
    console.log("blur");
    if (this.state.chatMessage !== "") {
      this.setState({chatMessage: ""});
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getMessages();
    this.getUser();
  }

  render() {
    var chatBorderVis;
    if (!this.state.chatVisible) {
      chatBorderVis = {display: "none"};
    }
    return (
      <div>
        <div className="bordered" style={chatBorderVis}>
          <div className="pre-scrollable-fixed">
            {this.state.messages ?
              this.state.messages.map(message =>
                <ChatMessage message={message} username={message.UserId} />
              )
              :null}
          </div>
        </div>
        <div>
          <input 
            type="text" 
            value={this.state.chatMessage} 
            onChange={this.handleChatMessageChange} 
            onClick={this.onBlur}
          />
          <button id="sendMessage" className="submit" onClick={this.sendMessage}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Chat;
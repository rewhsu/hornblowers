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
      chatVisible: false
    }
    this.onBlur = this.onBlur.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
  }

  getMessages(event) {
    var context = this;
    axios
      .get('/api/room/mock/messages')
      .then(function(response) {
        console.log(response.data);
        context.setState({messages: response.data});
      })
      .then(function() {
        if (!context.state.chatVisible) {
          context.setState({chatVisible: true});
        }
      });

  }

  handleChatMessageChange(event) {
    console.log('handleChatMessageChange');
    this.setState({chatMessage: event.target.value});
  }

  onBlur() {
    console.log("blur");
    if (this.state.chatMessage === "Enter Message") {
      this.setState({chatMessage: ""});
    }
  }

  render() {
    var chatBorderVis;
    if (!this.state.chatVisible) {
      chatBorderVis = {display: "none"};
    }
    return (
      <div className="container">
        <button onClick={this.getMessages}>Get Messages</button>  
        <div className="bordered" style={chatBorderVis}>
          <div className="pre-scrollable">
            {this.state.messages ?
              this.state.messages.map(message =>
                <ChatMessage message={message} />
              )
              :null}
          </div>
        </div>
        <form>
          <input 
            type="text" 
            value={this.state.chatMessage} 
            onChange={this.handleChatMessageChange} 
            onClick={this.onBlur}
          />
          <input id="sendMessage" className="submit" type="button" value="Send" />
        </form>
      </div>
    )
  }
}

export default Chat;


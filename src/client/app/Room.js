import React from 'react';
import ReactDOM from 'react-dom';
import Yelp from './Yelp';
import RoomUser from './RoomUser';
import Chat from './Chat';
import axios from 'axios';

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatVisible: false,
      usersVisible: false,
      yelpVisible: false,
      roomUsers: null
    }
    this.getUsers = this.getUsers.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleYelp = this.toggleYelp.bind(this);
    this.toggleUsers = this.toggleUsers.bind(this);
  }

  toggleChat(event) {
    this.setState({chatVisible: !this.state.chatVisible})
  }

  toggleYelp(event) {
    this.setState({yelpVisible: !this.state.yelpVisible})
  }

  toggleUsers(event) {
    this.setState({usersVisible: !this.state.usersVisible})
  }

  getUsers(event) {
    var context = this;
    axios
      .get('/api/room/mockUsers')
      .then(function(response) {
        console.log(response.data);
        context.setState({roomUsers: response.data});
      })
  }

  render() {
    var chatVisible;
    var yelpVisible;
    var usersVisible;
    if (!this.state.chatVisible) {
      chatVisible = {display: "none"};
    }
    if (!this.state.yelpVisible) {
      yelpVisible = {display: "none"};
    }
    if (!this.state.usersVisible) {
      usersVisible = {display: "none"};
    }
    return (
      <div className="room">
        <h2 onClick={this.toggleChat}>Chat</h2>
        <div style={chatVisible}>
          <Chat />
        </div>
        <h2 onClick={this.toggleYelp}>Yelp</h2>
        <div style={yelpVisible}>
          <Yelp />
        </div>
        <h2 onClick={this.toggleUsers}>List</h2>
        <div style={usersVisible} >
          <button onClick={this.getUsers}>Reload Room Members</button>
          {this.state.roomUsers ?
            this.state.roomUsers.map(roomUser =>
            <RoomUser user={roomUser} />
          ): null}
        </div>
      </div>
    )
  }
}

export default Room;


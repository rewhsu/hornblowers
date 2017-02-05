import React from 'react';
import ReactDOM from 'react-dom';
import RoomUser from './RoomUser';

import axios from 'axios';

class RoomUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomUsers: null,
      usersVisible: false
    }
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(event) {
    var context = this;
    axios
      .get('/api/room/mock/users')
      .then(function(response) {
        console.log(response.data);
        context.setState({roomUsers: response.data});
      })
      .then(function() {
        context.setState({usersVisible: true})
      })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    var usersVisible;
    if (!this.state.usersVisible) {
      usersVisible = {display: "none"};
    }
    return (
      <div>
        <div className="bordered" style={usersVisible}>
          <div className="pre-scrollable-fixed">
            <button onClick={this.getUsers}>Load Room Members</button>
            {this.state.roomUsers ?
              this.state.roomUsers.map(roomUser =>
              <RoomUser user={roomUser} />
            ): null}
          </div>
        </div>
      </div>
    )
  }
}

export default RoomUsers;


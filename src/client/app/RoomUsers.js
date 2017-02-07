import React from 'react';
import ReactDOM from 'react-dom';
import RoomUser from './RoomUser';

import axios from 'axios';

class RoomUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomUsers: ["Andrew Hsu", "Kevin Wong", "Jen Sha"],
      usersVisible: true
    }
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(event) {
    var context = this;
    axios
      .get('/api/db/eventMembers')
      .then(function(response) {
        console.log('AWEGIHWEGIEW', response);
        context.setState({roomUsers: response.data});
      })
      .then(function() {
        console.log('AWHEFAIWHEFIEWAHFIAEHWIFAEWHF', context.state.roomUsers);
        context.setState({usersVisible: true})
      })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <div className="bordered">
          <div className="pre-scrollable-fixed">
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


import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class RoomUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  render() {
    return (
      <div className="roomUser">
        <h4>{this.props.user.user_name}</h4>
        <p>{this.props.user.user_email}</p>
        <p>{this.props.user.user_streetaddress}</p>
      </div>
    )
  }
}

export default RoomUser;


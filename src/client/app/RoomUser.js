import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class RoomUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      showDetails: false
    }
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    var detailsVisible;
    if (!this.state.showDetails) {
      detailsVisible = {display: "none"};
    }

    return (
      <div className="roomUser">
        <h6 onClick={this.toggleDetails}>{this.props.user.user_name}</h6>
        <div style={detailsVisible}>
          <span className="userDetails">{this.props.user.user_email}</span><br />
          <span className="userDetails">{this.props.user.user_streetaddress}</span>
        </div>
      </div>
    )
  }
}

export default RoomUser;


import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class RoomUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      userId: this.props.user.userId,
      userData: null,
      username: 'default'
    }
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  getUsername(e) {
    var context = this;
    axios
      .get('/api/db/users', {
        userId: this.state.userId
      })
      .then(function(response) {
        console.log('awehjfihaewifjaweif', response);
        context.setState({
          userData: response.data,
          username: response.data.user_name
        })
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getUsername();
  }

  render() {
    var detailsVisible;
    if (!this.state.showDetails) {
      detailsVisible = {display: "none"};
    }

    return (
      <div className="roomUser">
        <h6 onClick={this.toggleDetails}>Username: {this.props.user}</h6>
      </div>
    )
  }
}

export default RoomUser;


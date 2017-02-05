import React from 'react';
import HeaderBar from './headerbar'
import { browserHistory } from 'react-router';
import axios from 'axios';


class Logout extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    axios.post('/api/db/logout')
    // .then(function(user) {
    //   axios.post('/check', function(req, res) {
    //     console.log(res);
    //   })
    // });

    return (
      <div>
        <HeaderBar />
        <h1>You are now logged out.</h1>
      </div>
    )
  }

}

export default Logout;

import React from 'react';
import HeaderBar from './headerbar'
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';


class Logout extends React.Component {
  constructor(props) {
    super(props);

  }

componentDidMount(){
    document.body.style.backgroundImage = "url('http://cdn.wallpapersafari.com/18/17/JxM3Q8.jpeg')";
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.padding = 0;
    document.body.style.margin = 0;
  }


  render() {
    return (
        <div className='logout'>
          <div>
          <div id='logoutFontsize'>See You Soon!!</div>
          <Link id='logoutFontsizeTwo' className='btn btn-success' to="/login">Log In</Link>
        </div>
      </div>
    )
  }
}

export default Logout;



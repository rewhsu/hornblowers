import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class HeaderBar extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      activeTab: null,
      loggedIn: false
    }
    this.setActiveTab = this.setActiveTab.bind(this);
    this.classCheck = this.classCheck.bind(this);
	}

  setActiveTab(tabName) {
    var context = this;
    return function() {
      context.setState({activeTab: tabName});
    }
  }

  classCheck(tabName) {
    if(this.state.activeTab === tabName) {
      return "active";
    } else {
      return "";
    }
  }


  
	render() {
		return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#"> 
              <img className="logoimg" align="middle" src="/assets/Logo.png" width="40" height="40"></img>
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/room">Room</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>

            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/logout">Log Out</Link></li>
          </ul>
        </div>
      </nav>
		)
	}
};	

// Where important that the when the component renders the value of the 
// input is set to retrieve its value from this start state term 
// so its inital value is an empty string and we start of totally empty.


export default HeaderBar;






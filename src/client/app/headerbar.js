import React from 'react';

class HeaderBar extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      activeTab: null
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
            <a className="navbar-brand" href="#">@</a>
          </div>
          <ul className="nav navbar-nav">
            <li onClick={this.setActiveTab('home')} className={this.classCheck('home')}><a href="/">Home</a></li>
            <li onClick={this.setActiveTab('room')} className={this.classCheck('room')}><a href="/room">Room</a></li>
            <li onClick={this.setActiveTab('signup')} className={this.classCheck('signup')}><a href="/signup">Sign Up</a></li>
            <li onClick={this.setActiveTab('login')} className={this.classCheck('login')}><a href="/login">Log In</a></li>
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






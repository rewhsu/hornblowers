import React from 'react';
import ReactDOM from 'react-dom';
import HeaderBar from './headerbar';
import FriendList from './friend_list';
import UserDetail from './User_detail';
import Login from './login';
import Signup from './signup';
console.log('before')
import Yelp from './Yelp';
console.log('after')
import { Router, Route, Link, browserHistory } from 'react-router';


// These data will be ajax from (sql)db 
// we will have storage of friends

var friendData = [
					{
						"name": "Andrew Hsu",
						"img": "https://avatars0.githubusercontent.com/u/12904628?v=3&s=400",
						"etag": 1
					},

					{
						"name": "Kevin Wong",
						"img": "https://avatars3.githubusercontent.com/u/16652498?v=3&s=460",
						"etag": 2
					},

					{
						"name": "Jennifer Sha",
						"img": "https://avatars2.githubusercontent.com/u/15174445?v=3&s=400",
						"etag": 3
					},

					{
						"name": "Bianca Woo",
						"img": "https://avatars0.githubusercontent.com/u/18028868?v=3&s=400",
						"etag": 4
					}
				]



class App extends React.Component {
	constructor(props) {
	 super(props);

	 this.state = {
	 	// user friendsdata
	 	friend: friendData,
	 	// so friendlist will load when user log in 
	 	currentUserFriendList: null,
	 	currentUserLocation: null
	 	// FriendList - Friends={this.state.currentUserFriendList}
	 };

	 // We will need a Ajax Call here to fetch Users FriendList
	 // Once we fetch the data we will be able setState for CurrentUserFriendList  

} 	
	render() {
		return (
			<div>
				<HeaderBar />
				<UserDetail User={this.state.currentUserLocation}/>
				<FriendList friends={this.state.friend}/>
			</div> 
	);
  }
}

function loggedIn() {
	//temporary function, change to return false and it will redirect to login
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

ReactDOM.render((<Router history={browserHistory}>
    <Route path="/" component={App} onEnter={requireAuth}/>
    <Route path="signup" component={Signup}/>
    <Route path="login" component={Login}/>
    <Route path="yelp" component={Yelp} />
 </Router>), document.querySelector('.container'));


// Task I still need to do is making a button for this app (using react router)
// the other page ! 
// making http/ajax call to router (haven't research how to communicate with server yet)
// Style it




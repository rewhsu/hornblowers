import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import HeaderBar from './headerbar';
import axios from 'axios';
import FriendList from './friend_list';
import UserDetail from './User_detail';
import SearchFriendBar from './Search_Friend_Bar';


// These data will be ajax from (sql)db 
// we will have storage of friends


class App extends React.Component {
	constructor(props) {
	 super(props);

	 this.state = {
	 	// user friendsdata
	 	currentUserData: null,
	 	currentUserFriendList: [],
	 	currentUserLocation: null
	 }
	}
	 	// axios.get('/api/db/friends', {
	 	// 	params: {
	 	// 		userid: 1
	 	// 	}

	componentDidMount() {
	 	var self = this;
	 	axios.post('api/db/login').then(function(friends){
	 		console.log('the user', friends)
	 	// self.setState ({
	 	// 	currentUserFriendList: friends.data
	 	// });
		}).catch(function (error){
	 		console.log('nope')
	 		console.log(error)
	 	});
		}

	 // We will need a Ajax Call here to fetch Users FriendList
	 // Once we fetch the data we will be able setState for CurrentUserFriendList  

	 // Generate new Page 
	 // to newRoute
	makeAPage() {
		console.log('window.userid', window.userid);
	 	console.log('make page')
	 	console.log(this.state.currentFriendList)
	}
	
	// I pass down currentFriendList to child & also I passdown the changeFriendList 
	// To SearchFriendBar 


	// var arrayvar = this.state.arrayvar.slice()
	// arrayvar.push(newelement)
	// this.setState({ arrayvar: arrayvar })

	render() {
		// So my problem here is how does User work in here
		// when it comes in what kind of call is giving ? 
		// we know that when users comes in we going to a set of data (is that fetch method a GET?)
		// setTimeout(() => {
		// 	this.setState({currentUserFriendList: FakeFriendData})
		// }, 1000);
		return (
      	<div>
  			<HeaderBar />
  		<div className='container'>
  			<div className="jumbotron">
  				<h1>#TheBlowers</h1>
  				<p>Welcome: </p>
			</div>
		</div>
        <div className='container'>
  				<div className='row'>
  					<div className='col-sm-4'>
  						<SearchFriendBar CurrentFriendList={this.state.currentUserFriendList}/>
  					</div>
  					<div className='col-sm-3'>
  						<UserDetail User={this.state.currentUserLocation}/>
  					</div>
  					<div className='col-sm-4'>					
  						<FriendList friends={this.state.currentUserFriendList}/>
  					</div>
  				</div>
          		<button onClick={this.makeAPage.bind(this)} className='btn btn-primary'><Link to={'room'}>Create new page</Link></button>
  			</div>
      	</div>
		);
  	}
}

export default App
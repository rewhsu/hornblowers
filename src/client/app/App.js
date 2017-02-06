import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import HeaderBar from './headerbar';
import FriendList from './friend_list';
import UserDetail from './User_detail';
import SearchFriendBar from './Search_Friend_Bar';
import axios from 'axios';

// These data will be ajax from (sql)db 
// we will have storage of friends


class App extends React.Component {
	constructor(props) {
	 super(props);
	 
	 this.state = {
	 	currentUserId: null,
	 	currentUserData: null,
	 	currentUserFriendList: [],
	 	currentUserLocation: null,
	 	UserFriendList: null,
	 	clicked: true
	 }
	}

	componentWillMount(){
    	document.body.style.backgroundImage = "url('http://www.shunvmall.com/data/out/255/47210155-white-background-images.jpg')";
    	document.body.style.backgroundAttachment = 'fixed';
    	document.body.style.backgroundSize = 'cover';
    	document.body.style.padding = 0;
    	document.body.style.margin = 0;

  	} 	

	// componentWillMount() {
	//  	var self = this;
	//  	axios.post('api/db/check').then(function(user){
	//  		console.log('the user', user)
	//  	self.setState ({
	//  		currentUserId: user.data
	//  	});
	// 	}).catch(function (error){
	//  		console.log('nope')
	//  		console.log(error)
	//  	});
	// }
 

	 // We will need a Ajax Call here to fetch Users FriendList
	 // Once we fetch the data we will be able setState for CurrentUserFriendList  

	 // Generate new Page 
	 // to newRoute
	makeAPage() {
		console.log(this.state.currentUserId)
	 	console.log(this.state.currentFriendList)
	 	console.log('make page')
		// axios.post('/api/db/check')
  //   	.then(function(response) {

  //     	if (response.data) {
  //       	browserHistory.push('/room');
  //     	}	 
	 // 	})
	}
	
	// I pass down currentFriendList to child & also I passdown the changeFriendList 
	// To SearchFriendBar 

	render() {
		return (
      	<div className='headerbar'>
  			<HeaderBar />
  		<div >
  			<div className="headerimg" >
  				<img src="/assets/Header.png" align="middle" height="200"></img>
			</div>
		</div>
        <div className='container'>
  				<div className='row'>
  					<div className='col-sm-4'>
  						<SearchFriendBar/>
  					</div>
  					<div className='col-sm-4'>					
  						<FriendList UserFriend={this.state.UserFriendList}/>
  					</div>
  				</div>
          		<button onClick={this.makeAPage.bind(this)} className='btn btn-info'>test</button>
  				<button onClick={this.makeAPage.bind(this)} className='btn btn-warning'><Link to={'room'}>Create new page</Link></button>
  			</div>
      	</div>
		);
  	}
}

export default App
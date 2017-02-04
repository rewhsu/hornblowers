import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import HeaderBar from './headerbar';
import FriendList from './friend_list';
import UserDetail from './User_detail';
import SearchFriendBar from './Search_Friend_Bar';


// These data will be ajax from (sql)db 
// we will have storage of friends


var UserData = [
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


var FakeFriendData = [ 
				{
					"name": "Kevin Wong",
					"img": "https://avatars3.githubusercontent.com/u/16652498?v=3&s=460",
					"etag": 2
				},

				{
					"name": "Jennifer Sha",
					"img": "https://avatars2.githubusercontent.com/u/15174445?v=3&s=400",
					"etag": 3
				}
			]


class App extends React.Component {
	constructor(props) {
	 super(props);

	 this.state = {
	 	// user friendsdata

	 	// so friendlist will load when user log in 
	 	currentUserFriendList: [],
	 	currentUserLocation: null,
	 	// FriendList - Friends={this.state.currentUserFriendList}
	 	allUserDataFromDateBase: UserData,
	 	testingToFriend: []
	 };
	 
	 // We will need a Ajax Call here to fetch Users FriendList
	 // Once we fetch the data we will be able setState for CurrentUserFriendList  
	 }

	 // Generate new Page 
	 // to newRoute
	makeAPage() {
	 	console.log('make page')
	}
	
	// I pass down currentFriendList to child & also I passdown the changeFriendList 
	// To SearchFriendBar 
	changeFriendList(newList) {
		console.log('A Click from my child(Search_Friend_Bar_item)')
		var newFriendList = this.state.currentUserFriendList.push(newList)
		this.setState ({
			// newList is a searchUserObject
			currentUserFriendList: newFriendList
		});
	}

	// var arrayvar = this.state.arrayvar.slice()
	// arrayvar.push(newelement)
	// this.setState({ arrayvar: arrayvar })

	render() {
		// So my problem here is how does User work in here
		// when it comes in what kind of call is giving ? 
		// we know that when users comes in we going to a set of data (is that fetch method a GET?)
		setTimeout(() => {
			this.setState({currentUserFriendList: FakeFriendData})
		}, 1000);
		return (
      <div>
  			<HeaderBar />
        <div className='container'>
  					<div className='row'>
  						<div className='col-sm-3'>
  							<SearchFriendBar 
  								AllUserData={this.state.allUserDataFromDateBase} 
  								CurrentFriendList={this.state.currentUserFriendList}
  								changeFriendListFunc={this.changeFriendList.bind(this)}
  							/>
  						</div>
  						<div className='col-sm-3'>
  							<UserDetail User={this.state.currentUserLocation}/>
  						</div>
  						<div className='col-sm-3'>					
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
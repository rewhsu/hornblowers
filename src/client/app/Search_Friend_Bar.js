import React from 'react';
import ReactDOM from 'react-dom';
import SearchFriendBarListItem from './Search_friend_bar_item'

// The Props will be All USERS from DB  
// it might can be functional (lets put it in class first)

// class SearchFriendBar extends React.Components {
// 	constructor(props) {
// 		super(props);
// 	}
// 	render() {
// 		return (
// 			<div>{console.log(props)}</div>
// 		)
// 	}
// }

class SearchFriendBar extends React.Component {
	constructor(props) {
		super(props);
	

	this.state = {
		UserSearchInput: '',
		IneedThisFriend: null,
		homeUser: props.CurrentFriendList
	 	};
	}

	AddFriendList() {
		this.props.changeFriendListFunc(this.state.IneedThisFriend.props.Userdata);
	}


	FindFriend() {
		// The input from User
		var searchFriend = this.state.UserSearchInput;

		// DataComing in from DB
		var allUserData = this.props.AllUserData;	
		
		// OnClick this function will run and loopthrough allUserData 
		// if match SearchFriend(event.target.value) it will generate the SearchFriendBarListItem Component 
		allUserData.map((allUser) => {
			if(searchFriend === allUser.name) {

				this.setState({
					IneedThisFriend: <SearchFriendBarListItem 
											key={allUser.etag} 
											Userdata={allUser}
											changeFunc={this.AddFriendList.bind(this)}
									/>
				});
			}
		});
	}
	OnHandleChange(event) {
		this.setState({
			UserSearchInput: event.target.value
		});
	}
	
	render() {
		return (
			<div>
				<p className='lead'>Global Friend</p>
				<div className='list-group'>
					<input type='text' 
						   onChange={this.OnHandleChange.bind(this)} 
						   placeholder='add friend'
					/>
					<button onClick={this.FindFriend.bind(this)} className='btn btn-primary'>Search</button>
					{this.state.IneedThisFriend}
				</div>	
			</div>
		);
	}
}


export default SearchFriendBar;




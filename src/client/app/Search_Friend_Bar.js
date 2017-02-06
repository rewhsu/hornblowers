import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchFriendBarListItem from './Search_friend_bar_item'


class SearchFriendBar extends React.Component {
	constructor(props) {
		super(props);
	

	this.state = {
		UserSearchInput: '',
		IneedThisFriend: null,
		homeUser: props.CurrentFriendList,
		User: null
	 	};
	}

	FindFriend() {
		// The input from User
		var self = this
		var searchFriend = this.state.UserSearchInput;

		// DataComing in from DB		
		axios.get('/api/db/users', {
				params: {
					searchName: this.state.UserSearchInput
				}
			}).then(function(UserInDB){
				console.log(UserInDB)
				self.setState({
					IneedThisFriend: <SearchFriendBarListItem 
											Userdata={UserInDB}
									/>
				});	
			}).catch(function(error){
				console.log(error)
			});
		// OnClick this function will run and loopthrough allUserData 
		// if match SearchFriend(event.target.value) it will generate the SearchFriendBarListItem Component 
	}

	OnHandleChange(event) {
		this.setState({
			UserSearchInput: event.target.value
		});
	}
	
	render() {
		return (
			<div>
				<p className='lead' >Global Friend</p>
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




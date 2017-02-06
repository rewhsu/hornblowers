import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FriendListItem from './friend_list_item';


class FriendList extends React.Component{
	constructor(props) {
		super(props);
	
	this.state = {
		UserFriendList: null,
		userId: this.props.CurrentUserId,
		theGroupForRoom: []		
		}
	}

	componentWillMount() {
	 	var self = this;
	 	axios.get('api/db/friends', {
	 		userId: this.props.CurrentUserId
	 	}).then(function (response) {
    		console.log('The json', response);
    		self.setState ({
    			UserFriendList: response.data
    		})
  		}).catch(function (error) {
    		console.log(error);
  		});
  	}

	 // 	.then(function(userFriend){
	 // 		console.log('the user', user)
	 // 	self.setState ({
	 // 		currentUserId: user.data
	 // 	});
		// }).catch(function (error){
	 // 		console.log('nope')
	 // 		console.log(error)
	 // 	});
		// }
	
	
	addToRoom(friend) {
		console.log('A Click from child(Friend_List_Item)')
		this.state.theGroupForRoom.push(friend)
		console.log(this.state.theGroupForRoom)
	}

	// Generate new Page 
	 // to newRoute
	showFriends() {
	 	console.log('make page')
	 	console.log(this.state.UserFriendList)
		const FriendItems = this.state.UserFriendList.map((friend) => {
			return <FriendListItem 
					frienddata={friend}
				/>
	 	this.setState({
	 		UserFriendComponent: FriendItems
			});
	 	})
	 	console.log(this.state.UserFriendComponent)
	}

	render() {
	return (
		<div> 			
			<p className='lead'>FriendList</p>
			{this.state.UserFriendComponent}
			<button onClick={this.showFriends.bind(this)} className='btn btn-info'>showFriends</button>
		</div>
		)
						//{FriendItems}
						// theRoom={this.state.theGroupForRoom}
						// AddFriendToRoomFunc={this.addToRoom.bind(this)}
	}
}


export default FriendList;
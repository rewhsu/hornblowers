import React from 'react';

class FriendListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	addFriendToRoom() {
		console.log('added FriendToRoom');
		this.props.AddFriendToRoomFunc(this.props.frienddata)
	}

	deleteFriendFromUser() {
		console.log('delete friend');
	}

	render() {
		return (
			<li>
				<div>Friend: {this.props.frienddata.user_name}</div>
	      		<button className="btn btn-info" onClick={this.addFriendToRoom.bind(this)}>Add To Room</button>
	      		<button className="btn btn-danger" onClick={this.deleteFriendFromUser.bind(this)}>DeleteFriend</button>
			</li>
		);
	}
}

export default FriendListItem; 
 
  


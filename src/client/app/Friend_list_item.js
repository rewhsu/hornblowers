import React from 'react';

class FriendListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	addFriendToRoom() {
		this.props.AddFriendToRoomFunc(this.props.frienddata)
	}

	render() {
		return (
			<li>
				<div>{this.props.frienddata.name}</div>
	      		<img src={this.props.frienddata.img}/>
	      		<button onClick={this.addFriendToRoom.bind(this)}>Add To Room</button>
			</li>
		);
	}
}

export default FriendListItem; 
 
  


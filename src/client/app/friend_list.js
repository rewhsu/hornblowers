import React from 'react';
import ReactDOM from 'react-dom';
import FriendListItem from './friend_list_item';


class FriendList extends React.Component{
	constructor(props) {
		super(props);
	
	this.state = {
		checkedFriends: [],
		currentFriendsList: this.props.friends,
		theGroupForRoom: []
	}

	};
	addToRoom(friend) {
		console.log('A Click from child(Friend_List_Item)')
		this.state.theGroupForRoom.push(friend)
		console.log(this.state.theGroupForRoom)
	}

	// Generate new Page 
	 // to newRoute
	makeAPage() {
	 	console.log('make page')
	 	console.log(this.state.theGroupForRoom)
	}


	render() {
	const FriendItems = this.props.friends.map((friend) => {
		return <FriendListItem 
						frienddata={friend}
						theRoom={this.state.theGroupForRoom}
						AddFriendToRoomFunc={this.addToRoom.bind(this)}

				/>
	});
	return (
		<div> 			
			<p className='lead'>FriendList</p>
			<ul>
				{FriendItems}
			</ul>
			<button onClick={this.makeAPage.bind(this)} className='btn btn-primary'>Create new page</button>
		</div>
		)
	}
}


export default FriendList;
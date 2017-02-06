import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FriendListItem from './friend_list_item';


class FriendList extends React.Component{
	constructor(props) {
		super(props);
	
	this.state = {
		UserFriendList: this.props.UserFriend,
		theFriendComponent: null,
		FriendItems: [],
		check: false,
		theGroupForRoom: []		
		}
	}
	
	componentWillMount() {
		var self = this;
	 	axios.get('api/db/friends').then(function (response) {
    		console.log('The json is ready', response);
    		self.setState ({
    			FriendItems: response.data
    		});
		});
	}

	changeState() {
		this.setState({
			check: !this.state.check
		})
		console.log(this.state.check)
	}

	addToRoom(friend) {
		console.log('A Click from child(Friend_List_Item)')
		this.state.theGroupForRoom.push(friend)
		console.log(this.state.theGroupForRoom)
	}


	showFriends() {
		console.log(this.state.FriendItems.Friend_a.user_name)
	}

	render() {
		const FriendItems = this.state.FriendItems.map((friend) => {
			return <FriendListItem 
					frienddata={friend}
					AddFriendToRoomFunc={this.addToRoom.bind(this)}
			/>
		});
	return (
		<div> 			
			<p className='lead'>FriendList</p>
			{FriendItems}
			<button onClick={this.showFriends.bind(this)} className='btn btn-info'>showFriends</button>
			<button onClick={this.changeState.bind(this)} className='btn btn-info'>testing</button>
		</div>
		);
	}
}





export default FriendList;
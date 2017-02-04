import React from 'react';
import ReactDOM from 'react-dom';
import FriendListItem from './friend_list_item';


class FriendList extends React.Component{
	constructor(props) {
		super(props);
	
	this.state = {
		checkedFriends: [],
		currentFriendsList: this.props.friends
	}

	};


	// Generate new Page 
	 // to newRoute
	makeAPage() {
	 	console.log('make page')
	 	console.log(this.props.friends)
	 	console.log(this.state.testing)
	}


	render() {
	const FriendItems = this.props.friends.map((friend) => {
		return <FriendListItem 
						key={friend.etag} 
						frienddata={friend} 
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
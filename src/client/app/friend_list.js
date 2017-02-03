import React from 'react';
import ReactDOM from 'react-dom';
import FriendListItem from './friend_list_item';


const FriendList = (props) => {
	const FriendItems = props.friends.map((friend) => {
		return <FriendListItem key={friend.etag} frienddata={friend} />
	});
	
	return (
		<ul>		
			{FriendItems}
		</ul>
	)
}


export default FriendList;
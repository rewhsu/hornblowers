import React from 'react';

const FriendListItem = (props) => {

	return (
		<li>
			<div>{props.frienddata.name}</div>s
      		<img src={props.frienddata.img}/>
		</li>
	);
}

export default FriendListItem; 
 



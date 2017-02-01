import React from 'react';

const FriendListItem = (props) => {

	return (
		<li className='list-group-item'>
			<div className='video-list media'>
				<div className='media-left'>
					<img className='media-object img-responsive' src={props.frienddata.img}/>
				</div>

				<div className='media-body'>
					<div className="media-heading">{props.frienddata.name}</div>
				</div>
			</div>
		</li>
	);
}

export default FriendListItem; 
 

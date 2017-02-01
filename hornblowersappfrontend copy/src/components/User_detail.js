import React from 'react';


// We going have the users location 

const UserDetail = (props) => {

	return (
		<div className='video-detail col-md-8'>
			<div className='embed-responsive embed-responsive-16by9'>
				<img className='embed-responsive-item' src='https://www.appelsiini.net/assets/2008/5/26/tartu.png' />
			</div>
			<div className='details'>
				<div>Location</div>
				<div>Time</div>
			</div>
		</div>
	)
};


export default UserDetail;
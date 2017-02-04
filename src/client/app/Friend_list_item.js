import React from 'react';

class FriendListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li>
				<div>{this.props.frienddata.name}</div>
	      		<img src={this.props.frienddata.img}/>
	      		<input className='checkbox' type="checkbox"/> 
			</li>
		);
	}
}

export default FriendListItem; 
 
  


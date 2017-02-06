import React from 'react';
import axios from 'axios';


class SearchFriendBarListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	AddFriendToUser() {
    	axios.post('api/db/friends', {
        	friendId: this.props.Userdata.data.id
      	}).then(function(response) {
        console.log('Success adding friend!')
      	}).catch(function(err){
      		console.log('error')
      	})
  	}
	
	render () {
		return (
			<div className="card">
				<div className='card-block'>
					<h3 className="card-title">{this.props.Userdata.data.user_name}</h3>
					<h3 className="card-title">{this.props.Userdata.data.id}</h3>
					<button className="btn btn-success" onClick={this.AddFriendToUser.bind(this)}>AddFriend</button>
				</div>
			</div>
		)
	};
}



SearchFriendBarListItem.propTypes = {

}

export default SearchFriendBarListItem; 
 



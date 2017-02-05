import React from 'react';


class SearchFriendBarListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	AddFriendToUser() {
		// axios.post('/api/db/friends', {friendId: this.props.Userdata.data.id}
		
		// 	}).then(function(UserInDB){
		// 		console.log(UserInDB)
		// 		self.setState({
		// 			IneedThisFriend: <SearchFriendBarListItem 
		// 									Userdata={UserInDB}
		// 									changeFunc={self.AddFriendList.bind(this)}
		// 							/>
		// 		});	
		// 	}).catch(function(error){
		// 		console.log(error)
		// });
		console.log("add Friend to DB");
		console.log(this.props.Userdata.data.id)
	}

	render () {
		return (
			<div className="card">
				<div className='card-block'>
					<h3 className="card-title">{this.props.Userdata.data.user_name}</h3>
					<p className='card-text'>userpassword:{this.props.Userdata.data.user_password}</p>
					<button className="btn btn-success" onClick={this.AddFriendToUser.bind(this)}>AddFriend</button>
				</div>
			</div>
		)
	};
}



SearchFriendBarListItem.propTypes = {

}

export default SearchFriendBarListItem; 
 



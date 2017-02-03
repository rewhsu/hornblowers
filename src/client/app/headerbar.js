import React from 'react';

class HeaderBar extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<nav className='navbar navbar-default'>
				<div className='container'>
					<div className="navbar-header">
						<ul className="nav navbar-nav">
							<li><a href="#">Home</a></li>
							<li><a href="#">sign in</a></li>
							<li><a href="#">login</a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
};	

// Where important that the when the component renders the value of the 
// input is set to retrieve its value from this start state term 
// so its inital value is an empty string and we start of totally empty.


export default HeaderBar;






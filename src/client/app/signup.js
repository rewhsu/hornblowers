import React from 'react';
import HeaderBar from './headerbar'


class Signup extends React.Component {
  constructor(props) {
    super(props);


    // this.state = {
    //   hovering: false
    // }
  }

  signUp() {
    console.log('signup');
  }

  render() {

    return (
      <div>
        <HeaderBar />
        <h1>Signup</h1>
        <form className='loginWrapper' method='post'>
          <label>Name: <input type='text' placeholder='John Doe'/></label><br/>
          <label>Email: <input type='email' placeholder='john.doe@email.com'/></label><br/>
          <label>Password: <input type='text' placeholder='secret'/></label><br/>
          <label>Latitude: <input type='text' placeholder=''/></label><br/>
          <label>Longitude: <input type='text' placeholder=''/></label><br/>
          <button type='button' onClick={this.signUp}>submit</button>
        </form>
        <p></p>
      </div>
    )
  }

}

export default Signup;


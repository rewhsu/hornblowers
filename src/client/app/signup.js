import React from 'react';
import HeaderBar from './headerbar'
import { browserHistory } from 'react-router';
import axios from 'axios';


class Signup extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      name: '',
      email: '',
      password: '',
      streetaddress:''
    }

  }

  signUp() {
    console.log('signup');
    var self = this;
    axios.post('/api/db/signup', {
      name: self.state.name,
      email: self.state.email,
      password: self.state.password,
      streetaddress: self.state.streetaddress
    })
      .then(function(response) {
        console.log('typeof response:', typeof response);
        console.log('response:', response);
        if (typeof response.data === 'string') {
          console.log('user found, login instead');      
        } else {
          console.log('signup successful, user created');
        }
      })
        .then(function(response) {
          browserHistory.push('/login'); 
       })


              
      // .catch(function (error) {
      //   console.log('user not found');
      // });
  }

  handleNameChange (e) {
     this.setState({name: e.target.value});
  }

  handleEmailChange (e) {
     this.setState({email: e.target.value});
  }

  handlePasswordChange (e) {
     this.setState({password: e.target.value});
  }

  handleStreetAddressChange (e) {
     this.setState({streetaddress: e.target.value});
  }


  render() {

    return (
      <div>
        <HeaderBar />
        <h1>Signup</h1>
        <form className='loginWrapper' method='post'>
          <label>Name: <input type='text' placeholder='John Doe' onChange={this.handleNameChange.bind(this)}/></label><br/>
          <label>Email: <input type='email' placeholder='john.doe@email.com' onChange={this.handleEmailChange.bind(this)}/></label><br/>
          <label>Password: <input type='text' placeholder='secret' onChange={this.handlePasswordChange.bind(this)}/></label><br/>
          <label>Street Address: <input type='text' placeholder='944 Market St, San Francisco, CA 94102' onChange={this.handleStreetAddressChange.bind(this)}/></label><br/>
          <button type='button' onClick={this.signUp.bind(this)}>submit</button>
        </form>
        <p></p>
      </div>
    )
  }

}

export default Signup;


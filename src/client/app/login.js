import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import axios from 'axios';



class Login extends React.Component {
  constructor(props) {

    super(props);


    this.state = {
      email: 'hi',
      password: 'dfsdf'
    }
  }

  logIn() {
    //if login name and password match then change route to main page
    console.log("Email: " + this.state.email);
    console.log("Password: " + this.state.password);
    // axios.post()
    browserHistory.push('/');

  }

  handleEmailChange (e) {
     this.setState({email: e.target.value});
  }

  handlePasswordChange (e) { 555
     this.setState({password: e.target.value});
  }

  render() {

   
    return (
      <div>
        <h1>Login</h1>
        <form className='loginWrapper' method='post'>
          <label>Email: <input type='text' name='email' placeholder='john.doe@email.com' onChange={this.handleEmailChange.bind(this)}/></label><br/>
          <label>Password: <input type='password' name='password' placeholder='secret'onChange={this.handlePasswordChange.bind(this)}/></label><br/>

          <button type='button' onClick={this.logIn.bind(this)}>submit</button>
        </form>
      </div>
    )
  }

}

export default Login;
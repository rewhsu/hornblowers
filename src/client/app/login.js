import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';
import HeaderBar from './headerbar'





class Login extends React.Component {
  constructor(props) {

    super(props);


    this.state = {
      email: 'hi',
      password: 'dfsdf',
      loginfailed: '',
    }
  }

  logIn() {
    
    console.log("Email: " + this.state.email);
    console.log("Password: " + this.state.password);

    // window.user = this.state.email;
    //request email and see if passwords match
    var self = this;
    axios.post('/api/db/login', {
      email: self.state.email,
      password: self.state.password
    })
      .then(function(response) {
        console.log('response', response);
        console.log('response.data["user_password"]: ', response.data["user_password"].length);
        console.log('this.state.password: ', self.state.password.length);
        if (response.data["user_password"] === self.state.password) {
          //if login email and password match what's in database then change route to main page
          window.userid = response.data.id;
          browserHistory.push('/');    
        }
      })
      .catch(function (error) {
        self.setState({loginfailed: true});
        console.log('email and password do not match');
      });
  }

  handleEmailChange (e) {
     this.setState({email: e.target.value});
  }

  handlePasswordChange (e) {
     this.setState({password: e.target.value});
  }

  render() {

   
    return (
      <div>
        <HeaderBar />
        <h1>Login</h1>
        <form className='loginWrapper' method='post'>
          <label>Email: <input type='text' name='email' placeholder='john.doe@email.com' onChange={this.handleEmailChange.bind(this)}/></label><br/>
          <label>Password: <input type='password' name='password' placeholder='secret'onChange={this.handlePasswordChange.bind(this)}/></label><br/>
          <div> {this.state.loginfailed ? 'Wrong email\/password or account does not exist.' : '' }</div>
          <Link to={'signup'}>No account? No problem, create an account today!</Link>
          <br/>
          <button type='button' onClick={this.logIn.bind(this)}>submit</button>
        </form>
      </div>
    )
  }

}

export default Login;
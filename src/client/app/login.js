import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';
import HeaderBar from './headerbar'

var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

class Login extends React.Component {
  constructor(props) {

    super(props);


    this.state = {
      email: 'hi',
      password: 'dfsdf',
      loginfailed: '',
    }
  }

  componentWillMount(){
    document.body.style.backgroundImage = "url('https://wallpaperscraft.com/image/san_francisco_night_bridge_city_lights_river_79264_1920x1080.jpg')";
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.padding = 0;
    document.body.style.margin = 0;
  }

  logIn() {
    
    console.log("Email: " + this.state.email);
    console.log("Password: " + ' ieXJPjN');
    // window.user = this.state.email;
    //request email and see if passwords match
    var self = this;


    var comparePW = Promise.promisify(bcrypt.compare);

    

    console.log("Password: " + self.state.password);

    axios.post('/api/db/login', {
      email: self.state.email,
      password: self.state.password
    })
      .then(function(response) {
        console.log('response', response);
        console.log('response.data["user_password"]: ', response.data["user_password"]);
        console.log('this.state.password: ', self.state.password);
        
        var passwordMatched = comparePW(self.state.password, response.data["user_password"])
          .then(function(match) {
            if (match) {
              return true;
            }
          })
        if (passwordMatched) {
          //if login email and password match what's in database then change route to main page
          // window.userid = response.data.id;
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
      <div className="container">
      <div className="row">
        <div className="col-md-12">
            <div className="wrap">
                <p className="form-title">
                    Sign In</p>
                <form className="login" method='post'>
                <input type="text" name='email' placeholder='Email' onChange={this.handleEmailChange.bind(this)}/>
                <input type="password" name='password' placeholder='secret' onChange={this.handlePasswordChange.bind(this)}/>
                <div className='wrongColor'>{this.state.loginfailed ? 'Wrong email\/password or account does not exist.' : '' }</div>
                <Link to={'signup'}>No account? No problem, create an account today!</Link>
                <button type="button" className="btn btn-success btn-sm" onClick={this.logIn.bind(this)}>Sign In</button>
                <div className="remember-forgot">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    Remember Me
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
  </div>
  )
  }
}

export default Login;


// <form className='loginWrapper' method='post'>
//         <label>Email: <input type='text' name='email' placeholder='john.doe@email.com' onChange={this.handleEmailChange.bind(this)}/></label><br/>
//         <label>Password: <input type='password' name='password' placeholder='secret'onChange={this.handlePasswordChange.bind(this)}/></label><br/>
//         <div> {this.state.loginfailed ? 'Wrong email\/password or account does not exist.' : '' }</div>
//         <Link to={'signup'}>No account? No problem, create an account today!</Link>
//         <br/>
//         <button type='button' onClick={this.logIn.bind(this)}>submit</button>
// </form>
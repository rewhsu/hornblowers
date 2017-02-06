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

  componentWillMount(){
    document.body.style.backgroundImage = "url('https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/DDYC9U7O2P.jpg')";
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.padding = 0;
    document.body.style.margin = 0;
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
          browserHistory.push('/login'); 
        }
      })
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="col-md-6 signuphead">signUp</h3>
            <form method="post" acceptCharset="utf-8" className="form">
              <div className="row">
                  <div className="col-md-12">
                      <input type="text" name="firstname" className="form-control input-lg" placeholder="First Name" onChange={this.handleNameChange.bind(this)}/></div>
                  </div>
                  <input type="text" name="email" className="form-control input-lg" placeholder="Your Email" 
                         onChange={this.handleEmailChange.bind(this)}
                         />
                  <input type="text" name="address" className="form-control input-lg" placeholder="Address" 
                         onChange={this.handleStreetAddressChange.bind(this)}
                         />
                  <input type="password" name="password" className="form-control input-lg" placeholder="Password" 
                         onChange={this.handlePasswordChange.bind(this)}
                         />
                  <span className="help-block wordingInSignUpTwo">By clicking Create my account, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.</span>
                <button className="btn btn-lg btn-primary btn-block signup-btn" type="button" onClick={this.signUp.bind(this)}>Create my account</button>
              </form>          
            </div>
          </div>
       </div>
    )
  }
}

export default Signup;

      // <div>
      //   <h1>Signup</h1>
      //   <form className='loginWrapper' method='post'>
      //     <label>Name: <input type='text' placeholder='name' onChange={this.handleNameChange.bind(this)}/></label><br/>
      //     <label>Email: <input type='email' placeholder='example@email.com' onChange={this.handleEmailChange.bind(this)}/></label><br/>
      //     <label>Password: <input type='text' placeholder='secret' onChange={this.handlePasswordChange.bind(this)}/></label><br/>
      //     <label>Street Address: <input type='text' placeholder='944 Market St, San Francisco, CA 94102' onChange={this.handleStreetAddressChange.bind(this)}/></label><br/>
      //     <button type='button' onClick={this.signUp.bind(this)}>submit</button>
      //   </form>
      //   <p></p>
      // </div>

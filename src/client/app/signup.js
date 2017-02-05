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
    document.body.style.backgroundImage = "url('https://cdn0.vox-cdn.com/thumbor/0X4g71SY14h1REyoq7YL2KwJ-lc=/0x150:2000x1275/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/46294322/Belga_PChang-8474.0.0.jpg')";
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="col-md-6 signuphead">signUp</h3>
            <form method="post" acceptCharset="utf-8" className="form">
              <div className="row">
                  <div className="col-md-12">
                      <input type="text" name="firstname" className="form-control input-lg" placeholder="First Name" onChange={this.handleNameChange.bind(this)}/></div>
                  </div>
                <input type="text" name="email" className="form-control input-lg" placeholder="Your Email" onChange={this.handleEmailChange.bind(this)}/>
                <input type="text" name="address" className="form-control input-lg" placeholder="Address" onChange={this.handleStreetAddressChange.bind(this)}/>
                <input type="password" name="password" className="form-control input-lg" placeholder="Password" onChange={this.handlePasswordChange.bind(this)}/>
                    <label className='wordingInSignUp'>Birth Date</label>
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <select name="month" className= "form-control input-lg">
                                <option value="01">Jan</option><option value="02">Feb</option><option value="03">Mar</option>
                                <option value="04">Apr</option><option value="05">May</option><option value="06">Jun</option>
                                <option value="07">Jul</option><option value="08">Aug</option><option value="09">Sep</option>
                                <option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
                            </select>
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <select name="day" className= "form-control input-lg">
                                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
                                <option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
                                <option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
                                <option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option>
                                <option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="21">21</option>
                                <option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option>
                                <option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option>
                                <option value="30">30</option><option value="31">31</option>
                            </select>                        
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <select name="year" className= "form-control input-lg">
                                <option value="2001">2001</option><option value="2002">2002</option><option value="2003">2003</option><option value="2004">2004</option>
                                <option value="2005">2005</option><option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option>
                                <option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option>
                                <option value="2013">2013</option>
                            </select>
                        </div>
                    </div>
                    <label className='wordingInSignUp'>Gender   </label>
                    <label className="radio-inline wordingInSignUp">
                        <input type="radio" name="gender" value="M"/>Male
                    </label>
                    <label className="radio-inline wordingInSignUp">
                        <input type="radio" name="gender" value="F"/>Female
                    </label>
                    <br />
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

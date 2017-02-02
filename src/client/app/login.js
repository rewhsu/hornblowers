import React from 'react';
import ReactDOM from 'react-dom';



class Login extends React.Component {
  constructor(props) {
    console.log('tingmopeet')
    super(props);


    // this.state = {
    //   hovering: false
    // }
  }

  logIn() {
    console.log('login');
  }

  render() {

   
    return (
      <div>
        <h1>Login</h1>
        <form className='loginWrapper' method='post'>
          <label>Email: <input type='email' placeholder='john.doe@email.com'/></label><br/>
          <label>Password: <input type='text' placeholder='secret'/></label><br/>

          <button type='button' onClick={this.logIn}>submit</button>
        </form>
      </div>
    )
  }

}

export default Login;
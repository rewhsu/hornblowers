import React from 'react';


class Login extends React.Component {
  constructor(props) {
    super(props);


    // this.state = {
    //   hovering: false
    // }
  }

  logIn() {
    console.log('login');
  }

  render() {

    var users=[
        {
        user_id: 1,
        user_name: "Melissa Henderson",
        user_email: "mhenderson0@ow.ly",
        user_password: "a2pmTvMrt",
        user_latitude: 48.1212,
        user_longitude: -1.603
        },
        {
        "user_id": 2,
        "user_name": "Amy Harvey",
        "user_email": "aharvey1@ehow.com",
        "user_password": "lIacCCOS",
        "user_latitude": 18.42693,
        "user_longitude": -64.62079
      }];
   
    return (
      <div>
        <h1>Login</h1>
        <form className='loginWrapper' method='post'>
          <label>Email: <input type='email' placeholder='john.doe@email.com'/></label><br/>
          <label>Password: <input type='text' placeholder='secret'/></label><br/>

          <button type='button' onClick={this.logIn}>submit</button>
        </form>
        <p>{users[0]['user_name']}</p>
      </div>
    )
  }

}

export default Login;
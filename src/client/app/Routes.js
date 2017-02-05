import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Signup from './signup';
import Yelp from './Yelp';
import Room from './Room';
import Chat from './Chat';
import App from './App';
import Logout from './Logout';
import NotFoundPage from './NotFoundPage';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';



function requireAuth(nextState, replace) {
  console.log('nextState', nextState);
  console.log('replace', replace);


    
  axios.post('/api/db/check')
    .then(function(response) {
       // console.log('response', response);
       // console.log('response.data', response.data)
       // console.log('browserHistory', browserHistory)
       // console.log('response.data', response.data)
       if (response.data) {
        // browserHistory.push('/login');
        return true;
      }  else {
        browserHistory.push('/login');
        return false;
      }
    });
}

// function destroy(nextState, replace) {
//   axios.post('/api/db/logout');
// }

const routes = (
	<Router history={browserHistory}>
    <Route path="/" component={App} onEnter={requireAuth}/>
    <Route path="signup" component={Signup}/>
    <Route path="login" component={Login}/>
    <Route path="yelp" component={Yelp} onEnter={requireAuth}/>
    <Route path="room" component={Room} onEnter={requireAuth}/>
    <Route path="logout" component={Logout} />
    <Route path="*" component={NotFoundPage} />
 </Router>
);

export default routes;
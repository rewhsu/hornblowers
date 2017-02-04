import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Signup from './signup';
import Yelp from './Yelp';
import Room from './Room';
import Chat from './Chat';
import App from './App';
import NotFoundPage from './NotFoundPage';
import { Router, Route, Link, browserHistory } from 'react-router';


function loggedIn() {
	//temporary function, change to return false and it will redirect to login
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

const routes = (
	<Router history={browserHistory}>
    <Route path="/" component={App} onEnter={requireAuth}/>
    <Route path="signup" component={Signup}/>
    <Route path="login" component={Login}/>
    <Route path="yelp" component={Yelp} />
    <Route path="room" component={Room} />
    <Route path="*" component={NotFoundPage} />
 </Router>
);

export default routes;
import React from 'react';
import {render} from 'react-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello Reacttt!</p>
        <Login/>
        <Signup/>
      </div>
    )
  }
}

render(<Router history={ createBrowserHistory() }>
      <Route path="/" component={App}>
      <IndexRoute component={App}/>

        <Route path="/login" component={ Login } />
       </Route>

    </Router>, document.getElementById('app'));
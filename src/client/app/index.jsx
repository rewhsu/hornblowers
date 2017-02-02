import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello Reacttt!</p>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
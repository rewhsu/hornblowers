import React from 'react';
import {render} from 'react-dom';
import Login from './login.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
	    	<p> Hello Reacttt!</p>
	    	<Login />
    	</div>
    )
  }
}

render(<App/>, document.getElementById('app'));
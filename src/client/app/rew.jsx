import React from 'react';
import {render} from 'react-dom';
import Login from './login.jsx';

class MapApp extends React.Component {
  render () {
    return (
      <div>
        <p> Hello Map!</p>
        <Login />
      </div>
    )
  }
}

render(<MapApp />, document.getElementById('map'));
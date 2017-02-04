import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class InputText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      this.inputText = this.props.inputProps.value
    }
  }

  onBlur() {
    console.log("blur");
    if (this.state.inputText !== "") {
      this.setState({inputText: ""});
    }
  }

  render() {
    var detailsVisible;
    if (!this.state.showDetails) {
      detailsVisible = {display: "none"};

    }
    return (
      <div className="roomUser">
        <input 
          type="text" 
          value={this.props.inputProps.value}
          onChange={this.props.inputProps.onChange}
          className={this.props.inputProps.className}
        />
      </div>
    )
  }
}

export default InputText;
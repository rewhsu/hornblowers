import React from 'react';

class YelpResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      result: null
    };
  }

  toggle() {
    console.log('familytree toggle')
    // this.setState({visible: !this.state.visible});
  };

  toggleSpoiler() {
    console.log('spoil!', this.state.showSpoiler);
    // this.setState({showSpoiler: !this.state.showSpoiler});
  }

  getResults() {

  }

  render() {
    var style;
    if (!this.state.visible) {
      style = {display: "none"}
    }
    var imgStyle = {
      width:304,
      height:224,
    }
    return (
      <div style={style}>
        Name: {this.props.firstResult.name}<br/>
        Price: {this.props.firstResult.price}<br/>
        Address: {this.props.firstResult.location.display_address.join(', ')}<br/>
        Rating: {this.props.firstResult.rating}<br/>
        Reviews: {this.props.firstResult.review_count}<br/>
        <img src={this.props.firstResult.image_url} style={imgStyle} />
      </div>
    );
  }
}

export default YelpResult;

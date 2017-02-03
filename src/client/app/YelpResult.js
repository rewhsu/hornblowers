import React from 'react';

class YelpResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      result: null
    };
    this.goToUrl = this.goToUrl.bind(this);
  }

  goToUrl(e) {
    console.log(e.currentTarget);
    console.log(this.props.result.url);
  }

  render() {
    return (
      <div className="yelpResult">
        <br />
        <a className="yelpLink" target="_blank" href={this.props.result.url}>{this.props.result.name}</a>
        <div>
          <img src={this.props.result.image_url} className="yelpImage" />
          <h6>{this.props.result.location.display_address.join(', ')}</h6>
          <div className="yelpProp">Rating: {this.props.result.rating}</div>
          <div className="yelpProp">Reviews: {this.props.result.review_count}</div>
          <div className="yelpProp">Price: {this.props.result.price}</div>
        </div>
        <br />
      </div>
    );
  }
}

export default YelpResult;

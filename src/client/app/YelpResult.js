import React from 'react';

class YelpResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      result: null,
      vote: false
    };
    this.goToUrl = this.goToUrl.bind(this);
    this.voteForResult = this.voteForResult.bind(this);
  }

  goToUrl(e) {
    console.log(e.currentTarget);
    console.log(this.props.result.url);
  }

  voteForResult(e) {
    this.props.voteFunc(this.props.result.name);
    if (!this.state.vote) {
      console.log('vote on');
      e.currentTarget.className = 'vote-on';
      this.setState({vote: true});
    }
    if (this.state.vote === true) {
      console.log('vote off');
      e.currentTarget.className = 'vote-off';
      this.setState({vote: false});
    }
    // this.setState({voteOn: !this.state.voteOn})
  }

  render() {
    return (
      <div className="yelpResult">
        <br />
        <a className="yelpLink" target="_blank" href={this.props.result.url}>{this.props.result.name}</a>
        <div onClick={this.voteForResult}>
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

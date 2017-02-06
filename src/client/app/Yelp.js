import React from 'react';
import ReactDOM from 'react-dom';

import { yelpSearch } from './yelpSearch';
import YelpResult from './YelpResult';

import axios from 'axios';

import nodeGeocoder from 'node-geocoder';
import geolib from 'geolib';
 
let geocoder = nodeGeocoder({provider: 'google'});

class Yelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: 'food',
      location: '944 Market St, San Francisco, CA',
      limit: 5,
      radius: 3000, //meters
      result: null,
      yelpBorderVis: false,
      yelpMenuVis: false,
      votes: {},
      eventMembers: []
    }
    this.toggleVote = this.toggleVote.bind(this)
    this.onBlur = this.onBlur.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this)
    this.handleLimitChange = this.handleLimitChange.bind(this)
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.getResult = this.getResult.bind(this)
  }

  componentWillMount() {
     this.getEventMembers();
  }

  toggleVote(name) {
    var votes = this.state.votes;
    if (votes.hasOwnProperty(name)) {
      votes[name] = !votes[name];
    } else {
      votes[name] = true;
    }
    this.setState({votes: votes});
    console.log('****', this.state.votes);
  }

  onBlur(e) {
    console.log("blur");
    e.currentTarget.value="";
  }

  toggleSearch() {
    this.setState({yelpMenuVis: !this.state.yelpMenuVis});
  }

  handleLimitChange(event) {
    console.log('handleLimitChange');
    this.setState({limit: event.target.value});
  }

  handleRadiusChange(event) {
    console.log('handleRadiusChange');
    this.setState({radius: event.target.value});
  }

  handleTermChange(event) {
    console.log('handleTermChange');
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    console.log('handleLocationChange');
    this.setState({location: event.target.value});
  }

  findCenterLoc(data) {
    var context = this;
    var points = data.map(function(user) {
      return {latitude: user.user_lat, longitude: user.user_lon}
    });

    var midpoint = geolib.getCenterOfBounds(points);

    var centerPt = { lat: Number.parseFloat(midpoint.latitude), 
                    lon: Number.parseFloat(midpoint.longitude) }

    geocoder.reverse(centerPt)
      .then(function(res) {
        if (res[0].formattedAddress){
          context.setState({location: res[0].formattedAddress}); // set Location to new midpoint
        }
        context.getResult(); // get results from yelp after setting location
      })
      .catch(function(err) {
        context.getResult();
        console.log(err);
      });
  }

  getEventMembers() {
    var context = this;
    var eventMembers = [];
    console.log('**getEventMembers UNDEFINED UNTIL EVENT IS CREATED')
        // axios
        //   .post('api/db/events', {
        //     members: [10, 11, 22]//array of event friends i.e. [2, 4, 13] or [userObj, userObj, userObj]
        //   })
        //   .then(function(response) {
        //     console.log('Success creating event!')
    axios
      .get('api/db/eventMembers')
      .then(function(response) {
        eventMembers = response.data.map(function(member) {
          return member.Members;
        })
        console.log('**getEventMembers:', eventMembers)

        context.setState({
          eventMembers: eventMembers
        })
      })
      .then(function() {
        context.findCenterLoc(context.state.eventMembers);
      }); 
  }

  getResult() {
    var context = this;
    var term = this.state.term;
    var location = this.state.location;
    var limit = this.state.limit;
    axios
      .get('/api/yelp/' + term + '@' + location)
      .then(function(response) {
        context.setState({
          result: response.data,
          yelpBorderVis: true,
          yelpMenuVis: false
        });
      });
  }


  componentDidMount() {

  }

  render() {
    var borderVis;
    var menuVis;
    if (!this.state.yelpBorderVis) {
      borderVis = {display: "none"};
    }
    if (!this.state.yelpMenuVis) {
      menuVis = {display: "none"};
    }
    return (
      <div>
        <div className='yelpMenu' style={menuVis}>
          <label> 
            Number of Results:<br />
            <input type="text" onClick={this.onBlur} value={this.state.limit} onChange={this.handleLimitChange} className="prefilled" />
          </label><br />
          <label> 
            Radius:<br />
            <input type="text" onClick={this.onBlur} value={this.state.radius} onChange={this.handleRadiusChange} className="prefilled" />
          </label><br />
          <label> 
            Enter term string:<br />
            <input type="text" onClick={this.onBlur} value={this.state.term} onChange={this.handleTermChange} className="prefilled" />
          </label><br />
          <label> 
            Enter location string:<br />
            <input type="text" onClick={this.onBlur} value={this.state.location} onChange={this.handleLocationChange} className="prefilled" />
          </label><br />
          <button onClick={this.getResult} >Find Results</button>
        </div>
        <div className="bordered" style={borderVis}>
          <div className="pre-scrollable-fixed">
          <button onClick={this.toggleSearch}>Toggle Manual Search</button>
          {this.state.result ?
            this.state.result.map(item =>
              <YelpResult result={item} voteFunc={this.toggleVote} />
            )
            : null }
          </div>
        </div>
    </div>
    )
  }
}

export default Yelp;


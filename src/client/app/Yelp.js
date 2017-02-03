import React from 'react';
import ReactDOM from 'react-dom';

import { yelpSearch } from './yelpSearch';
import YelpResult from './YelpResult';

import axios from 'axios';

// const exampleResult = {
//     "price": "$",
//     "distance": 336.0722601476,
//     "location": {
//         "address2": null,
//         "zip_code": "94103",
//         "address3": "",
//         "state": "CA",
//         "city": "San Francisco",
//         "address1": "1051 Market St",
//         "display_address": [
//             "1051 Market St",
//             "San Francisco, CA 94103"
//         ],
//         "country": "US"
//     },
//     "id": "the-flying-falafel-san-francisco-3",
//     "review_count": 555,
//     "rating": 4.5,
//     "url": "https://www.yelp.com/biz/the-flying-falafel-san-francisco-3?adjust_creative=KwoQ7nFpMoPgs-07quInDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KwoQ7nFpMoPgs-07quInDw",
//     "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/O4zKAcpg4qFUQj5Kd5fjpQ/o.jpg",
//     "categories": [
//         {
//             "alias": "falafel",
//             "title": "Falafel"
//         },
//         {
//             "alias": "vegan",
//             "title": "Vegan"
//         }
//     ],
//     "phone": "+14159641003",
//     "name": "The Flying Falafel",
//     "display_phone": "(415) 964-1003",
//     "is_closed": false,
//     "coordinates": {
//         "latitude": 37.7812488,
//         "longitude": -122.411304
//     }
// };

// var myTree = buildTree('Alice');

class Yelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: 'falafel',
      location: '944 Market St, San Francisco, CA',
      limit: 10,
      radius: 3000, //meters
      result: this.props.result
    }

    this.handleLimitChange = this.handleLimitChange.bind(this)
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.getResult = this.getResult.bind(this);
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

  getResult() {
    var context = this;
    var term = this.state.term;
    var location = this.state.location;
    var limit = this.state.limit;
    axios
      .get('/api/' + term + '@' + location)
      .then(function(response) {
        context.setState({
          result: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <div className='yelpMenu'>
          <label>
            Number of Results:
            <br />
            <input type="text"
                   value={this.state.limit}
                   onChange={this.handleLimitChange}
                   className="prefilled"
            />
          </label>
          <br /><br />
          <label>
            Radius:
            <br />
            <input type="text"
                   value={this.state.radius}
                   onChange={this.handleRadiusChange}
                   className="prefilled"
            />
          </label>
          <br /><br />
          <label>
            Enter term string:
            <br />
            <input type="text"
                   value={this.state.term}
                   onChange={this.handleTermChange}
                   className="prefilled"
            />
          </label>
          <br /><br />
          <label>
            Enter location string:
            <br />
            <input type="text"
                   value={this.state.location}
                   onChange={this.handleLocationChange}
                   className="prefilled"
            />
          </label>
          <br /><br />
          <button onClick={this.getResult} >Find Results</button>
        </div>
        {this.state.result ?
          this.state.result.map(item =>
            <YelpResult result={item} />
          )
          : null }
      </div>
    )
  }
}

export default Yelp;


import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />

    <Marker
      position={{ lat: 34.397, lng: 150.644 }}
    />

  </GoogleMap>
));


// class Restaurant extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       restaurant: {
//         name: "Loading..",
//         address: "Please wait!"
//       }
//     };

//   }

//   componentDidMount() {
//     return fetch('/api/restaurant/' + this.props.id)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({ restaurant: responseJson });
//       })
//   }

//   render() {
//     return (
//       <ListGroupItem bsStyle="success">
//         {this.state.restaurant.name} - {this.state.restaurant.address} - {'★'.repeat(this.state.restaurant.stars)}
//       </ListGroupItem>
//     );
//   }
// }

// class Offer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       offers: [],
//     };
//   }

//   componentDidMount() {
//     return fetch('/api/offer/' + this.props.id)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({ offers: responseJson });
//       })
//   }

//   render() {
//     var rows = []
//     if (this.state.offers) {
//       this.state.offers.forEach((offer) => {
//         if (offer.type) {
//           if (!((offer.deal).includes('%'))) {
//             if ((offer.deal).includes('€')) {
//               var price = ((offer.deal).match(/\d+/));
//               rows.push(
//                 <ListGroupItem> {offer.title} (ou {Math.trunc(price / 6.5)} grecs, avec boisson) </ListGroupItem>
//               )
//             }
//           }
//           else {
//             rows.push(
//               <ListGroupItem> {offer.title} </ListGroupItem>
//             )
//           }
//         }
//       })
//     }
//     if (rows.length > 0) {
//       return (
//         <ListGroup>
//           <Restaurant id={this.props.id} />
//           <ListGroup>{rows}</ListGroup>
//         </ListGroup>
//       );
//     }
//     else {
//       return null;
//     }
//   }
// }

// class RestaurantTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { restaurants: [] };
//   }

//   componentDidMount() {
//     return fetch('/api/restaurant')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({ restaurants: responseJson  });
//       })
//   }

//   render() {
//     var rows = [];
//     this.state.restaurants.forEach((element, index) => {
//       rows.push(
//         <Offer id={index} />
//       )
//     })

//     return rows;
//   }
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={5}>
            </Col>
            <Col xs={12} md={7}>
              <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAETCw9bHicYqCFLiL1PQlw-jSAugwhEEw&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

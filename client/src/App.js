import React, { Component } from 'react';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        name: "Loading..",
        address: "Please wait!"
      }
    };
    
  }

  componentDidMount() {
    return fetch('/restaurant/' + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ restaurant: responseJson });
      })
  }

  render() {
    return (
      <ListGroupItem bsStyle="success">
        {this.state.restaurant.name} - {this.state.restaurant.address} - {'★'.repeat(this.state.restaurant.stars)}
      </ListGroupItem>
    );
  }
}

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  componentDidMount() {
    return fetch('/offer/' + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ offers: responseJson.result });
      })
  }

  render() {
    var rows = []
    this.state.offers.forEach((offer) => {
      if (offer.type) {
        if (!((offer.deal).includes('%'))) {
          if ((offer.deal).includes('€')) {
            var price = ((offer.deal).match(/\d+/));
            rows.push(
              <ListGroupItem> {offer.type} : {offer.deal} (ou {Math.trunc(price / 6.5)} grecs, avec boisson) </ListGroupItem>
            )
          }
        }
        else {
          rows.push(
            <ListGroupItem> {offer.type} : {offer.deal} </ListGroupItem>
          )
        }
      }
    })
    if (rows.length > 0) {
      return (
        <ListGroup>
          <Restaurant id={this.props.id} />
          <ListGroup>{rows}</ListGroup>
        </ListGroup>
      );
    }
    else {
      return null;
    }
  }
}

class RestaurantTable extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }

  componentDidMount() {
    return fetch('/referencedUrl')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ restaurants: responseJson.urls });
      })
  }

  render() {
    var rows = [];
    this.state.restaurants.forEach((element, index) => {
      rows.push(
        <Offer id={element.id} />
      )
    })

    return rows;
  }
}

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
          <RestaurantTable />
        </Grid>
      </div>
    );
  }
}

export default App;

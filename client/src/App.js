import React, { Component } from 'react';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class Restaurant extends Component {
  render() {
    return (
      <ListGroupItem bsStyle="success">
        {this.props.name} - {this.props.address}
      </ListGroupItem>
    );
  }
}

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
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
      rows.push(
        <ListGroupItem> {offer.type} : {offer.deal} </ListGroupItem>
      )
    })

    return (
      <div>
        {rows}
      </div>
    )
  }
}

class RestaurantTable extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }

  componentDidMount() {
    return fetch('/restaurant')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ restaurants: responseJson.restaurants });
      })
  }

  render() {
    var rows = [];
    this.state.restaurants.forEach((restaurant, index) => {
      rows.push(
        <ListGroup>
          <Restaurant name={restaurant.name} address={restaurant.address} />
          <Offer id={index} />
        </ListGroup>
      )
    })

    return (
      <div>
        {rows}
      </div>
    );
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

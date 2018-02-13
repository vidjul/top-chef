import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Restaurant extends Component {
  render() {
    return (
      <div>
        <p> {this.props.name} </p>
      </div>
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
        <p> {offer.date} : {offer.offer} </p>
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
        <div>
          <Restaurant name={restaurant.name} />
          <Offer id={index} />
        </div>
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
        <RestaurantTable />
      </div>
    );
  }
}

export default App;

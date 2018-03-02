import React, { Component } from 'react';
import FilterableRestaurantsContainer from './components/FilterableRestaurantsContainer';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FilterableRestaurantsContainer />
      </div>
    );
  }
}

export default App;

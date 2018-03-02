import React, { Component } from 'react';
import FilterableRestaurantsContainer from './components/FilterableRestaurantsContainer';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <FilterableRestaurantsContainer />
      </div>
    );
  }
}

export default App;

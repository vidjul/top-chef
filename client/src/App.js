import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import RestaurantTable from './components/RestaurantTable';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="jumbotron">
              <h1 class="display-4">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <p class="lead">
                <a class="btn btn-primary btn-lg" href="..." role="button">Learn more</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RestaurantTable />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

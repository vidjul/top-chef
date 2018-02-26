import React, { Component } from 'react';
import Offer from './Offer';

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.hideRestaurant = this.hideRestaurant.bind(this);
    this.state = {
      showRestaurant: true,
      toto: '0'
    };
  }

  hideRestaurant() {
    this.setState({ toto: '2' });
  }

  render() {

    if (!this.state.showRestaurant) {
      return null;
    }

    return (
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target={'#' + this.props.id} aria-expanded="true" aria-controls="collapseOne">
              {this.props.name} :
              {this.state.toto}
            </button>
          </h5>
        </div>
        <div id={this.props.id} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <Offer id={this.props.id} show={this.hideRestaurant} />
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantCard;
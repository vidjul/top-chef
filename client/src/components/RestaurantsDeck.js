import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';

class RestaurantDeck extends Component {

    render() {
        let cards = [];
        this.props.restaurants.forEach((restaurant, index) => {
            cards.push(
                <RestaurantCard
                    restaurant={restaurant}
                    key={index} />
            );
        });

        return cards;
    }
}

export default RestaurantDeck;
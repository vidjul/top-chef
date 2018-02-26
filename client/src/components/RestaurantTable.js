import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';

class RestaurantTable extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurants: [] };
    }

    componentDidMount() {
        fetch('/api/restaurant?isOnLaF=0')
            .then((response) => response.json())
            .then(data => this.setState({ restaurants: data }));
    }

    render() {
        let rows = [];
        this.state.restaurants.forEach((restaurant, index) => {
            rows.push(
                <RestaurantCard id={index} name={restaurant.mName} />
            )
        });
        return (
            <div id="accordion">
                {rows}
            </div>
        )
    }
}

export default RestaurantTable;
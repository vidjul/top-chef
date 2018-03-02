import React, { Component } from 'react';
import RestaurantDeck from './RestaurantsDeck';
import RestaurantMap from './RestaurantMap';
import Search from './SearchBar';


class FilterableRestaurantsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            allRestaurants: [],
            onLaFourchette: true,
            hasDeals: true,
            filterByStars: ''
        };
    }

    componentDidMount() {
        fetch('api/offer')
            .then((response) => response.json())
            .then((json) => this.setState({
                restaurants: json,
                allRestaurants: json
            }));
    }

    searchRestaurants(input) {
        if (input) {
            let searchResults;
            if (this.state.restaurants) {
                searchResults = this.state.restaurants.filter((restaurant) => {
                    return restaurant.mName.toLowerCase().includes(input.toLowerCase());
                });
            }
            this.setState({ restaurants: searchResults });
        }
        else {
            this.setState({ restaurants: this.state.allRestaurants });
        }
    }

    filterOnLaFourchette(input) {
        this.setState({ onLaFourchette: input });
    }

    filterHasDeals(input) {
        this.setState({ hasDeals: input });
    }

    filterByStars(input) {
        this.setState({ filterByStars: input });
    }

    render() {
        let restaurants = this.state.restaurants;
        if (this.state.onLaFourchette) {
            if (this.state.restaurants) {
                restaurants = this.state.restaurants.filter((restaurant) => {
                    return restaurant.isOnLaF === true;
                });
            }
        }
        if (this.state.hasDeals) {
            if (this.state.restaurants) {
                restaurants = restaurants.filter((restaurant) => {
                    return restaurant.sales.length > 0;
                });
            }
        }
        if (this.state.filterByStars !== '') {
            if (this.state.restaurants) {
                restaurants = restaurants.filter((restaurant) => {
                    return restaurant.stars === +this.state.filterByStars;
                });
            }
        }
        return (
            <div>
                <div className="container-fluid">
                    <Search
                        searchRestaurants={this.searchRestaurants.bind(this)}
                        filterOnLaFourchette={this.filterOnLaFourchette.bind(this)}
                        onLaFourchette={this.state.onLaFourchette}
                        filterHasDeals={this.filterHasDeals.bind(this)}
                        hasDeals={this.state.hasDeals}
                        filterByStars={this.filterByStars.bind(this)} />
                    <div className="row">
                        <div style={{ width: '100%', height: '500px' }}>
                            <RestaurantMap restaurants={restaurants} />
                        </div>
                    </div>
                </div>
                <div className="py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            <RestaurantDeck
                                restaurants={restaurants} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterableRestaurantsContainer;
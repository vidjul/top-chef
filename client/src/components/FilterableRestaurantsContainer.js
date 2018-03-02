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
            orderByStars: 'desc'
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

    orderByStars(input) {
        this.setState({orderByStars: input});
    }

    render() {
        console.log(this.state.orderByStars);
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
        if (this.state.orderByStars === 'asc') {
            restaurants = restaurants.sort((rest1, rest2) => {
                if (+rest1.stars < +rest2.stars) {
                    return -1;
                }
                if (+rest1.stars > +rest2.stars) {
                    return 1;
                }
                return 0;
            });
        }
        if (this.state.orderByStars === 'desc') {
            restaurants = restaurants.sort((rest1, rest2) => {
                if (+rest1.stars > +rest2.stars) {
                    return -1;
                }
                if (+rest1.stars < +rest2.stars) {
                    return 1;
                }
                return 0;
            });
        }
        return (
            <div>
                <div className="row">
                    <Search
                        searchRestaurants={this.searchRestaurants.bind(this)}
                        filterOnLaFourchette={this.filterOnLaFourchette.bind(this)}
                        onLaFourchette={this.state.onLaFourchette}
                        filterHasDeals={this.filterHasDeals.bind(this)}
                        hasDeals={this.state.hasDeals}
                        OrderByStars={this.orderByStars.bind(this)} />
                </div>
                <div className="row">
                    <div style={{ width: '100%', height: '500px' }}>
                        <RestaurantMap restaurants={restaurants} />
                    </div>
                </div>
                <div className="row">
                    <RestaurantDeck
                        restaurants={restaurants} />
                </div>
            </div>
        )
    }
}

export default FilterableRestaurantsContainer;
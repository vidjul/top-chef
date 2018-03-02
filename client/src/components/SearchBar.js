import React, {Component} from 'react';

class Search extends Component {

    handleSearch(event) {
        this.props.searchRestaurants(event.target.value);
    }

    handleOnLaFourchette(event) {
        this.props.filterOnLaFourchette(event.target.checked);
    }

    handleHasDeals(event) {
        this.props.filterHasDeals(event.target.checked);
    }

    handleOrderByStars(event) {
        this.props.OrderByStars(event.target.value);
    }

    render() {
        return (
            <div className="input-field">
                <label>Rechercher un restaurant en particulier </label>
                <input type="text" onKeyUp={this.handleSearch.bind(this)}/>
                <label>Afficher uniquement les restaurants réservables sur laFourchette.com </label>
                <input type="checkbox" checked={this.props.onLaFourchette} onChange={this.handleOnLaFourchette.bind(this)} />
                <label>Afficher uniquement les restaurants proposant des offres </label>
                <input type="checkbox" checked={this.props.hasDeals} onChange={this.handleHasDeals.bind(this)} />
                <label> Trier par nombre d'étoile </label>
                <select onChange={this.handleOrderByStars.bind(this)}>
                    <option value="asc">Croissant</option>
                    <option value="desc" selected="selected">Décroissant</option>
                </select>
            </div>
        );
    }
}

export default Search;
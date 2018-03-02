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

    handleFilterByStars(event) {
        this.props.filterByStars(event.target.value);
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
                <label> Filtrer par nombre d'étoile </label>
                <select onChange={this.handleFilterByStars.bind(this)}>
                    <option value="" selected="selected">Pas de filtre</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        );
    }
}

export default Search;
import React, { Component } from 'react';

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
            <form>
                <div class="form-group">
                    <label htmlFor="searchText">Rechercher un restaurant </label>
                    <input type="text" class="form-control" id="searchText" aria-describedby="searchHelp" onKeyUp={this.handleSearch.bind(this)} placeholder="Nom du restaurant" />
                    <small id="searchHelp" class="form-text text-muted">Entrez ici le nom d'un restaurant dont vous souhaitez consulter les informations.</small>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="onLaF" checked={this.props.onLaFourchette} onChange={this.handleOnLaFourchette.bind(this)} />
                    <label htmlFor="onLaF" class="form-check-label">Afficher uniquement les restaurants réservables sur laFourchette.com</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="hasDeals" checked={this.props.hasDeals} onChange={this.handleHasDeals.bind(this)} />
                    <label htmlFor="hasDeals" class="form-check-label">Afficher uniquement les restaurants proposant des offres</label>
                </div>
                <div className="form-group">
                    <label htmlFor="stars"> Filtrer par nombre d'étoile </label>
                    <select className="form-control" id="stars" onChange={this.handleFilterByStars.bind(this)} defaultValue="">
                        <option value="">Pas de filtre</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </form>
        );
    }
}

export default Search;
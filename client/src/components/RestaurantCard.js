import React, { Component } from 'react';

class RestaurantCard extends Component {

    render() {
        const name = this.props.restaurant.mName;
        const chef = this.props.restaurant.chef;
        const stars = this.props.restaurant.stars;
        const address = Object.values(this.props.restaurant.address).join(' ');
        let image = this.props.restaurant.image;
        const sales = this.props.restaurant.sales;
        const michelinUrl = this.props.restaurant.michelinUrl;
        const laFUrl = this.props.restaurant.laFUrl;
        let phone;
        if (this.props.restaurant.phone) {
            phone = 'tel:' + this.props.restaurant.phone;
        }

        let salesList = [];
        if (sales.length > 0) {
            sales.forEach((deal, index) => {
                if (deal.is_special_offer) {
                    salesList.push(<li className="list-group-item bg-success" key={index}>{deal.title}</li>)
                }
            });
        }

        if (!image) {
            image = 'http://via.placeholder.com/664x374';
        }

        return (
            <div className="col-sm-6 col-md-4">
                <div className="card mb-4 box-shadow">
                    <div className="card-header">
                        <a href={phone}> Appeler le restaurant </a>
                    </div>
                    <img className="card-img-top img-fluid" src={image} alt={name} />
                    <div className="card-body">
                        <h5 className="card-title">{name} - {chef}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{stars}</h6>
                        <p className="card-text">{address}</p>
                        <a href={michelinUrl} className="card-link">Fiche michelin</a>
                        <a href={laFUrl} className="card-link">Fiche laFourchette</a>
                    </div>
                    <ul className="list-group list-group-flush">{salesList}</ul>
                </div>
            </div>
        )
    }
}

export default RestaurantCard;
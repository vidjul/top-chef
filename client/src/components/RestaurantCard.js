import React, { Component } from 'react';

class RestaurantCard extends Component {

    render() {
        const name = this.props.restaurant.mName;
        const stars = this.props.restaurant.stars;
        const address = Object.values(this.props.restaurant.address).join(' ');
        let image = this.props.restaurant.image;
        const sales = this.props.restaurant.sales;

        let salesList = [];
        if (sales) {
            sales.forEach((deal, index) => {
                if (deal.is_special_offer) {
                    salesList.push(<li className="list-group-item" key={index}>{deal.title}</li>)
                }
            });
        }
        else {
            salesList.push(
                <li className="list-group-item">Not referenced on laFourchette</li>
            )
        }

        if (!image) {
            image = 'http://via.placeholder.com/664x374';
        }

        return (
            <div class="col-sm-6 col-md-4">
                <div className="card mb-4">
                    <img className="card-img-top img-fluid" src={image} alt={name} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{stars}</h6>
                        <p className="card-text">{address}</p>
                    </div>
                    <ul className="list-group list-group-flush">{salesList}</ul>
                </div>
            </div>
        )
    }
}

export default RestaurantCard;
import React, { Component } from 'react';


class Offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        };
    }

    componentDidMount() {
        let url = `/api/offer/${this.props.id}`;
        fetch(url)
            .then((response) => response.json())
            .then(data => this.setState({ sales: data.sales }));
    }

    render() {
        let rows = [];
        if (this.state.sales != []) {
            this.state.sales.forEach((deal) => {
                if (deal.is_special_offer) {
                    rows.push(
                        <div>
                            {deal.title}
                        </div>
                    )
                }
            })
        }
        if (this.state.sales != []) {
            this.props.show();
        }
        return rows;
    }
}

export default Offer;
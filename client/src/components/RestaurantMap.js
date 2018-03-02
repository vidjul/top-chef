import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Marker extends Component {
  render() {
    return (
      <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 40, width: 60, top: -20, left: -30,
      }}>
        {this.props.text}
      </div>
    )
  }
}

class RestaurantMap extends Component {
  static defaultProps = {
    center: { lat: 46.7596, lng: 2.4521 },
    zoom: 6
  };

  render() {
    let markers = [];
    this.props.restaurants.forEach((restaurant, index) => {
      if (restaurant.sales !== []) {
        if (restaurant.geo) {
          markers.push(
            <Marker
              lat={restaurant.geo.latitude}
              lng={restaurant.geo.longitude}
              text={restaurant.stars}
              key={index}
            />
          )
        }
      }
    });

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBbyAKyI0fF4ryIZzIOvCv0ohfEdhl9Ipg' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {markers}
      </GoogleMapReact>
    );
  }
}

export default RestaurantMap;
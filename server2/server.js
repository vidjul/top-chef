const laFourchette = require('./laFourchette');
const express = require('express');
const path = require('path');

const restaurants = laFourchette.getAll();

const app = express();

// --- Routes --- //

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}



app.get('/api', (req, res) => {
    res.send('/api/restaurant for retrieving restaurant data <br /> /api/offer/id for retrieving promotion');
});

app.get('/api/restaurant', (req, res) => {
    let onLaF = req.query.isOnLaF;
    let size = req.query.size;

    if (size == 1) {
        res.send({ 'size': restaurants.length });
    }
    else {
        if (onLaF == 1) {
            let refRestaurants = [];
            restaurants.find((restaurant) => {
                if (restaurant.isOnLaF) {
                    refRestaurants.push(restaurant);
                }
            });
            res.send(refRestaurants);
        }
        else {
            res.send(restaurants);
        }
    }
});

app.get('/api/restaurant/:id', (req, res) => {
    res.send(restaurants[req.params.id]);
});


app.get('/api/offer/:id', (req, res) => {
    laFourchette.get(restaurants[req.params.id], res);
});

app.get('/api/offer', (req, res) => {
    laFourchette.getOffers(res);
});

if (restaurants) {
    app.listen(3001, () => {
        console.log('The server is running on http://localhost:3001');
    });
}

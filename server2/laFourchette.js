const request = require('request');
const fs = require('fs');
const similarity = require('similarity');
const michelin = require('./michelin');

// --- URLS --- //

const apiEndPointSearch = 'https://m.lafourchette.com/api/restaurant/search?&offer=0&origin_code_list[]=THEFORKMANAGER&limit=400';
const apiEndPointRestaurant = 'https://m.lafourchette.com/api/restaurant/';

function getDealsById(restaurant) {
    restaurant.sales = [];
    return new Promise((resolve, reject) => {
        if (restaurant.isOnLaF) {
            request(apiEndPointRestaurant + `${restaurant.id}/sale-type`, (err, resp, body) => {
                if (err) {
                    return reject(err);
                }
                restaurant.sales = JSON.parse(body).filter((deal) => {
                    return deal.is_special_offer === true;
                });
                return resolve(restaurant);
            });
        }
        else {
            return resolve(restaurant);
        }
    });
}

function searchRestaurant(restaurant) {
    restaurant.isOnLaF = false;
    const matchPerc = 0.64;
    const options = {

        'uri': apiEndPointSearch + `&search_text=${encodeURIComponent(restaurant.mName)}`,
        'json': true
    };
    return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            for (let i = 0; i < body.items.length; i++) {
                resultRestaurant = body.items[i];
                if (restaurant.address.postal_code === resultRestaurant.address.postal_code) {
                    if (similarity(restaurant.address.address_road, resultRestaurant.address.street_address) > matchPerc) {
                        restaurant.laFName = resultRestaurant.name;
                        restaurant.id = resultRestaurant.id;
                        restaurant.laFUrl = `https://www.lafourchette.com/restaurant/${encodeURIComponent(restaurant.laFName)}/${restaurant.id}`;
                        restaurant.geo = resultRestaurant.geo;
                        restaurant.phone = resultRestaurant.phone;
                        restaurant.isOnLaF = true;
                        restaurant.image = resultRestaurant.images.main[6].url;
                        break;
                    }
                }
            }
            return resolve(restaurant);
        });
    });
}

function writeResult(jsonResult) {
    return new Promise((resolve, reject) => {
        fs.writeFile('output/restaurants2.json', JSON.stringify(jsonResult), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function fetchAllRestaurant() {
    restaurants = michelin.get();
    if (restaurants) {
        requests = restaurants.map((restaurant) => searchRestaurant(restaurant));
        Promise.all(requests)
            .then(((result) => {
                writeResult(result);
            }))
            .then(() => console.log("Restaurants has been updated! Restart the server"))
            .catch((err) => console.log(err));
    }
    else {
        console.log('Please wait...');
    }
}

function getAllRestaurants() {
    if (!fs.existsSync('./output/restaurants2.json')) {
        console.log('Scrapping in progress, please retry.');
        fetchAllRestaurant();
        return 0;
    }
    else {
        let content = fs.readFileSync('./output/restaurants2.json', 'utf-8');
        return JSON.parse(content);
    }
}

function getAllOffers(response) {
    restaurants = getAllRestaurants();
    requests = restaurants.map((restaurant) => getDealsById(restaurant));
    Promise.all(requests)
        .then((res) => response.send(res))
        .catch((err) => console.log(err));
}

function get(restaurant, response) {
    content = getAllRestaurants();
    if (content) {
        let result = content.find((rest) => {
            return rest.mName == restaurant.mName;
        });
        getDealsById(result)
            .then((res) => response.send(res))
            .catch((err) => console.log(err));
    }
}

exports.getAll = getAllRestaurants;
exports.getOffers = getAllOffers;
exports.get = get;
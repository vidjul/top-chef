const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

// --- Example URLS --- //
// const restaurantUrl = 'https://restaurant.michelin.fr/28u6ql7/le-jardin-des-remparts-beaune';

// --- URLS --- //
const allRestaurantPage = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';



function getInfoOnPage(pageUrl) {
    let restaurant = {
        "michelinUrl": `https://restaurant.michelin.fr${pageUrl}`,
        "address": {}
    };
    return new Promise((resolve, reject) => {
        request(restaurant.michelinUrl, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            const $ = cheerio.load(body);
            restaurant.mName = $('h1').first().text();
            restaurant.address.address_road = $('.thoroughfare').first().text();
            restaurant.address.postal_code = $('.postal-code').first().text();
            restaurant.address.address_locality = $('.locality').first().text();
            restaurant.chef = $('.field--name-field-chef > .field__items').text();
            restaurant.stars = 1;
            if ($('span').hasClass('icon-cotation2etoiles')) {
                restaurant.stars = 2;
            }
            if ($('span').hasClass('icon-cotation3etoiles')) {
                restaurant.stars = 3;
            }
            //console.log(restaurant.url + ' added.'); This log slows the program.
            return resolve(restaurant);
        });
    });
}

function getTotalPageNbr() {
    let totalPageNbr;
    return new Promise((resolve, reject) => {
        request(allRestaurantPage, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            const $ = cheerio.load(body);
            totalPageNbr = $('.mr-pager-first-level-links > li').last().prev().text();
            return resolve(totalPageNbr);

        });
    });
}

function getRestaurantsPageOnUrl(pageNbr) {
    let restaurantPages = [];
    let url = `https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-${pageNbr}`;
    return new Promise((resolve, reject) => {
        request(url, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            const $ = cheerio.load(body);
            $('a.poi-card-link').each((i, elem) => {
                restaurantPages.push($(elem).attr('href'));
                return resolve(restaurantPages);
            });
        });
    });
}

function getAllRequests(restaurantsPages) {
    requests = [];
    return new Promise((resolve, reject) => {
        restaurantsPages.forEach((restaurantsPage) => {
            restaurantsPage.forEach((restaurantPage) => {
                requests.push(getInfoOnPage(restaurantPage));
            });
        });
        return resolve(Promise.all(requests));
    });
}

function writeResult(jsonResult) {
    return new Promise((resolve, reject) => {
        fs.writeFile('output/restaurants.json', JSON.stringify(jsonResult), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function totalPageNbrToArr(totalPageNbr) {
    let restaurantsPagesNbr = [];
    return new Promise((resolve, reject) => {
        for (let i = 1; i < +totalPageNbr + 1; i++) {
            restaurantsPagesNbr.push(i);
        }
        if (restaurantsPagesNbr !== []) {
            return resolve(restaurantsPagesNbr);
        }
        else {
            return reject();
        }
    });
}

function fetchAllUrls(pageArr) {
    let reqArr = [];
    return new Promise((resolve, reject) => {
        reqArr = pageArr.map((page) => getRestaurantsPageOnUrl(page));
        return resolve(Promise.all(reqArr));
    });
}

function scrape() {
    let restaurantsPagesNbr = [];
    let restaurantsPagesReq;
    let restaurantsPages;
    let restaurantsInfoReq;
    console.log("Getting the total number of pages...");
    getTotalPageNbr()
        .then((result) => totalPageNbrToArr(result))
        .then((result) => fetchAllUrls(result))
        .then((result) => getAllRequests(result))
        .then((result) => {
            console.log("Writing the result on a file...");
            writeResult(result);
        })
        .then(() => console.log('The file has been successfully written! Please restart the server to proceed.'))
        .catch((err) => (console.log(err)));
}

function get() {
    if (!fs.existsSync('./output/restaurants.json')) {
        console.log('Scrapping in progress, please retry.');
        scrape();
        return 0;
    }
    let content = fs.readFileSync('./output/restaurants.json', 'utf-8');
    return JSON.parse(content);
}

exports.get = get;
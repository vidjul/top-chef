"use strict"

var request = require('request');
var cheerio = require('cheerio');
var similarity = require('similarity');
var michelin = require('./michelin');
var fs = require('fs');

// function get_info(id, name, callback) {
//     var res = { "result": [] }
//     if (Number(id)) {
//         const options = {
//             url: 'https://www.lafourchette.com/reservation/module/date-list/' + id,
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Accept-Charset': 'utf-8',
//                 'User-Agent': 'client'
//             }
//         };
//         request(options, function (err, resp, body) {
//             if (!err) {
//                 var json = JSON.parse(body);
//                 if (json.data.bestSaleTypeAvailable != null) {
//                     for (var key in json.data.availabilityList) {
//                         if (json.data.availabilityList[key].bestSaleType != null) {
//                             res.result.push({
//                                 "date": key,
//                                 "offer": json.data.availabilityList[key].bestSaleType.title
//                             });
//                         }
//                     }
//                     //console.log(res);
//                     callback(res);
//                 }
//                 else {
//                     res.result.push({ 'date': '/', 'offer': 'No promotion' });
//                     callback(res);
//                 }
//             }
//         });
//     } else {
//         res.result.push({ 'date': '/', 'offer': 'Cannot be booked on LaFourchette' });
//         callback(res);
//     }

// }

function get_offer(restaurantURL, callback) {
    var result = {
        "result": []
    };


    if (restaurantURL) {

        const configuration = {
            'uri': restaurantURL,
            'headers': {
              'cookie': 'datadome=AHrlqAAAAAMAXgo5U7iYqbgALtotww==',
              'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
            }
          };

        request(configuration, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                $('.saleType--specialOffer').each(function (i, elem) {
                    result.result.push({
                        "type": "Promotion",
                        "deal": $(elem).find('h3.saleType-title').text()
                    });
                })
                $('.saleType--event').each(function (i, elem) {
                    result.result.push({
                        "type": "Evenement",
                        "deal": $(elem).find('h3.saleType-title').text()
                    });
                })
                callback(result);
            }
        })
    }
    else {
        callback(result);
    }
}

function get_search_page_nbr(name, callback) {
    var url = 'https://www.lafourchette.com/search-refine/' + encodeURIComponent(name);
    request(url, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            var pageNbr = $('.pagination').children().children().last().prev().text().trim();
            if (Number(pageNbr)) {
                callback(pageNbr);
            }
            else {
                callback(1);
            }
        }
    })
}

function get_url(name, addr, callback) {
    var matchPerc = 0.64;
    get_search_page_nbr(name, function (pageNbr) {
        for (var i = 1; i < +pageNbr + 1; i++) {
            var url = 'https://www.lafourchette.com/search-refine/' + encodeURIComponent(name) + '?page=' + i;
            request(url, function (err, resp, html) {
                if (!err) {
                    const $ = cheerio.load(html);
                    $('.resultContainer').children().children().each(function (i, elem) {
                        var resultAddr = $(elem).find('.resultItem-address').text().trim();
                        var currentRestaurantURL = $(elem).find('.resultItem-name').children().attr('href');
                        if (similarity(resultAddr, addr) > matchPerc) {
                            matchPerc = similarity(resultAddr, addr);
                            callback('https://www.lafourchette.com' + currentRestaurantURL);
                        }
                    });
                }
            })
        }
    })
}

// function get_url_by_name_addr(name, addr, callback) {
//     var url = 'https://www.lafourchette.com/search-refine/' + encodeURIComponent(name);
//     var bestMatchId;
//     var restaurantURL;
//     var matchPerc = 0.64;
//     request(url, function (err, resp, html) {
//         if (!err) {
//             const $ = cheerio.load(html);
//             $('.resultContainer').children().children().each(function (i, elem) {
//                 var resultAddr = $(elem).find('.resultItem-address').text().trim();
//                 var currentRestaurantURL = $(elem).find('.resultItem-name').children().attr('href');
//                 if (similarity(resultAddr, addr) > matchPerc) {
//                     matchPerc = similarity(resultAddr, addr);
//                     bestMatchId = $(elem).attr('data-restaurant-id');
//                     restaurantURL = currentRestaurantURL;
//                 }
//             });
//             if (restaurantURL != undefined) {
//                 //get_info(bestMatchId, name, callback);
//                 //get_offer(restaurantURL, callback);
//                 callback('https://www.lafourchette.com' + restaurantURL);
//             }
//             else {
//                 callback(null);
//             }
//         }
//     });
// }

function store_url() {
    var json = michelin.get();
    var urls = { 'urls': [] };
    json.restaurants.forEach((restaurant, index) => {
        get_url(restaurant.name, restaurant.address, function (url) {
            urls.urls.push({
                'name': restaurant.name,
                'url': url,
                'id': index
            });
            fs.writeFile('laFourchetteUrl.json', JSON.stringify(urls), 'utf8', function (err) {
                if (!err) {
                    console.log('URL ' + index + ' has been added.');
                }
                else {
                    return console.log(err);
                }
            });
        });
    });
}

function get_urls() {
    if (!fs.existsSync('./laFourchetteUrl.json')) {
        store_url();
        return console.log('Scrapping in progress, please retry.');
    }
    var content = fs.readFileSync('./laFourchetteUrl.json', 'utf-8');
    return JSON.parse(content);
}

function get(restaurant, callback) {
    var urls = get_urls();
    var json = urls.urls.filter((item) => {
        return item.name == restaurant.name;
    })
    if (json[0] != undefined) {
        get_offer(json[0].url, callback);
    }
    else {
        callback(null);
    }
}


//exports.store = store_url;
//exports.get_url = get_url;
exports.get_urls = get_urls;
exports.get = get;
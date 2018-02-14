"use strict"

var request = require('request');
var cheerio = require('cheerio');
var similarity = require('similarity');

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
    var url = 'https://www.lafourchette.com' + restaurantURL;
    var result = {
        "result": []
    };
    request(url, function (err, resp, html) {
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

function get_id_by_name_addr(name, addr, callback) {
    var url = 'https://www.lafourchette.com/search-refine/' + encodeURIComponent(name);
    var bestMatchId;
    var restaurantURL;
    var matchPerc = 0.55;
    request(url, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            $('.resultContainer').children().children().each(function (i, elem) {
                var resultAddr = $(elem).find('.resultItem-address').text().trim();
                var currentRestaurantURL = $(elem).find('.resultItem-name').children().attr('href');
                if (similarity(resultAddr, addr) > matchPerc) {
                    matchPerc = similarity(resultAddr, addr);
                    bestMatchId = $(elem).attr('data-restaurant-id');
                    restaurantURL = currentRestaurantURL;
                }
            });
            if (bestMatchId != undefined) {
                //get_info(bestMatchId, name, callback);
                get_offer(restaurantURL, callback);
            }
            else {
                callback({ "result": [name + ' Not referenced'] });
            }
        }
    });
}

function get(restaurant, callback) {
    get_id_by_name_addr(restaurant.name, restaurant.address, callback);
}



exports.get = get;
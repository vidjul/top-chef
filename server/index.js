var request = require('request');
var cheerio = require('cheerio');

request('https://restaurant.michelin.fr/28u6ql7/le-jardin-des-remparts-beaune', function (err, resp, html) {
    if (!err) {
        const $ = cheerio.load(html);
        var name = $('h1').first().text();
        var address = $('.thoroughfare').first().text();
        var zipcode = $('.postal-code').first().text();;
        var city = $('.locality').first().text();
        console.log(name);
        console.log(address);
        console.log(zipcode);
        console.log(city);
    }
});
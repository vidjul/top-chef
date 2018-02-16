var michelin = require('./michelin');
var laFourchette = require('./laFourchette');
var express = require('express');

const app = express();

var json = michelin.get();
//var toto = laFourchette.get(json.restaurants[266]);
// if (json != undefined) {
//     for (var i = 1; i < json.restaurants.length; i++) {

//         laFourchette.get(json.restaurants[i]);
//     }
// }

// laFourchette.get(json.restaurants[266]);

//laFourchette.store();

// Routes

app.get('/', function (req, res) {
    res.send('/restaurant for retrieving restaurant data <br /> /offer/id for retrieving promotion');
});

app.get('/restaurant', function (req, res) {
    res.send(json);
})

app.get('/restaurant/:id', function (req, res) {
    res.send(json.restaurants[req.params.id]);
})


app.get('/offer/:id', function (req,res) {
    laFourchette.get(json.restaurants[req.params.id],function(result) {
        res.send(result);
    });
})

app.get('/referencedUrl', function(req, res) {
    res.send(laFourchette.get_urls());
})

// app.get('/offer/test/:id', function (req,res) {
//     laFourchette.get_url((json.restaurants[req.params.id]).name,(json.restaurants[req.params.id]).address,function(result) {
//         res.send(result);
//     });
// })


app.listen(8080, function () {
    console.log('Server running on port 8080');
})


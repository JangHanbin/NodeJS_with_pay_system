var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
const Hotel = require('../models/hotel')

var jsonParser = bodyParser.json()
// middleware that is specific to this router
// router.use(function(req, res, next) {
//     console.log('API.js called!');
//     next();
// });



router.post('/add', jsonParser, function(req, res,next) {
    var hotel = new Hotel();
    console.log(req.body)
    hotel.hotel_name = req.body.hotel_name;
    hotel.location = req.body.location;
    hotel.hotel_img_path = req.body.hotel_img_path;
    hotel.rooms = req.body.rooms;

    hotel.save(function(err){
        if(err){
            console.error(err);
            res.json({result: -1});
            return;
        }

        res.json({result: 0});

    });

});

//search hotel api reference : https://trello.com/c/ugQCM6yp
router.get('/search/:keyword', function(req, res,next) {
    res.send('search' + req.params.keyword);
});

//book hotel reference : https://trello.com/c/MEUpjPBW
router.post('/book', function(req, res,next) {
    res.send('book');
});


router.get('/:action', function(req, res,next) {
    res.send('Hello ' + req.params.action);
});

module.exports = router;

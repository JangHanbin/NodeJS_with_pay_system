var express = require('express');
var bodyParser = require('body-parser') // should be included to parsing post body data
var router = express.Router();
const Hotel = require('../models/hotel')

var jsonParser = bodyParser.json()
// middleware that is specific to this router
// router.use(function(req, res, next) {
//     console.log('API.js called!');
//     next();
// });



router.post('/add', jsonParser, function(req, res,next) { //use jsonparser to parsing content-type application/json
    var hotel = new Hotel();

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

function get_lowest_price(prices) {

    var [lowestItems] = Object.entries(prices).sort(([ ,v1], [ ,v2]) => v1 - v2);
    // console.log(`Lowest value is ${lowestItems[1]['price']}, with a key of ${lowestItems[0]}`);

    return lowestItems[1]['price'];
}


//search hotel api reference : https://trello.com/c/ugQCM6yp
router.get('/search/:keyword', function(req, res,next) {
    Hotel.find({hotel_name:{$regex: req.params.keyword}},'hotel_name location hotel_img_path rooms.price', {lean: true}, function (err, hotels){ //add lean: true option to add lowest_price and delete rooms price field
        if(err) return res.status(500).json({error: err});
        if(!hotels) return res.status(200).json({result: 'there is no '+req.params.keyword+' hotel in Utopia'});
        //append the lowest price field and delete rooms field
        for(let hotel of hotels)
        {
            hotel.lowest_price = get_lowest_price(hotel.rooms);
            delete hotel.rooms;

        }

        res.json(hotels)
    })


});

//book hotel reference : https://trello.com/c/MEUpjPBW
router.post('/book', function(req, res,next) {
    res.send('book');
});


router.get('/:action', function(req, res,next) {
    res.send('Hello ' + req.params.action);
});

module.exports = router;

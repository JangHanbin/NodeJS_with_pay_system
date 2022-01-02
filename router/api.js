var express = require('express');
const bodyParser = require('body-parser') // should be included to parsing post body data
var router = express.Router();
const Hotel = require('../models/hotel')


var jsonParser = bodyParser.json();

router.post('/add', jsonParser, function(req, res,next) { //use jsonparser to parsing content-type application/json
    // TODO : owner_unique_id can be added in this step. and this method will be allowed in admin page of the hotel owner
    var hotel = new Hotel();

    hotel.hotel_name = req.body.hotel_name;
    hotel.location = req.body.location;
    hotel.hotel_img_path = `/img/${hotel._id}/${hotel._id}.png`; // set hotel path as hotel._id/hotel._id.png
    hotel.rooms = req.body.rooms;

    // set room img path as hotel._id/room._id.png
    for(let room of hotel.rooms)
    {
        room.room_img_path = `/img/${hotel._id}/${room._id}.png`;
    }

    // save data to DB
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
    // TODO : add start date and end date and use param instead of :keyword
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

//     customer_name:
//             {
//                 last_name:String,
//                 first_name:String,
//                 full_name:String
//             },
//         country_code:String,
//         payment:String,
//         receipt_id:String,
//         customer_mobile_number: String,
//         book_start_date:Date,
//         book_end_date:Date,
//         booking_date:{type: Date, default: Date.now},
//         is_canceled:Boolean

});


router.get('/:action', function(req, res,next) {
    res.send('Hello ' + req.params.action);
});

module.exports = router;

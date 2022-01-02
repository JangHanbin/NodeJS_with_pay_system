var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema({
    customer_name:
        {
            last_name:String,
            first_name:String,
            full_name:String
        },
    country_code:String,
    payment:String,
    receipt_id:String,
    customer_mobile_number: String,
    book_start_date:Date,
    book_end_date:Date,
    booking_date:{type: Date, default: Date.now},
    is_canceled:Boolean


});

var roomSchema = new Schema({
    room_name:String,
    price:Number,
    room_img_path:String

});

var hotelSchema = new Schema({
    hotel_name:String,
    location : String,
    hotel_img_path:String,
    owner_unique_id:String,
    rooms:[{
        room_name:String,
        price:Number,
        room_img_path:String
    }],
    books:[{
        customer_name:
            {
                last_name:String,
                first_name:String,
                full_name:String
            },
        country_code:String,
        payment:String,
        receipt_id:String,
        customer_mobile_number: String,
        book_start_date:Date,
        book_end_date:Date,
        booking_date:{type: Date, default: Date.now},
        is_canceled:Boolean

    }]

});


module.exports = mongoose.model('hotel', hotelSchema)
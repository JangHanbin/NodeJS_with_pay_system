var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    hotel_id:Number,
    hotel_name:String,
    location : String,
    hotel_img_path:String,
    Rooms:[
        {
            room_id:Number,
            room_name:String,
            price:Number,
            room_img_path:String
        }
    ],
    books:[
        {
            room_id:Number,
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
            is_cancled:Boolean

        }
    ]

});

module.exports = mongoose.model('book', bookSchema)
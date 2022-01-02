var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')

const Iamport = require("iamport"); // should be included to parsing post body data
var router = express.Router();


var iamport = new Iamport({
    impKey : '1869468596867371',
    impSecret: '2aff5463f5f4cd11798e51313039bb175e45705b65b49e4dca0b02d0967d409aec5d66c51acccfe3'
})

var imp_key = '1869468596867371'
var imp_secret = '2aff5463f5f4cd11798e51313039bb175e45705b65b49e4dca0b02d0967d409aec5d66c51acccfe3'


function return_json(error, response, body)
{

}

async function get_access_token(callback) {
    var token;
    request.post({
        url:     'https://api.iamport.kr/users/getToken',
        json:    {'imp_key':imp_key, 'imp_secret':imp_secret}
    }, await function(error, response, body){
        token = body.response['access_token'];
        console.log(token);


    });
    return token;
}

router.get('/payment', function (req, res){
   res.render('payment.html');
});
router.get('/', function(req, res,next) {

    // var access_token = await get_access_token();

    iamport.payment.getByStatus({
        payment_status: 'paid'
    }).then(function(result){
        console.log(result)
        res.render('payments_list',{list:result.list});
    }).catch(function(error){
        console.log(error);
        red.send(error);
    })

    // res.send(access_token);
    //
    // iamport.payment.getByImpUid({
    //     imp_uid: 'imp40256973'
    // }).then(function(result){
    //     console.log(result)
    //     res.send('Hello')
    //     // To do
    // }).catch(function(error){
    //     // handle error
    //     console.log(error);
    //     res.send('err');
    // });

});

module.exports = router;


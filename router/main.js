var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser') // should be included to parsing post body data
const request = require('request');





router.get('/',function(req,res){
    var data = {'hotel_name':'choa'}
    res.render('index.html', data);
});
router.get('/about',function(req,res){

    res.render('about.html');
});

router.get('/search',function(req,res){
    re
    res.render('search.html');
});
module.exports = router;

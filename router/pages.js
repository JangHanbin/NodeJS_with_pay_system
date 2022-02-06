var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/search', function(req,res) {
    res.render('pages/search.html');
});
router.post('/search', jsonParser, function(req,res) {
    res.render('pages/search.html', { result:req.body });
});
router.get('/reservation', function(req,res) {
    res.render('pages/reservation.html');
});

router.get('/manager/addHotel', function(req,res) {
    res.render('pages/manager/addHotel.html');
});

module.exports = router;

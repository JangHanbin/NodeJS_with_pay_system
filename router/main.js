var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/',function(req,res) {
    res.render('index.html');
});
router.get('/search', function(req,res) {
    res.render('search.html');
});
router.post('/search', jsonParser, function(req,res) {
    res.render('search.html', { result:req.body });
});
router.get('/reservation', function(req,res) {
    res.render('reservation.html');
});

module.exports = router;

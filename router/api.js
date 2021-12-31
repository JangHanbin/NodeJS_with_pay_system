var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function(req, res, next) {
//     console.log('API.js called!');
//     next();
// });


//search hotel api reference : https://trello.com/c/ugQCM6yp
router.get('/search/:keyword', function(req, res,next) {
    res.send('search' + req.params.keyword);
});

//reserve hotel reference : https://trello.com/c/MEUpjPBW
router.post('/reservation', function(req, res,next) {
    res.send('Reservation');
});


router.get('/:action', function(req, res,next) {
    res.send('Hello ' + req.params.action);
});

module.exports = router;

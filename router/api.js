var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function(req, res, next) {
//     console.log('API.js called!');
//     next();
//     console.log(req.baseUrl);
// });

router.get('/:action', function(req, res,next) {
    res.send('Hello ' + req.params.action);
});

module.exports = router;

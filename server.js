const express = require('express');
const app = express();

const router = require('./router/main');
const api = require('./router/api');

app.use('/', router); // this line for main routing
app.use('/api', api); // this line for api

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080")
});


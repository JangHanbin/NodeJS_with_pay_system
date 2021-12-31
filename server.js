require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const app = express();

const { PORT, MONGO_URI } = process.env;

const router = require('./router/main');
const api = require('./router/api');

app.use('/', router); // this line for main routing
app.use('/api', api); // this line for api
app.use(express.static('static'));

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// CONNECT TO MONGODB SERVER
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080")
});


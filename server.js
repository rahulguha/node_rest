/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 21/2/14
 * Time: 9:02 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express'),
    routes = require('./routes/routes.js'),
    mongoose = require('mongoose'),
    config =require('./config/config.json'),
    util = require('./util/util.js'),
    _ = require('lodash-node'),
    log4js = require('log4js');

log4js.configure('./config/log4js.json', {});

var logger = log4js.getLogger("server");
logger.setLevel(util.get_logging_level());


var app = express();
logger.info("express loaded");

mongoose.connect(util.get_connection_string());
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

logger.info("connected to mongodb");


app.get('/routes', routes.findAll);
app.get('/routes/:id', routes.findById);
app.get('/store/cat', routes.cat);

logger.info("routes are loaded");


// set up the RESTful API, handler methods are defined in api.js
//var api = require('./controllers/api.js');
//app.post('/thread', api.post);
//app.get('/thread/:title.:format?', api.show);
//app.get('/cat', api.list);

app.listen(3000);
logger.info("http server started");
console.log('Listening on port 3000...');
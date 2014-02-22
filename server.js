/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 21/2/14
 * Time: 9:02 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express'),
    routes = require('./routes/routes.js'),
    mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://54.209.192.243/annectos_prod');
app.get('/routes', routes.findAll);
app.get('/routes/:id', routes.findById);
app.get('/store/cat', routes.cat);

// set up the RESTful API, handler methods are defined in api.js
//var api = require('./controllers/api.js');
//app.post('/thread', api.post);
//app.get('/thread/:title.:format?', api.show);
//app.get('/cat', api.list);

app.listen(3000);
console.log('Listening on port 3000...');
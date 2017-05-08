var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('../server/routes/index.route');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

//route
app.use('/images', express.static(__dirname + '/../public/images'));
app.use('/api', routes);

app.use(function(req,res,next){
    res.status(404).send({message: "API URL Not Found!"});
});

module.exports = app;

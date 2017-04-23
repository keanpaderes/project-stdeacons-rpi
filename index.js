var mongoose = require('mongoose');
var app = require('./config/express');
var config = require('./config/env');
var port = config.port || process.env.PORT;

// connect to mongo db
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', function(){
    console.log("Error in connection to DB!");
});

var chokidar = require('chokidar');
var watcher = chokidar.watch('./app');
watcher.on('ready', function() {
    watcher.on('all', function() {
        console.log("Clearing /dist/ module cache from server")
        Object.keys(require.cache).forEach(function(id) {
            if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
        });
    });
});

app.listen(port);
console.log("App listening on port " + port);

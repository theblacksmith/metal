///<reference path='node/node.d.ts' />
///<reference path='node/express.d.ts' />

/**
 * Module dependencies.
 */

import http = module("http");
import path = module("path");
import express = module("express");
import index = module("./routes/index");
import api = module("./routes/api");
import passport = require('passport');
import logger = require('mean-logger');
import haml = require('hamljs');
import marked = require('marked');
import fs = require('fs');

/**
 * Configuration
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);

// Automattically requires all models in models/ folder
var models_path = __dirname + '/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// bootstrap passport config
require('./config/passport')(passport);

var app = express.createServer();

//express settings
require('./config/express')(app, passport, db);

/**
 * Routes
 */
require('./config/routes')(app, passport, auth);

/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Initializing logger
logger.init(app, passport, mongoose);

//expose app
exports = module.exports = app;
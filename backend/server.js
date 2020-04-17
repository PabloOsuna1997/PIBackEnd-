'use strict';

var app = require('./index');
var http = require('http');
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');


var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8000);

//middlewares
app.use(cors());    // direccion del frontend
app.use(express.urlencoded({limit: '50mb',extended: false}));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});

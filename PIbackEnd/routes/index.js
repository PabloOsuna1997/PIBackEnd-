const express = require('express');
const route = express.Router();
const controllerLogin = require('../controllers/login.controller.js');

route.get('/hello', controllerLogin.get);

module.exports = route;